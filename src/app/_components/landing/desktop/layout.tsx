import { type ReactNode } from "react";
import { DesktopHeader } from "./header";
import { DesktopBody } from "./body";
import { DesktopFooter } from "./footer";

interface DesktopLayoutProps {
  children?: ReactNode;
}

export function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - no boundary lines */}
      <DesktopHeader />

      {/* Main content area with boundary lines */}
      <main className="flex-1 relative">
        {/* Visual structure lines - left and right boundaries only for main content */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="mx-auto max-w-7xl h-full">
            <div className="relative h-full">
              {/* Left boundary line */}
              <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-px bg-border"></div>
              {/* Right boundary line */}
              <div className="absolute right-6 lg:right-8 top-0 bottom-0 w-px bg-border"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {children ?? <DesktopBody />}
        </div>
      </main>

      {/* Footer - no boundary lines */}
      <DesktopFooter />
    </div>
  );
}
