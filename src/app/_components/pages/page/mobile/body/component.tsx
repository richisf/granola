import Link from "next/link";
import { Button } from "~/app/_components/shared/ui/button";
import { Card, CardContent } from "~/app/_components/shared/ui/card";
import { Badge } from "~/app/_components/shared/ui/badge";

export function Body() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="mx-auto px-6 py-12">
        {/* Announcement banner */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
            <span>Atomatio for desktop is here</span>
            <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Badge>
        </div>

        {/* Main heading */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Customer
            <br />
            relationship magic.
          </h1>
          
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Atomatio is the AI-native CRM that builds, scales and grows your company to the next level.
          </p>

          <div className="mt-8 flex flex-col gap-3">
                         <Button size="lg" className="w-full" asChild>
               <Link href="/sigup">Start for free</Link>
             </Button>
            <Button variant="outline" size="lg" className="w-full">
              Talk to sales
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Preview Section */}
      <div className="mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span>Data</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
              <span>Automations</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>Pipeline</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
              <span>Productivity</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              <span>Reporting</span>
            </div>
          </div>
        </div>
        
        <Card className="overflow-hidden shadow-xl">
          <CardContent className="bg-gray-50 p-6 min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <p className="text-gray-600 text-sm">Dashboard Preview</p>
              <p className="text-xs text-gray-400 mt-1">Interactive CRM interface coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
