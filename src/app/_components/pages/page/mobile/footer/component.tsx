import Link from "next/link";
import { Button } from "~/app/_components/shared/ui/button";
import { Separator } from "~/app/_components/shared/ui/separator";

export function MobileFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto px-6 py-12">
        {/* Logo and Social */}
        <div className="text-center mb-8">
          <div className="text-xl font-bold mb-4">atomatio</div>
          <div className="flex justify-center space-x-4">
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-8 text-center">
          <div>
            <h3 className="font-semibold mb-3 text-sm">Platform</h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs text-gray-300 hover:text-white" asChild>
                  <Link href="#">Refer a team</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs text-gray-300 hover:text-white" asChild>
                  <Link href="#">Security</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs text-gray-300 hover:text-white" asChild>
                  <Link href="#">iOS app</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs text-gray-300 hover:text-white" asChild>
                  <Link href="#">Android app</Link>
                </Button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Company</h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs text-gray-300 hover:text-white" asChild>
                  <Link href="#">Customers</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs text-gray-300 hover:text-white" asChild>
                  <Link href="#">Careers</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs text-gray-300 hover:text-white" asChild>
                  <Link href="#">Help center</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs text-gray-300 hover:text-white" asChild>
                  <Link href="#">Pricing</Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mt-8 bg-gray-800" />
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            © 2024 Atomatio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
