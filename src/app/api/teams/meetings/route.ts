import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { TeamsTranscriptService } from "~/server/services/outlook/display";
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

    // Fetch meetings from the last 30 days
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);

    const meetings = await TeamsTranscriptService.getMeetingsFromDate(
      session.user.id,
      teamsAccount.email,
      fromDate,
      50
    );

    return NextResponse.json({
      meetings,
      count: meetings.length
    });

  } catch (error) {
    console.error('Error fetching Teams meetings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meetings' },
      { status: 500 }
    );
  }
}
