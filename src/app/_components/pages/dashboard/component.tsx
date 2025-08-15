"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "~/app/_components/pages/dashboard/header/component";
import { Sidebar } from "~/app/_components/pages/dashboard/sidebar/component";
import { Table } from "~/app/_components/pages/dashboard/main/table/component";
import { Notes } from "~/app/_components/pages/dashboard/main/notes/component";
import { Notifications } from "~/app/_components/pages/dashboard/main/notifications/component";
import { Tasks } from "~/app/_components/pages/dashboard/main/tasks/component";
import { Skeleton } from "~/app/_components/shared/ui/skeleton";

export function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("table");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  const renderContent = () => {
    switch (activeSection) {
      case "table":
        return <Table />;
      case "notes":
        return <Notes />;
      case "notifications":
        return <Notifications />;
      case "tasks":
        return <Tasks />;
      default:
        return <Table />;
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
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Only over main content */}
        <Header activeSection={activeSection} />
        
        {/* Content - Takes remaining height */}
        <main className="flex-1 bg-white overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
