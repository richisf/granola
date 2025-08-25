"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "~/app/_components/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/app/_components/shared/ui/card";
import { Alert, AlertDescription } from "~/app/_components/shared/ui/alert";
import { CheckCircle, AlertCircle, Loader2, Users } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Check for OAuth callback results
  useEffect(() => {
    const teamsSuccess = searchParams.get('teams_success');
    const teamsError = searchParams.get('teams_error');

    if (teamsSuccess === 'true') {
      setConnectionStatus('success');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } else if (teamsError) {
      setConnectionStatus('error');
      setErrorMessage(getErrorMessage(teamsError));
    }
  }, [searchParams, router]);

  const getErrorMessage = (error: string): string => {
    switch (error) {
      case 'missing_parameters':
        return 'Missing required parameters from Microsoft. Please try again.';
      case 'expired_state':
        return 'The authentication request has expired. Please try again.';
      case 'invalid_state':
        return 'Invalid authentication state. Please try again.';
      case 'user_mismatch':
        return 'User session mismatch. Please log out and try again.';
      case 'connection_failed':
        return 'Failed to connect to Microsoft Teams. Please try again.';
      default:
        return `Authentication error: ${error}. Please try again.`;
    }
  };

  const handleConnectTeams = async () => {
    if (!session?.user?.id) {
      setConnectionStatus('error');
      setErrorMessage('Please log in first to connect Teams.');
      return;
    }

    setIsConnecting(true);
    setConnectionStatus('idle');
    setErrorMessage('');

    try {
      // Generate Teams auth URL
      const response = await fetch('/api/teams/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: session.user.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate authentication URL');
      }

      const { authUrl } = await response.json() as { authUrl: string };
      
      // Redirect to Microsoft Teams OAuth
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error connecting to Teams:', error);
      setConnectionStatus('error');
      setErrorMessage('Failed to initiate Teams connection. Please try again.');
      setIsConnecting(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please log in to continue with the onboarding process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => router.push('/auth/login')} 
              className="w-full"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Granola</h1>
          <p className="mt-2 text-gray-600">
            Connect your Microsoft Teams to get started with meeting transcripts
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-blue-600" />
              <div>
                <CardTitle>Connect Microsoft Teams</CardTitle>
                <CardDescription>
                  Access your Teams meetings and transcripts to enhance your productivity
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {connectionStatus === 'success' && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Successfully connected to Microsoft Teams! Redirecting to dashboard...
                </AlertDescription>
              </Alert>
            )}

            {connectionStatus === 'error' && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">What you&apos;ll get access to:</p>
                <ul className="space-y-1 ml-4">
                  <li>• View your Teams meeting history</li>
                  <li>• Access meeting transcripts</li>
                  <li>• Search through meeting content</li>
                  <li>• Export and organize meeting notes</li>
                </ul>
              </div>

              <Button
                onClick={handleConnectTeams}
                disabled={isConnecting || connectionStatus === 'success'}
                className="w-full"
                size="lg"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting to Teams...
                  </>
                ) : connectionStatus === 'success' ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Connected Successfully
                  </>
                ) : (
                  'Connect Microsoft Teams'
                )}
              </Button>

              {connectionStatus === 'idle' && (
                <p className="text-xs text-gray-500 text-center">
                  You&apos;ll be redirected to Microsoft to authorize access to your Teams data
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="text-gray-600"
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
}
