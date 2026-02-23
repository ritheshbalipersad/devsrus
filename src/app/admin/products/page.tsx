import { getProducts } from "@/lib/products";
import AdminProductForm from "./AdminProductForm";
import ProductRow from "./ProductRow";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Products</h1>
      <p className="mt-2 text-slate-400">
        Add new products or edit and manage existing ones.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-white">Add new product</h2>
        <AdminProductForm />
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-white">Existing products</h2>
        {products.length === 0 ? (
          <p className="mt-4 text-slate-400">No products yet. Add one above.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {products.map((p) => (
              <ProductRow key={p.id} product={p} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
