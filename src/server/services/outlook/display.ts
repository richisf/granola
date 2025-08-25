import { TeamsConnectService } from "./connect";
import { db } from "~/server/db";

export interface TeamsMeeting {
  id: string;
  subject: string;
  organizer: {
    identity: {
      user: {
        id: string;
        displayName: string;
        tenantId: string;
      };
    };
  };
  startDateTime: string;
  endDateTime: string;
  joinWebUrl: string;
  participants: {
    organizer: {
      identity: {
        user: {
          id: string;
          displayName: string;
        };
      };
    };
    attendees: Array<{
      identity: {
        user: {
          id: string;
          displayName: string;
        };
      };
    }>;
  };
}

export interface TeamsTranscript {
  id: string;
  meetingId: string;
  meetingOrganizerId: string;
  transcriptContentUrl: string;
  createdDateTime: string;
}

export interface TeamsTranscriptContent {
  text: string;
  participants: Array<{
    id: string;
    displayName: string;
  }>;
}

export interface TeamsMeetingsResponse {
  value: TeamsMeeting[];
  '@odata.nextLink'?: string;
}

export interface TeamsTranscriptsResponse {
  value: TeamsTranscript[];
  '@odata.nextLink'?: string;
}

export class TeamsTranscriptService {
  private static readonly GRAPH_BASE_URL = "https://graph.microsoft.com/v1.0";

  static async getRecentMeetings(
    userId: string,
    email: string,
    limit = 20
  ): Promise<TeamsMeeting[]> {
    try {
      // Get a valid access token
      const accessToken = await TeamsConnectService.getValidAccessToken(userId, email);

      // Fetch recent online meetings
      const params = new URLSearchParams({
        '$top': limit.toString(),
        '$orderby': 'startDateTime desc',
        '$select': 'id,subject,organizer,startDateTime,endDateTime,joinWebUrl,participants'
      });

      const response = await fetch(
        `${this.GRAPH_BASE_URL}/me/onlineMeetings?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to fetch meetings: ${error}`);
      }

      const data = await response.json() as TeamsMeetingsResponse;
      return data.value;
    } catch (error) {
      console.error('Error fetching Teams meetings:', error);
      throw error;
    }
  }

  static async getMeetingTranscripts(
    userId: string,
    email: string,
    meetingId: string
  ): Promise<TeamsTranscript[]> {
    try {
      const accessToken = await TeamsConnectService.getValidAccessToken(userId, email);

      const response = await fetch(
        `${this.GRAPH_BASE_URL}/me/onlineMeetings/${meetingId}/transcripts`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to fetch meeting transcripts: ${error}`);
      }

      const data = await response.json() as TeamsTranscriptsResponse;
      return data.value;
    } catch (error) {
      console.error('Error fetching Teams meeting transcripts:', error);
      throw error;
    }
  }

  static async getTranscriptContent(
    userId: string,
    email: string,
    meetingId: string,
    transcriptId: string
  ): Promise<TeamsTranscriptContent> {
    try {
      const accessToken = await TeamsConnectService.getValidAccessToken(userId, email);

      const response = await fetch(
        `${this.GRAPH_BASE_URL}/me/onlineMeetings/${meetingId}/transcripts/${transcriptId}/content?$format=text/vtt`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'text/plain'
          }
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to fetch transcript content: ${error}`);
      }

      const vttContent = await response.text();
      
      // Parse VTT content to extract text and participants
      const { text, participants } = this.parseVTTContent(vttContent);
      
      return { text, participants };
    } catch (error) {
      console.error('Error fetching transcript content:', error);
      throw error;
    }
  }

  static async getMeetingsFromDate(
    userId: string,
    email: string,
    fromDate: Date,
    limit = 200
  ): Promise<TeamsMeeting[]> {
    try {
      const accessToken = await TeamsConnectService.getValidAccessToken(userId, email);

      // Format date for Microsoft Graph API
      const formattedDate = fromDate.toISOString();

      const params = new URLSearchParams({
        '$top': limit.toString(),
        '$orderby': 'startDateTime desc',
        '$filter': `startDateTime ge ${formattedDate}`,
        '$select': 'id,subject,organizer,startDateTime,endDateTime,joinWebUrl,participants'
      });

      const response = await fetch(
        `${this.GRAPH_BASE_URL}/me/onlineMeetings?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to fetch meetings from date: ${error}`);
      }

      const data = await response.json() as TeamsMeetingsResponse;
      return data.value;
    } catch (error) {
      console.error('Error fetching Teams meetings from date:', error);
      throw error;
    }
  }

  static async saveTranscriptToDatabase(
    transcriptId: string,
    meetingId: string,
    organizerId: string,
    subject: string,
    startTime: Date,
    endTime: Date | null,
    transcriptContent: string,
    participants: Array<{ id: string; displayName: string }>
  ) {
    try {
      // First, ensure the meeting exists
      await db.teamsMeeting.upsert({
        where: {
          meetingId
        },
        update: {
          subject,
          endTime,
          participants,
        },
        create: {
          meetingId,
          subject,
          organizerId,
          startTime,
          endTime,
          participants,
        }
      });

      // Then save the transcript
      return await db.meetingTranscript.upsert({
        where: {
          transcriptId
        },
        update: {
          content: transcriptContent,
          participants,
          endTime,
        },
        create: {
          transcriptId,
          meetingId,
          organizerId,
          subject,
          startTime,
          endTime,
          content: transcriptContent,
          participants,
        }
      });
    } catch (error) {
      console.error('Error saving transcript to database:', error);
      throw error;
    }
  }

  static async getAllMeetingsWithTranscripts(
    userId: string,
    email: string,
    fromDate: Date,
    batchSize = 50
  ): Promise<TeamsMeeting[]> {
    try {
      const accessToken = await TeamsConnectService.getValidAccessToken(userId, email);
      
      // Format date for Microsoft Graph API
      const formattedDate = fromDate.toISOString();

      const allMeetings: TeamsMeeting[] = [];
      let nextLink: string | undefined;
      let pageCount = 0;

      // Initial request
      const params = new URLSearchParams({
        '$top': batchSize.toString(),
        '$orderby': 'startDateTime desc',
        '$filter': `startDateTime ge ${formattedDate}`,
        '$select': 'id,subject,organizer,startDateTime,endDateTime,joinWebUrl,participants'
      });

      let url = `${this.GRAPH_BASE_URL}/me/onlineMeetings?${params.toString()}`;

      do {
        pageCount++;
        console.log(`🎥 Fetching meetings page ${pageCount} (batch size: ${batchSize})`);

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`Failed to fetch meetings page ${pageCount}: ${error}`);
        }

        const data = await response.json() as TeamsMeetingsResponse;
        allMeetings.push(...data.value);
        
        nextLink = data['@odata.nextLink'];
        url = nextLink ?? '';

        console.log(`🎥 Page ${pageCount}: Got ${data.value.length} meetings (total so far: ${allMeetings.length})`);

        // Safety check to prevent infinite loops
        if (pageCount > 20) {
          console.warn(`⚠️  Stopping pagination after ${pageCount} pages to prevent infinite loop`);
          break;
        }

      } while (nextLink);

      console.log(`✅ Finished fetching ALL meetings: ${allMeetings.length} total meetings across ${pageCount} pages`);
      return allMeetings;

    } catch (error) {
      console.error('Error fetching all Teams meetings from date:', error);
      throw error;
    }
  }

  // Helper method to parse VTT content and extract text and participants
  private static parseVTTContent(vttContent: string): { text: string; participants: Array<{ id: string; displayName: string }> } {
    const lines = vttContent.split('\n');
    const participants = new Map<string, string>();
    const textLines: string[] = [];

    let currentSpeaker = '';
    
    for (const line of lines) {
      // Skip VTT headers and timestamps
      if (line.startsWith('WEBVTT') || line.includes('-->') || line.trim() === '') {
        continue;
      }
      
      // Look for speaker identification (format varies)
      const vttSpeakerRegex = /^<v\s+([^>]+)>/i;
      const colonSpeakerRegex = /^([^:]+):/;
      const vttMatch = vttSpeakerRegex.exec(line);
      const colonMatch = vttMatch ? null : colonSpeakerRegex.exec(line);
      const speakerMatch = vttMatch ?? colonMatch;
      
      if (speakerMatch) {
        currentSpeaker = speakerMatch[1]?.trim() ?? '';
        if (currentSpeaker && !participants.has(currentSpeaker)) {
          participants.set(currentSpeaker, currentSpeaker);
        }
        
        // Extract the actual text after speaker identification
        const text = line.replace(/^<v\s+[^>]+>/i, '').replace(/^[^:]+:/, '').trim();
        if (text) {
          textLines.push(`${currentSpeaker}: ${text}`);
        }
      } else if (line.trim() && currentSpeaker) {
        // Continuation of previous speaker's text
        textLines.push(`${currentSpeaker}: ${line.trim()}`);
      } else if (line.trim()) {
        // Text without clear speaker identification
        textLines.push(line.trim());
      }
    }

    return {
      text: textLines.join('\n'),
      participants: Array.from(participants.entries()).map(([id, displayName]) => ({ id, displayName }))
    };
  }

  static async processAndSaveTranscripts(
    userId: string,
    email: string,
    meetings: TeamsMeeting[]
  ): Promise<void> {
    console.log(`📝 Processing transcripts for ${meetings.length} meetings...`);
    
    for (const meeting of meetings) {
      try {
        console.log(`📝 Processing meeting: ${meeting.subject} (${meeting.id})`);
        
        // Get transcripts for this meeting
        const transcripts = await this.getMeetingTranscripts(userId, email, meeting.id);
        
        if (transcripts.length === 0) {
          console.log(`📝 No transcripts found for meeting: ${meeting.subject}`);
          continue;
        }

        // Process each transcript (usually there's only one per meeting)
        for (const transcript of transcripts) {
          try {
            const transcriptContent = await this.getTranscriptContent(
              userId, 
              email, 
              meeting.id, 
              transcript.id
            );

            await this.saveTranscriptToDatabase(
              transcript.id,
              meeting.id,
              meeting.organizer.identity.user.id,
              meeting.subject,
              new Date(meeting.startDateTime),
              meeting.endDateTime ? new Date(meeting.endDateTime) : null,
              transcriptContent.text,
              transcriptContent.participants
            );

            console.log(`✅ Saved transcript for meeting: ${meeting.subject}`);
          } catch (error) {
            console.error(`❌ Error processing transcript ${transcript.id} for meeting ${meeting.id}:`, error);
          }
        }
      } catch (error) {
        console.error(`❌ Error processing meeting ${meeting.id}:`, error);
      }
    }
    
    console.log(`✅ Finished processing transcripts for all meetings`);
  }
}