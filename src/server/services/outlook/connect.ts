import { db } from "~/server/db";

export interface TeamsAuthUrl {
  authUrl: string;
  state: string;
}

export interface TeamsTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  id_token?: string;
}

export interface TeamsUserInfo {
  id: string;
  displayName: string;
  mail: string;
  userPrincipalName: string;
}

export class TeamsConnectService {
  private static readonly CLIENT_ID = process.env.OUTLOOK_CLIENT_ID!;
  private static readonly CLIENT_SECRET = process.env.OUTLOOK_CLIENT_SECRET!;
  private static readonly REDIRECT_URI = process.env.OUTLOOK_REDIRECT_URI ?? "http://localhost:3000/api/outlook";
  private static readonly SCOPES = "https://graph.microsoft.com/OnlineMeetings.Read https://graph.microsoft.com/OnlineMeetingTranscript.Read.All https://graph.microsoft.com/User.Read offline_access";
  private static readonly GRAPH_BASE_URL = "https://graph.microsoft.com/v1.0";
  private static readonly AUTH_URL = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
  private static readonly TOKEN_URL = "https://login.microsoftonline.com/common/oauth2/v2.0/token";

  static generateAuthUrl(userId: string): TeamsAuthUrl {
    const state = Buffer.from(JSON.stringify({ userId, timestamp: Date.now() })).toString('base64');
    
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      response_type: 'code',
      redirect_uri: this.REDIRECT_URI,
      scope: this.SCOPES,
      state,
      response_mode: 'query'
    });

    return {
      authUrl: `${this.AUTH_URL}?${params.toString()}`,
      state
    };
  }

  static async exchangeCodeForTokens(code: string): Promise<TeamsTokenResponse> {
    console.log('🔵 Making token exchange request...');
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      code,
      redirect_uri: this.REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    const response = await fetch(this.TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('🔴 Token exchange failed:', error);
      throw new Error(`Failed to exchange code for tokens: ${error}`);
    }

    console.log('🟢 Token exchange successful');
    return response.json() as Promise<TeamsTokenResponse>;
  }

  static async refreshTokens(refreshToken: string): Promise<TeamsTokenResponse> {
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    });

    const response = await fetch(this.TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to refresh tokens: ${error}`);
    }

    return response.json() as Promise<TeamsTokenResponse>;
  }

  static async getUserInfo(accessToken: string): Promise<TeamsUserInfo> {
    const response = await fetch(`${this.GRAPH_BASE_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get user info: ${error}`);
    }

    return response.json() as Promise<TeamsUserInfo>;
  }

  // Alternative method to extract user info from ID token
  static extractUserInfoFromIdToken(idToken: string): TeamsUserInfo | null {
    try {
      // ID token is a JWT with 3 parts separated by dots
      const parts = idToken.split('.');
      if (parts.length !== 3) return null;
      
      // Decode the payload (second part)
      const payload = JSON.parse(
        Buffer.from(parts[1]!, 'base64url').toString()
      ) as {
        sub?: string;
        oid?: string;
        name?: string;
        email?: string;
        preferred_username?: string;
      };
      
      return {
        id: payload.sub ?? payload.oid ?? '',
        displayName: payload.name ?? '',
        mail: payload.email ?? payload.preferred_username ?? '',
        userPrincipalName: payload.preferred_username ?? payload.email ?? ''
      };
    } catch (error) {
      console.error('Error extracting user info from ID token:', error);
      return null;
    }
  }

  static async saveTeamsAccount(
    userId: string,
    tokens: TeamsTokenResponse,
    userInfo: TeamsUserInfo
  ) {
    const tokenExpiry = new Date(Date.now() + tokens.expires_in * 1000);
    const email = userInfo.mail ?? userInfo.userPrincipalName;

    return await db.teamsAccount.upsert({
      where: {
        userId_email: {
          userId,
          email
        }
      },
      update: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        tokenExpiry,
        displayName: userInfo.displayName,
      },
      create: {
        userId,
        email,
        displayName: userInfo.displayName,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        tokenExpiry,
      }
    });
  }

  static async getValidAccessToken(userId: string, email: string): Promise<string> {
    const teamsAccount = await db.teamsAccount.findUnique({
      where: {
        userId_email: {
          userId,
          email
        }
      }
    });

    if (!teamsAccount) {
      throw new Error('Teams account not found');
    }

    // Check if token is expired (with 5-minute buffer)
    const now = new Date();
    const expiryWithBuffer = new Date(teamsAccount.tokenExpiry.getTime() - 5 * 60 * 1000);

    if (now >= expiryWithBuffer) {
      // Refresh the token
      const newTokens = await this.refreshTokens(teamsAccount.refreshToken);
      const newExpiry = new Date(Date.now() + newTokens.expires_in * 1000);

      await db.teamsAccount.update({
        where: {
          userId_email: {
            userId,
            email
          }
        },
        data: {
          accessToken: newTokens.access_token,
          refreshToken: newTokens.refresh_token,
          tokenExpiry: newExpiry,
        }
      });

      return newTokens.access_token;
    }

    return teamsAccount.accessToken;
  }
}
