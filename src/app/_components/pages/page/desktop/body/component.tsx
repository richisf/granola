import Link from "next/link";
import { Button } from "~/app/_components/shared/ui/button";
import { Badge } from "~/app/_components/shared/ui/badge";
import { Dashboard } from "./dashboard/component";

export function Body() {
  return (
    <div className="bg-white mt-12">
      {/* Hero Section */}
      <div className="mx-auto w-full sm:max-w-[95%] md:max-w-[92%] lg:max-w-[88%] xl:max-w-[85%] px-4 py-10">
        {/* Announcement banner */}
        

        {/* Main heading */}
        <div className="mt-32 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-gray-900 leading-tight">
            Giving Structure
            <br />
            to your meetings
          </h1>
          
          <p className="mt-4 text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            A simple extension to Granola&apos;s features
          </p>

          
        </div>
      </div>
      
    </div>
  );
}
