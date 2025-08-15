
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useIsMobile } from "~/app/_components/shared/hooks/use-mobile";
import { DesktopLayout } from "~/app/_components/pages/page/desktop/component";
import { MobileLayout } from "~/app/_components/pages/page/mobile/component";
import { MobileBody } from "~/app/_components/pages/page/mobile/body/component";


export function Page() {
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
      <div className="min-h-screen">
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