"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MarkRepliedButton({ inquiryId }: { inquiryId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/inquiries?id=${inquiryId}`, {
        method: "PATCH",
      });
      if (res.ok) router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="shrink-0 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-600 disabled:opacity-50"
    >
      {loading ? "..." : "Mark replied"}
    </button>
  );
}
