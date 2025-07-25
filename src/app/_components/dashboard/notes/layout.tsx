"use client";

import { StickyNote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/app/_components/ui/card";

export function NotesLayout() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center space-x-2 px-6 py-4 border-b bg-gray-50 flex-shrink-0">
        <StickyNote className="h-4 w-4" />
        <h1 className="text-lg font-medium">Notes</h1>
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Notes Section</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">This section will contain your notes and documents.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
