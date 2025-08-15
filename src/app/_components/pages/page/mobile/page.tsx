import { type ReactNode } from "react";
import { MobileHeader } from "./header/page";
import { MobileFooter } from "./footer/page";

interface MobileLayoutProps {
  children: ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <MobileHeader />
      <main className="flex-1">
        {children}
      </main>
      <MobileFooter />
    </div>
  );
}
