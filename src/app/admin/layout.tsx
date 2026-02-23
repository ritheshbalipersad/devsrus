import Link from "next/link";
import AdminLogout from "./AdminLogout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="border-b border-slate-700/50 bg-slate-800/50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/admin"
            className="text-lg font-semibold text-cyan-400"
          >
            Admin
          </Link>
          <nav className="flex flex-1 flex-wrap items-center gap-2">
            <Link
              href="/admin"
              className="rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              Products
            </Link>
            <Link
              href="/admin/inquiries"
              className="rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              Inquiries
            </Link>
            <AdminLogout />
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
