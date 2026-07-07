"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Check, Upload } from "lucide-react";
import type { RegistryField } from "@/lib/content-registry";
import { saveContentField } from "@/app/admin/content/actions";

export function ContentField({ field, initialValue }: { field: RegistryField; initialValue: string }) {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");
  const [jsonError, setJsonError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  function handleJsonChange(next: string) {
    setValue(next);
    try {
      JSON.parse(next);
      setJsonError("");
    } catch {
      setJsonError("Not valid JSON — fix before saving.");
    }
  }

  async function handleSave() {
    if (field.type === "json" && jsonError) return;
    setStatus("saving");
    const result = await saveContentField(field.key, value);
    if (result.ok) {
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/media/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (res.ok) {
        setValue(json.url);
      } else {
        setError(json.error ?? "Upload failed.");
        setStatus("error");
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="border-b border-border py-5 last:border-0">
      <div className="mb-2 flex items-center justify-between gap-4">
        <label className="text-sm font-semibold text-primary">{field.label}</label>
        <div className="flex items-center gap-2">
          {status === "saved" && (
            <span className="flex items-center gap-1 text-xs font-semibold text-secondary">
              <Check className="h-3.5 w-3.5" /> Saved
            </span>
          )}
          {status === "error" && <span className="text-xs text-destructive">{error}</span>}
          <button
            type="button"
            onClick={handleSave}
            disabled={status === "saving" || (field.type === "json" && !!jsonError)}
            className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-50"
          >
            {status === "saving" ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {field.type === "text" && (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
        />
      )}

      {field.type === "richtext" && (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
        />
      )}

      {field.type === "json" && (
        <>
          <textarea
            value={value}
            onChange={(e) => handleJsonChange(e.target.value)}
            rows={10}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs"
          />
          {jsonError && <p className="mt-1 text-xs text-destructive">{jsonError}</p>}
        </>
      )}

      {field.type === "image" && (
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
            {value && <Image src={value} alt="" fill className="object-cover" unoptimized />}
          </div>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
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
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted disabled:opacity-50"
          >
            <Upload className="h-3.5 w-3.5" /> {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}
    </div>
  );
}
