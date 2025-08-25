import Link from "next/link";
import Image from "next/image";
import { Button } from "~/app/_components/shared/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/app/_components/shared/ui/navigation-menu";

export function Header() {
  return (
    <header className="bg-white">
      <div className="mx-auto w-full sm:max-w-[95%] md:max-w-[92%] lg:max-w-[88%] xl:max-w-[85%] px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Left side: Logo + Navigation */}
          <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-8">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold flex items-center">
              Granola
            </Link>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
