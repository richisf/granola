import Link from "next/link";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { Button } from "~/app/_components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/app/_components/ui/card";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full p-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to Atomatio</CardTitle>
            <CardDescription>
              The AI-native ERP - Get started with your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/sigin">Sign Up</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
