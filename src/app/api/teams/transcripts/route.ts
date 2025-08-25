import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export async function GET(_request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the user's Teams account
    const teamsAccount = await db.teamsAccount.findFirst({
      where: {
        userId: session.user.id
      }
    });

    if (!teamsAccount) {
      return NextResponse.json(
        { error: 'Teams account not connected. Please connect your Teams account first.' },
        { status: 404 }
      );
    }

    // Fetch transcripts from database
    const transcripts = await db.meetingTranscript.findMany({
      where: {
        organizerId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    });

    return NextResponse.json({
      transcripts,
      count: transcripts.length
    });

  } catch (error) {
    console.error('Error fetching transcripts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transcripts' },
      { status: 500 }
    );
  }
}
