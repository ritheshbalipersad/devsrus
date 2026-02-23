"use client";

import { useState, useRef } from "react";

type Props = {
  value: string;
  onChange: (url: string) => void;
  id?: string;
};

export default function ProductImageField({ value, onChange, id = "imageUrl" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.set("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setUploadError(data.error || "Upload failed");
        return;
      }

      if (data.url) {
        onChange(data.url);
      }
    } catch {
      setUploadError("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-slate-300">
        Image URL or upload
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => {
          setUploadError("");
          onChange(e.target.value);
        }}
        className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        placeholder="https://... or upload below"
      />
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
          aria-label="Upload image"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-600 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload image"}
        </button>
        {value && (
          <span className="text-xs text-slate-500">
            Current: {value.startsWith("/") ? value : "external URL"}
          </span>
        )}
      </div>
      {uploadError && (
        <p className="text-sm text-red-400" role="alert">
          {uploadError}
        </p>
      )}
    </div>
  );
}
