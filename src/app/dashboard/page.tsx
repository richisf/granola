"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardHeader } from "~/app/_components/dashboard/header";
import { DashboardSidebar } from "~/app/_components/dashboard/sidebar";
import { TableLayout } from "~/app/_components/dashboard/table/layout";
import { NotesLayout } from "~/app/_components/dashboard/notes/layout";
import { NotificationsLayout } from "~/app/_components/dashboard/notifications/layout";
import { TasksLayout } from "~/app/_components/dashboard/tasks/layouts";
import { Skeleton } from "~/app/_components/ui/skeleton";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("table");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const renderContent = () => {
    switch (activeSection) {
      case "table":
        return <TableLayout />;
      case "notes":
        return <NotesLayout />;
      case "notifications":
        return <NotificationsLayout />;
      case "tasks":
        return <TasksLayout />;
      default:
        return <TableLayout />;
    }
  };

  if (status === "loading") {
    return (
      <div className="h-screen flex bg-gray-50 overflow-hidden">
        <div className="w-64 border-r bg-white">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="flex-1 flex flex-col">
          <Skeleton className="h-14 w-full" />
          <div className="flex-1 p-6">
            <Skeleton className="h-8 w-48 mb-6" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar - Full height */}
      <DashboardSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Only over main content */}
        <DashboardHeader activeSection={activeSection} />
        
        {/* Content - Takes remaining height */}
        <main className="flex-1 bg-white overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
