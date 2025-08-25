import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { TeamsConnectService } from "~/server/services/outlook/connect";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json() as { userId: string };
    
    if (body.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'User ID mismatch' },
        { status: 403 }
      );
    }

    const { authUrl, state } = TeamsConnectService.generateAuthUrl(session.user.id);

    return NextResponse.json({
      authUrl,
      state
    });

  } catch (error) {
    console.error('Error generating Teams auth URL:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
