"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { NewsPost } from "@/lib/news";

export function NewsForm({
  post,
  action,
}: {
  post?: NewsPost;
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [coverMediaId, setCoverMediaId] = useState<number | null>(post?.cover_media_id ?? null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/media/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (res.ok) setCoverMediaId(json.id);
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div>
        <Label htmlFor="news-title" className="mb-2 block">
          Title
        </Label>
        <Input id="news-title" name="title" defaultValue={post?.title} required />
      </div>

      <div>
        <Label htmlFor="news-excerpt" className="mb-2 block">
          Excerpt
        </Label>
        <Textarea
          id="news-excerpt"
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt}
          placeholder="A short one or two sentence summary shown in the News list."
          required
        />
      </div>

      <div>
        <Label htmlFor="news-body" className="mb-2 block">
          Body
        </Label>
        <Textarea id="news-body" name="body" rows={10} defaultValue={post?.body} required />
      </div>

      <div>
        <Label className="mb-2 block">Cover Image</Label>
        {coverMediaId && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/api/media/${coverMediaId}`}
            alt=""
            className="mb-2 h-32 w-32 rounded-lg object-cover"
          />
        )}
        <input type="hidden" name="coverMediaId" value={coverMediaId ?? ""} />
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
          className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted disabled:opacity-50"
        >
          <Upload className="h-4 w-4" /> {uploading ? "Uploading..." : "Upload cover image"}
        </button>
      </div>

      <div>
        <Label htmlFor="news-status" className="mb-2 block">
          Status
        </Label>
        <select
          id="news-status"
          name="status"
          defaultValue={post?.status ?? "draft"}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground transition-transform active:scale-95"
      >
        {post ? "Save Changes" : "Create Post"}
      </button>
    </form>
  );
}
