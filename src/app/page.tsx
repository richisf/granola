"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useIsMobile } from "~/app/_components/hooks/use-mobile";
import { DesktopLayout } from "~/app/_components/landing/desktop/layout";
import { DesktopBody } from "~/app/_components/landing/desktop/body";
import { MobileLayout } from "~/app/_components/landing/mobile/layout";
import { MobileBody } from "~/app/_components/landing/mobile/body";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  // Show loading state while checking auth
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Don't render landing page if user is authenticated
  if (status === "authenticated") {
    return null;
  }

  // Show desktop version by default until mobile detection is complete
  if (isMobile === undefined) {
    return <DesktopLayout />;
  }

  if (isMobile) {
    return (
      <MobileLayout>
        <MobileBody />
      </MobileLayout>
    );
  }

  return <DesktopLayout />;
}
