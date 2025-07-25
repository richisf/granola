"use client";

import { useState } from "react";
import { 
  Building2, 
  StickyNote, 
  Bell, 
  CheckSquare, 
  Table
} from "lucide-react";
import { Button } from "~/app/_components/ui/button";
import { Badge } from "~/app/_components/ui/badge";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  {
    title: "Notifications",
    icon: Bell,
    id: "notifications",
    badge: 3
  },
  {
    title: "Tasks",
    icon: CheckSquare,
    id: "tasks"
  },
  {
    title: "Notes",
    icon: StickyNote,
    id: "notes"
  },
  {
    title: "Table",
    icon: Table,
    id: "table"
  }
];

export function DashboardSidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="flex h-full w-64 flex-col bg-gray-50 border-r">
      {/* Basepoint branding - exact height match with header including border */}
      <div 
        className="flex items-center px-4 border-b" 
        style={{ 
          height: '58px',
          boxSizing: 'border-box'
        }}
      >
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 bg-black rounded-md flex items-center justify-center">
            <div className="h-3 w-3 bg-white rounded-sm" />
          </div>
          <span className="font-semibold">Basepoint</span>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className="w-full justify-start h-8 text-sm"
              size="sm"
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
              {item.badge && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
