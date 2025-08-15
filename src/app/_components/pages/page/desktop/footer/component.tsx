import Link from "next/link";

export function DesktopFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto w-full sm:max-w-[95%] md:max-w-[92%] lg:max-w-[88%] xl:max-w-[85%] px-4 py-16">
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-48">
            {/* Logo and Social */}
            <div className="col-span-2 md:col-span-1">
              <div className="text-2xl font-bold mb-6">atomatio</div>
            </div>

            {/* Import from */}
            <div>
              <h3 className="font-semibold mb-4">Import from</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link href="#" className="hover:text-white">Salesforce</Link></li>
                <li><Link href="#" className="hover:text-white">Hubspot</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link href="#" className="hover:text-white">Customers</Link></li>
                <li><Link href="#" className="hover:text-white">Become a partner</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link href="#" className="hover:text-white">Startup program</Link></li>
                <li><Link href="#" className="hover:text-white">Downloads</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
