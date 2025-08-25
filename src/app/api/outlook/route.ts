import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { TeamsConnectService, type TeamsUserInfo } from "~/server/services/outlook/connect";

export async function GET(request: NextRequest) {
  console.log('🔵 Teams OAuth callback route hit!');
  console.log('🔵 URL:', request.url);
  console.log('🔵 Search params:', request.nextUrl.searchParams.toString());
  
  try {
    // Get query parameters first
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Handle OAuth errors
    if (error) {
      console.error('OAuth error:', error);
      return NextResponse.redirect(
        new URL(`/onboarding?teams_error=${encodeURIComponent(error)}`, request.url)
      );
    }

    // Validate required parameters
    if (!code || !state) {
      console.error('Missing required parameters:', { code: !!code, state: !!state });
      return NextResponse.redirect(
        new URL('/onboarding?teams_error=missing_parameters', request.url)
      );
    }

    // Extract userId from state parameter (this is how we identify the user)
    let userId: string;
    try {
      const stateData = JSON.parse(Buffer.from(state, 'base64').toString()) as { 
        userId: string; 
        timestamp: number 
      };
      
      userId = stateData.userId;
      
      // Check if state is too old (1 hour)
      const now = Date.now();
      if (now - stateData.timestamp > 60 * 60 * 1000) {
        console.error('State parameter expired');
        return NextResponse.redirect(
          new URL('/onboarding?teams_error=expired_state', request.url)
        );
      }
    } catch (error) {
      console.error('Invalid state parameter:', error);
      return NextResponse.redirect(
        new URL('/onboarding?teams_error=invalid_state', request.url)
      );
    }

    // Now get the session to verify the user (optional check)
    const session = await auth();
    if (session?.user?.id && session.user.id !== userId) {
      console.error('Session user mismatch:', { sessionUserId: session.user.id, stateUserId: userId });
      return NextResponse.redirect(
        new URL('/onboarding?teams_error=user_mismatch', request.url)
      );
    }

    console.log('🔵 Processing OAuth callback for user:', userId);

    // Exchange code for tokens
    console.log('🔵 Step 1: Exchanging code for tokens...');
    const tokens = await TeamsConnectService.exchangeCodeForTokens(code);
    console.log('🟢 Step 1 completed: Got tokens');
    
    // Get user info from Microsoft Graph
    console.log('🔵 Step 2: Getting user info...');
    let userInfo: TeamsUserInfo;
    try {
      userInfo = await TeamsConnectService.getUserInfo(tokens.access_token);
      console.log('🟢 Step 2 completed: Got user info from /me endpoint');
    } catch (error) {
      console.log('🔴 Failed to get user info from /me endpoint, trying ID token fallback');
      console.log('🔴 Error:', error instanceof Error ? error.message : String(error));
      // Fallback: try to extract user info from ID token
      if (tokens.id_token) {
        const extractedUserInfo = TeamsConnectService.extractUserInfoFromIdToken(tokens.id_token);
        if (!extractedUserInfo) {
          throw new Error('Failed to extract user info from ID token');
        }
        userInfo = extractedUserInfo;
        console.log('🟢 Step 2 completed: Successfully extracted user info from ID token');
      } else {
        throw new Error('No ID token available for fallback');
      }
    }
    
    // Save to database
    console.log('🔵 Step 3: Saving to database...');
    await TeamsConnectService.saveTeamsAccount(
      userId,
      tokens,
      userInfo
    );
    console.log('🟢 Step 3 completed: Saved to database');

    // Redirect back to onboarding for processing
    console.log('🟢 OAuth flow completed successfully! Redirecting to onboarding...');
    return NextResponse.redirect(
      new URL('/onboarding?teams_success=true', request.url)
    );

  } catch (error) {
    console.error('🔴 Error in Teams callback:', error);
    console.error('🔴 Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    return NextResponse.redirect(
      new URL(`/onboarding?teams_error=${encodeURIComponent('connection_failed')}`, request.url)
    );
  }
}

// Add a simple test endpoint
export async function POST(_request: NextRequest) {
  console.log('🟡 Test POST endpoint hit');
  return NextResponse.json({ message: 'Teams API route is working', timestamp: new Date().toISOString() });
} 