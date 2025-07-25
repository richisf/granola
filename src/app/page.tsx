import Link from "next/link";
import { auth } from "~/server/auth";
import { Button } from "~/app/_components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/app/_components/ui/card";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full p-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>
              Get started with your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {session ? (
              <div className="space-y-4">
                <p className="text-center text-sm text-gray-600">
                  Welcome back, {session.user?.name ?? session.user?.email}!
                </p>
                <Button asChild className="w-full">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Button asChild className="w-full">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/sigin">Sign Up</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
