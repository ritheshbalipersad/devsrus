"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductImageField from "@/components/ProductImageField";

export default function AdminProductForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "Software",
    imageUrl: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          imageUrl: form.imageUrl || undefined,
        }),
      });

      if (!res.ok) throw new Error("Failed to add");

      setStatus("success");
      setForm({ name: "", description: "", category: "Software", imageUrl: "" });
      router.refresh();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300">
          Name *
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-300">
          Category
        </label>
        <input
          id="category"
          type="text"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          placeholder="e.g. Software, App, Tool"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-300">
          Description *
        </label>
        <textarea
          id="description"
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
          id="imageUrl"
          value={form.imageUrl}
          onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
        />
      </div>
      {status === "success" && (
        <p className="text-emerald-400">Product added successfully.</p>
      )}
      {status === "error" && (
        <p className="text-red-400">Failed to add product. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-cyan-500 px-6 py-2 font-semibold text-slate-900 transition hover:bg-cyan-400 disabled:opacity-50"
      >
        {status === "sending" ? "Adding..." : "Add product"}
      </button>
    </form>
  );
}
