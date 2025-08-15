import Link from "next/link";
import { Badge } from "~/app/_components/shared/ui/badge";

export function DesktopFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto w-full sm:max-w-[95%] md:max-w-[92%] lg:max-w-[88%] xl:max-w-[85%] px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo and Social */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-bold mb-6">atomatio</div>
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
