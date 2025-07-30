"use client";

import { DashboardHeader } from "~/app/_components/dashboard/header";
import { DashboardSidebar } from "~/app/_components/dashboard/sidebar";
import { TableLayout } from "~/app/_components/dashboard/table/layout";

export function DashboardPreview() {
  return (
    <div className="h-[600px] w-full bg-gray-50 overflow-hidden border rounded-lg shadow-lg pointer-events-none select-none">
      <div className="h-full flex">
        {/* Sidebar - Full height */}
        <DashboardSidebar 
          activeSection="table" 
          onSectionChange={(_section: string) => {
            // No-op function since this is a non-interactive preview
          }}
        />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header - Only over main content */}
          <DashboardHeader activeSection="table" />
          
          {/* Content - Takes remaining height */}
          <main className="flex-1 bg-white overflow-hidden">
            <TableLayout />
          </main>
        </div>
      </div>
    </div>
  );
} 