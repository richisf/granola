"use client";

import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/app/_components/ui/card";
import { Badge } from "~/app/_components/ui/badge";

export function NotificationsLayout() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center space-x-2 px-6 py-4 border-b bg-gray-50 flex-shrink-0">
        <Bell className="h-4 w-4" />
        <h1 className="text-lg font-medium">Notifications</h1>
        <Badge variant="secondary" className="text-xs">3</Badge>
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">This section will contain your notifications and alerts.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
