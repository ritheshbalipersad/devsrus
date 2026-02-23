"use client";

import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="ml-auto rounded-lg px-4 py-2 text-sm text-slate-400 transition hover:bg-slate-700 hover:text-white"
    >
      Log out
    </button>
  );
}
