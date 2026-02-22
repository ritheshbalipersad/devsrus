import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-700/50 bg-slate-900/80">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-cyan-400"
            >
              devsrus
            </Link>
            <p className="mt-2 max-w-sm text-sm text-slate-400">
              Software development for small to medium enterprises. Automate processes, replace paperwork, and streamline your business.
            </p>
          </div>
          <nav className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 transition hover:text-cyan-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10 border-t border-slate-700/50 pt-8">
          <p className="text-center text-sm text-slate-500">
            © {new Date().getFullYear()} devsrus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
