"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "~/app/_components/shared/ui/button";
import { Input } from "~/app/_components/shared/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/_components/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "~/app/_components/shared/ui/avatar";

interface HeaderProps {
  activeSection: string;
}

const sectionTitles: Record<string, string> = {
  "table": "Companies",
  "notifications": "Notifications",
  "tasks": "Tasks",
  "notes": "Notes"
};

export function Header({ activeSection }: HeaderProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/login");
  };

  const sectionTitle = sectionTitles[activeSection] ?? "Dashboard";
  
  // Get first letter of user's name for avatar
  const userInitial = session?.user?.name?.charAt(0)?.toUpperCase() ?? "U";

  return (
    <header className="border-b bg-white flex-shrink-0">
      <div 
        className="flex items-center justify-between px-6" 
        style={{ 
          height: '57px',
          boxSizing: 'border-box'
        }}
      >
        {/* Left side - Section info */}
        <div className="flex items-center">
        </div>

        {/* Right side - Search and user */}
        <div className="flex items-center space-x-4">
          
          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-500 text-white text-sm">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>
                {session?.user?.name ?? "User"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
