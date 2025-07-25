import Link from "next/link";
import { Badge } from "~/app/_components/ui/badge";
import { Button } from "~/app/_components/ui/button";

export function DesktopFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo and Social */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-bold mb-6">attio</div>
            <div className="flex space-x-2">
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

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <Link href="#" className="hover:text-white">Refer a team</Link>
                <Badge variant="secondary" className="text-xs">New</Badge>
              </li>
              <li><Link href="#" className="hover:text-white">Changelog</Link></li>
              <li><Link href="#" className="hover:text-white">LinkedIn extension</Link></li>
              <li><Link href="#" className="hover:text-white">Gmail extension</Link></li>
              <li><Link href="#" className="hover:text-white">iOS app</Link></li>
              <li><Link href="#" className="hover:text-white">Android app</Link></li>
              <li><Link href="#" className="hover:text-white">Security</Link></li>
            </ul>
          </div>

          {/* Import from */}
          <div>
            <h3 className="font-semibold mb-4">Import from</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="#" className="hover:text-white">Salesforce</Link></li>
              <li><Link href="#" className="hover:text-white">Hubspot</Link></li>
              <li><Link href="#" className="hover:text-white">Pipedrive</Link></li>
              <li><Link href="#" className="hover:text-white">Zoho</Link></li>
              <li><Link href="#" className="hover:text-white">Excel</Link></li>
              <li><Link href="#" className="hover:text-white">CSV</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="#" className="hover:text-white">Customers</Link></li>
              <li><Link href="#" className="hover:text-white">Announcements</Link></li>
              <li className="flex items-center space-x-2">
                <Link href="#" className="hover:text-white">Engineering blog</Link>
                <Badge variant="secondary" className="text-xs">New</Badge>
              </li>
              <li><Link href="#" className="hover:text-white">Careers</Link></li>
              <li><Link href="#" className="hover:text-white">Manifesto</Link></li>
              <li><Link href="#" className="hover:text-white">Become a partner</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="#" className="hover:text-white">Startup program</Link></li>
              <li><Link href="#" className="hover:text-white">Help center</Link></li>
              <li><Link href="#" className="hover:text-white">Automation templates</Link></li>
              <li><Link href="#" className="hover:text-white">Developers</Link></li>
              <li><Link href="#" className="hover:text-white">System status</Link></li>
              <li><Link href="#" className="hover:text-white">Hire an expert</Link></li>
              <li><Link href="#" className="hover:text-white">Downloads</Link></li>
            </ul>
          </div>

          {/* Apps */}
          <div>
            <h3 className="font-semibold mb-4">Apps</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="#" className="hover:text-white">Gmail</Link></li>
              <li><Link href="#" className="hover:text-white">Outlook</Link></li>
              <li><Link href="#" className="hover:text-white">Customer.io</Link></li>
              <li><Link href="#" className="hover:text-white">Segment</Link></li>
              <li><Link href="#" className="hover:text-white">Mailchimp</Link></li>
              <li><Link href="#" className="hover:text-white">June</Link></li>
              <li><Link href="#" className="hover:text-white">Slack</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
