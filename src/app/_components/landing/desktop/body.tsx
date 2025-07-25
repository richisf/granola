import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Card, CardContent } from "~/app/_components/ui/card";
import { Badge } from "~/app/_components/ui/badge";

export function DesktopBody() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        {/* Announcement banner */}
        <div className="text-center mb-6">
          <Badge variant="outline" className="rounded-full px-4 py-1 text-sm">
            <span>Attio for desktop is here</span>
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Badge>
        </div>

        {/* Main heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-gray-900 leading-tight">
            Customer
            <br />
            relationship magic.
          </h1>
          
          <p className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Attio is the AI-native CRM that builds, scales and grows your company to the next level.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/sigup">Start for free</Link>
            </Button>
            <Button variant="outline" size="lg">
              Talk to sales
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Preview Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        
        <Card className="overflow-hidden shadow-2xl">
          <CardContent className="bg-gray-50 p-8 min-h-[600px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-gray-600">Dashboard Preview</p>
              <p className="text-sm text-gray-400 mt-2">Interactive CRM interface coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
