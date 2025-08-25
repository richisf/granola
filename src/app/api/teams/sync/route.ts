import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { TeamsTranscriptService } from "~/server/services/outlook/display";
import { db } from "~/server/db";

export async function POST(_request: NextRequest) {
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

    console.log(`🔄 Starting transcript sync for user: ${session.user.id}`);

    // Fetch meetings from the last 7 days (to avoid overwhelming the API)
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 7);

    const meetings = await TeamsTranscriptService.getAllMeetingsWithTranscripts(
      session.user.id,
      teamsAccount.email,
      fromDate,
      20 // Smaller batch size for sync
    );

    console.log(`📅 Found ${meetings.length} meetings to process`);

    // Process and save transcripts
    await TeamsTranscriptService.processAndSaveTranscripts(
      session.user.id,
      teamsAccount.email,
      meetings
    );

    // Get updated transcript count
    const transcriptCount = await db.meetingTranscript.count({
      where: {
        organizerId: session.user.id
      }
    });

    console.log(`✅ Sync completed. Total transcripts: ${transcriptCount}`);

    return NextResponse.json({
      success: true,
      meetingsProcessed: meetings.length,
      totalTranscripts: transcriptCount,
      message: `Successfully processed ${meetings.length} meetings`
    });

  } catch (error) {
    console.error('Error syncing transcripts:', error);
    return NextResponse.json(
      { 
        error: 'Failed to sync transcripts',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
