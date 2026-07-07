"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Copy, Trash2, Upload } from "lucide-react";

export type MediaItem = {
  id: number;
  filename: string;
  mime_type: string;
  size_bytes: number;
  created_at: string;
};

export function MediaLibrary({ items }: { items: MediaItem[] }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/media/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Upload failed.");
        return;
      }
      router.refresh();
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this image? Pages currently referencing it will fall back to their default.")) return;
    await fetch(`/api/media/${id}`, { method: "DELETE" });
    router.refresh();
  }

  function copyUrl(id: number) {
    navigator.clipboard.writeText(`/api/media/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-muted-foreground">
          {items.length} image{items.length === 1 ? "" : "s"} uploaded. Copy a URL to paste into
          any image field in Content.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          <Upload className="h-4 w-4" /> {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
          No images uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-2xl bg-card shadow-sm">
              <div className="relative aspect-square bg-muted">
                <Image
                  src={`/api/media/${item.id}`}
                  alt={item.filename}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-3">
                <p className="truncate text-xs font-medium text-primary">{item.filename}</p>
                <p className="mb-2 text-xs text-muted-foreground">
                  {(item.size_bytes / 1024).toFixed(0)} KB
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => copyUrl(item.id)}
                    className="flex flex-1 items-center justify-center gap-1 rounded-full border border-border py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted"
                  >
                    <Copy className="h-3 w-3" /> {copiedId === item.id ? "Copied!" : "Copy URL"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center justify-center rounded-full border border-border p-1.5 text-destructive hover:bg-destructive/10"
                    aria-label="Delete image"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
