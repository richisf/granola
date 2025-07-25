import Link from "next/link";
import { LoginForm } from "~/app/_components/auth/login/login";
import { Button } from "~/app/_components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6">
        <LoginForm />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Button variant="link" className="h-auto p-0 text-sm font-medium" asChild>
              <Link href="/sigup">Sign up</Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
