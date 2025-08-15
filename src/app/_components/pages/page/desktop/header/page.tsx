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

export function DesktopHeader() {
  return (
    <header className="bg-white">
      <div className="mx-auto w-full sm:max-w-[95%] md:max-w-[92%] lg:max-w-[88%] xl:max-w-[85%] px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Left side: Logo + Navigation */}
          <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image 
                src="/name.svg" 
                alt="Logo" 
                width={100} 
                height={26}
                className="h-6 w-auto"
              />
            </Link>

            {/* Navigation */}
            <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-0">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-2 md:px-3 py-2 text-xs sm:text-sm lg:text-base !font-light text-gray-900 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Platform
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[300px]">
                    <NavigationMenuLink asChild>
                      <Link href="#" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">CRM</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Customer relationship management
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="#" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Analytics</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Data insights and reporting
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-2 md:px-3 py-2 text-xs sm:text-sm lg:text-base !font-light text-gray-900 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[300px]">
                    <NavigationMenuLink asChild>
                      <Link href="#" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Documentation</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          API docs and guides
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="#" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Blog</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Latest updates and insights
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="#" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-2 md:px-3 py-2 text-xs sm:text-sm lg:text-base !font-light text-gray-900 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Customers
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="#" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-2 md:px-3 py-2 text-xs sm:text-sm lg:text-base !font-light text-gray-900 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Start for free</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
