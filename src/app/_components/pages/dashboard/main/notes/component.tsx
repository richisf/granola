"use client";

import { useState } from "react";
import { StickyNote, Video, FileText, Loader2, Calendar, Users, Clock, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/app/_components/shared/ui/card";
import { Button } from "~/app/_components/shared/ui/button";
import { Badge } from "~/app/_components/shared/ui/badge";
import { Alert, AlertDescription } from "~/app/_components/shared/ui/alert";

interface Meeting {
  id: string;
  subject: string;
  startDateTime: string;
  endDateTime?: string;
  organizer: {
    identity: {
      user: {
        displayName: string;
      };
    };
  };
  participants?: {
    attendees: Array<{
      identity: {
        user: {
          displayName: string;
        };
      };
    }>;
  };
}

interface Transcript {
  id: string;
  meetingId: string;
  content: string;
  participants: Array<{
    id: string;
    displayName: string;
  }>;
  createdAt: string;
}

export function Notes() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string>('');
  const [showMeetings, setShowMeetings] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string>('');

  const fetchMeetingsAndTranscripts = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Fetch recent meetings
      const meetingsResponse = await fetch('/api/teams/meetings');
      if (!meetingsResponse.ok) {
        throw new Error('Failed to fetch meetings');
      }
      const meetingsData = await meetingsResponse.json() as { meetings: Meeting[] };
      setMeetings(meetingsData.meetings);

      // Fetch transcripts
      const transcriptsResponse = await fetch('/api/teams/transcripts');
      if (!transcriptsResponse.ok) {
        throw new Error('Failed to fetch transcripts');
      }
      const transcriptsData = await transcriptsResponse.json() as { transcripts: Transcript[] };
      setTranscripts(transcriptsData.transcripts);

      setShowMeetings(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch meetings and transcripts');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTranscriptForMeeting = (meetingId: string) => {
    return transcripts.find(t => t.meetingId === meetingId);
  };

  const syncTranscripts = async () => {
    setIsSyncing(true);
    setSyncMessage('');
    setError('');
    
    try {
      const response = await fetch('/api/teams/sync', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to sync transcripts');
      }

      const result = await response.json() as { 
        success: boolean; 
        meetingsProcessed: number; 
        totalTranscripts: number; 
        message: string;
      };

      setSyncMessage(result.message);
      
      // Refresh the data after sync
      await fetchMeetingsAndTranscripts();
    } catch (error) {
      console.error('Error syncing transcripts:', error);
      setError(error instanceof Error ? error.message : 'Failed to sync transcripts');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <StickyNote className="h-4 w-4" />
          <h1 className="text-lg font-medium">Notes & Meetings</h1>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={syncTranscripts}
            disabled={isSyncing || isLoading}
            variant="outline"
            className="flex items-center space-x-2"
          >
            {isSyncing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span>{isSyncing ? 'Syncing...' : 'Sync Transcripts'}</span>
          </Button>
          
          <Button 
            onClick={fetchMeetingsAndTranscripts}
            disabled={isLoading || isSyncing}
            className="flex items-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Video className="h-4 w-4" />
            )}
            <span>{isLoading ? 'Loading...' : 'Load Meetings'}</span>
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {syncMessage && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">
              {syncMessage}
            </AlertDescription>
          </Alert>
        )}

        {!showMeetings && !isLoading && (
          <Card>
            <CardHeader>
              <CardTitle>Teams Meetings & Transcripts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Use the buttons above to sync your Teams meetings and view transcripts.
              </p>
              <div className="text-sm text-gray-500">
                <p className="font-medium mb-2">How it works:</p>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>Sync Transcripts:</strong> Fetches recent meetings and saves transcripts to database</li>
                  <li>• <strong>Load Meetings:</strong> Displays your meetings and available transcripts</li>
                  <li>• View meeting participants, duration, and full transcript content</li>
                  <li>• Search through meeting transcripts for specific content</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {showMeetings && meetings.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center space-x-2">
              <Video className="h-5 w-5" />
              <span>Recent Meetings ({meetings.length})</span>
            </h2>
            
            {meetings.map((meeting) => {
              const transcript = getTranscriptForMeeting(meeting.id);
              
              return (
                <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{meeting.subject || 'Untitled Meeting'}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(meeting.startDateTime)}</span>
                          </div>
                          {meeting.endDateTime && (
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>
                                {Math.round(
                                  (new Date(meeting.endDateTime).getTime() - 
                                   new Date(meeting.startDateTime).getTime()) / (1000 * 60)
                                )} min
                              </span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{meeting.organizer.identity.user.displayName}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {transcript ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <FileText className="h-3 w-3 mr-1" />
                            Transcript Available
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            No Transcript
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  {transcript && (
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">Meeting Transcript</h4>
                          <span className="text-xs text-gray-500">
                            {transcript.participants.length} participants
                          </span>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
                          <div className="text-sm whitespace-pre-wrap">
                            {transcript.content ? (
                              transcript.content.length > 500 
                                ? `${transcript.content.substring(0, 500)}...`
                                : transcript.content
                            ) : (
                              <span className="text-gray-500 italic">Transcript content not available</span>
                            )}
                          </div>
                        </div>
                        
                        {transcript.participants.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs font-medium text-gray-600">Participants:</span>
                            {transcript.participants.map((participant, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {participant.displayName}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {showMeetings && meetings.length === 0 && !isLoading && (
          <Card>
            <CardContent className="text-center py-8">
              <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No meetings found</p>
              <p className="text-sm text-gray-500 mt-2">
                Make sure you have connected your Teams account and have recent meetings with transcripts.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 