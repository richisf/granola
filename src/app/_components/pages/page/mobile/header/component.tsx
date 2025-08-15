import Link from "next/link";
import { Button } from "~/app/_components/shared/ui/button";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-xl font-bold text-gray-900">atomatmio</div>
            </Link>
          </div>  

          {/* Auth buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/signup">Start for free</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
