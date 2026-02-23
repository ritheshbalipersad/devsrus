import Link from "next/link";
import { getProducts } from "@/lib/products";
import { getInquiries } from "@/lib/inquiries";

export default async function AdminDashboard() {
  const [products, inquiries] = await Promise.all([
    getProducts(),
    getInquiries(),
  ]);
  const newInquiries = inquiries.filter((i) => i.status === "new").length;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      <p className="mt-2 text-slate-400">
        Manage your products and contact inquiries.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Link
          href="/admin/products"
          className="block rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 transition hover:border-cyan-500/50"
        >
          <h2 className="text-xl font-semibold text-white">Products</h2>
          <p className="mt-2 text-3xl font-bold text-cyan-400">{products.length}</p>
          <p className="mt-1 text-sm text-slate-400">
            Add, edit, or remove products
          </p>
        </Link>
        <Link
          href="/admin/inquiries"
          className="block rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 transition hover:border-cyan-500/50"
        >
          <h2 className="text-xl font-semibold text-white">Inquiries</h2>
          <p className="mt-2 text-3xl font-bold text-orange-400">{inquiries.length}</p>
          <p className="mt-1 text-sm text-slate-400">
            {newInquiries} new — view and mark as replied
          </p>
        </Link>
      </div>
    </div>
  );
}
