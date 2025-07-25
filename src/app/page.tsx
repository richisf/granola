import Link from "next/link";

import { LatestPost } from "~/app/_components/auth";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Button } from "@/app/_components/ui/button";

export default async function Home() {
  const session = await auth();


  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Hello</h1>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">shadcn/ui Button Examples:</h2>
        
        <div className="flex gap-4 flex-wrap">
          <Button>Default Button</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        
        <div className="flex gap-4 flex-wrap">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
    </div>
  );
}
