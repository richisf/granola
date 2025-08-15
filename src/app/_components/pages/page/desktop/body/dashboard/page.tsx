"use client";

import { Header } from "~/app/_components/pages/dashboard/header/page";
import { Sidebar } from "~/app/_components/pages/dashboard/sidebar/page";
import { Table } from "~/app/_components/pages/dashboard/main/table/page";

export function DashboardPreview() {
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
          
          {/* Content - Takes remaining height */}
          <main className="flex-1 bg-white overflow-hidden">
            <Table />
          </main>
        </div>
      </div>
    </div>
  );
} 