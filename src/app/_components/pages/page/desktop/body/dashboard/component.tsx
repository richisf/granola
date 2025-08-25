"use client";

import { Header } from "~/app/_components/pages/dashboard/header/component";
import { Sidebar } from "~/app/_components/pages/dashboard/sidebar/component";

export function Dashboard() {
  return (
    <div className="h-[600px] w-full bg-gray-50 overflow-hidden border rounded-lg shadow-lg pointer-events-none select-none">
      <div className="h-full flex">
        {/* Sidebar - Full height */}
        <Sidebar 
          activeSection="table" 
          onSectionChange={(_section: string) => {
            // No-op function since this is a non-interactive preview
          }}
        />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header - Only over main content */}
          <Header activeSection="table" />
          

        </div>
      </div>
    </div>
  );
} 