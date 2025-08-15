
import { Header } from "./header/component";
import { Body } from "./body/component";
import { Footer } from "./footer/component";

export function Desktop() {
  return (
    <div className="max-w-screen min-h-screen flex flex-col">
      {/* Header - fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <Header />
      </div>

      {/* Main content area with boundary lines - with top padding for fixed header */}
      <main className="flex-1 relative pt-20">
        {/* Visual structure lines - left and right boundaries only for main content */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="mx-auto w-full sm:max-w-[95%] md:max-w-[92%] lg:max-w-[88%] xl:max-w-[85%] h-full">
            <div className="relative h-full">
              {/* Left boundary line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border"></div>
              {/* Right boundary line */}
              <div className="absolute right-4 top-0 bottom-0 w-px bg-border"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Body />
        </div>
      </main>

      {/* Footer - no boundary lines */}
      <Footer />
    </div>
  );
}
