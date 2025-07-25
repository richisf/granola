import { type ReactNode } from "react";
import { MobileHeader } from "./header";
import { MobileFooter } from "./footer";

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
