import { getProducts } from "@/lib/products";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Our products
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          Ready-made solutions and custom applications for common business challenges.
        </p>

        {products.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-600 bg-slate-800/30 p-12 text-center">
            <p className="text-slate-400">
              No products yet. Check back soon or{" "}
              <Link href="/contact" className="text-cyan-400 hover:underline">
                contact us
              </Link>{" "}
              to discuss your needs.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 transition hover:border-cyan-500/50"
              >
                {product.imageUrl ? (
                  <div className="aspect-video bg-slate-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
                    <span className="text-5xl text-slate-500">📦</span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-sm font-medium text-cyan-400">
                    {product.category}
                  </span>
                  <h2 className="mt-2 text-xl font-bold text-white">
                    {product.name}
                  </h2>
                  <p className="mt-3 flex-1 text-slate-400">{product.description}</p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-block text-cyan-400 font-medium transition hover:text-cyan-300"
                  >
                    Learn more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
