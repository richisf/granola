import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Separator } from "~/app/_components/ui/separator";

export function MobileFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto px-6 py-12">
        {/* Logo and Social */}
        <div className="text-center mb-8">
          <div className="text-xl font-bold mb-4">attio</div>
          <div className="flex justify-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
            </Button>
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
            © 2024 Attio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
