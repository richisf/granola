"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Search, Settings, Download, ChevronDown, MoreVertical } from "lucide-react";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "~/app/_components/ui/avatar";

interface DashboardHeaderProps {
  activeSection: string;
}

const sectionTitles: Record<string, string> = {
  "table": "Companies",
  "notifications": "Notifications",
  "tasks": "Tasks",
  "notes": "Notes"
};

export function DashboardHeader({ activeSection }: DashboardHeaderProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const sectionTitle = sectionTitles[activeSection] ?? "Dashboard";

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
          <span className="text-sm font-medium">{sectionTitle}</span>
        </div>

        {/* Right side - Actions and user */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search"
              className="w-48 pl-8 h-8 text-sm"
            />
          </div>

          {/* Quick Actions */}
          <Button variant="outline" size="sm" className="h-8 text-xs">
            Quick actions
          </Button>

          {/* View Settings */}
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Settings className="mr-1 h-3 w-3" />
            View settings
          </Button>

          {/* Import/Export */}
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Download className="mr-1 h-3 w-3" />
            Import / Export
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>

          {/* User avatars */}
          <div className="flex items-center -space-x-1">
            <Avatar className="h-6 w-6 ring-1 ring-white">
              <AvatarFallback className="bg-blue-500 text-white text-xs">U1</AvatarFallback>
            </Avatar>
            <Avatar className="h-6 w-6 ring-1 ring-white">
              <AvatarFallback className="bg-orange-500 text-white text-xs">U2</AvatarFallback>
            </Avatar>
            <Avatar className="h-6 w-6 ring-1 ring-white">
              <AvatarFallback className="bg-green-500 text-white text-xs">U3</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="h-6 w-6 rounded-full p-0 ml-1 text-xs">
              +1
            </Button>
          </div>

          {/* More menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {session?.user?.name ?? "User"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
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
