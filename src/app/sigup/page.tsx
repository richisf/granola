import Link from "next/link";
import { SignupForm } from "~/app/_components/auth/sigup/signup";
import { Button } from "~/app/_components/ui/button";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6">
        <SignupForm />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Button variant="link" className="h-auto p-0 text-sm font-medium" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
