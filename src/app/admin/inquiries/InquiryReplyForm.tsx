"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  inquiryId: string;
};

export default function InquiryReplyForm({ inquiryId }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorText("");
    setStatus("sending");

    try {
      const res = await fetch("/api/admin/inquiries/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: inquiryId, message }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorText(data.error || "Failed to send reply");
        return;
      }

      setStatus("success");
      setMessage("");
      router.refresh();
    } catch {
      setStatus("error");
      setErrorText("Something went wrong");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-xl border border-slate-600/50 bg-slate-800/50 p-4"
    >
      <label
        htmlFor={`reply-${inquiryId}`}
        className="block text-sm font-medium text-slate-300"
      >
        Reply to this message
      </label>
      <textarea
        id={`reply-${inquiryId}`}
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your reply here. It will be emailed to the sender."
        className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        required
        disabled={status === "sending"}
      />
      {status === "success" && (
        <p className="mt-2 text-sm text-emerald-400">Reply sent successfully.</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-red-400" role="alert">
          {errorText}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending" || !message.trim()}
        className="mt-3 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-400 disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send reply"}
      </button>
    </form>
  );
}
