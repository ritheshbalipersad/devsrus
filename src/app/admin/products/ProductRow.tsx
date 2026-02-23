"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/products";
import DeleteProductButton from "./DeleteProductButton";
import ProductImageField from "@/components/ProductImageField";

type Props = {
  product: Product;
};

export default function ProductRow({ product }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle"
  );
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    category: product.category,
    imageUrl: product.imageUrl ?? "",
  });

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("saving");

    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.id,
          name: form.name,
          description: form.description,
          category: form.category,
          imageUrl: form.imageUrl || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        return;
      }

      setStatus("success");
      setEditing(false);
      router.refresh();
    } catch {
      setStatus("error");
    }
  }

  function handleCancel() {
    setForm({
      name: product.name,
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl ?? "",
    });
    setEditing(false);
    setStatus("idle");
  }

  if (editing) {
    return (
      <li className="rounded-xl border border-slate-600 bg-slate-800/80 p-4">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Category
            </label>
            <input
              type="text"
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <div>
            <ProductImageField
              id={`image-${product.id}`}
              value={form.imageUrl}
              onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
            />
          </div>
          {status === "error" && (
            <p className="text-sm text-red-400">Failed to save. Try again.</p>
          )}
          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={status === "saving"}
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-400 disabled:opacity-50"
            >
              {status === "saving" ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={status === "saving"}
              className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="flex flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <span className="text-sm text-cyan-400">{product.category}</span>
        <h3 className="font-semibold text-white">{product.name}</h3>
        <p className="mt-1 truncate text-sm text-slate-400">
          {product.description}
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-600"
        >
          Edit
        </button>
        <DeleteProductButton productId={product.id} productName={product.name} />
      </div>
    </li>
  );
}
