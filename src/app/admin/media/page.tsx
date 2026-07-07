import { query } from "@/lib/db";
import { MediaLibrary, type MediaItem } from "@/components/admin/MediaLibrary";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  let items: MediaItem[] = [];
  try {
    items = await query<MediaItem>(
      "SELECT id, filename, mime_type, size_bytes, created_at FROM media ORDER BY created_at DESC"
    );
  } catch (err) {
    console.warn("[admin/media] could not load media list:", (err as Error).message);
  }

  return (
    <div>
      <h1 className="mb-2 font-heading text-2xl font-semibold text-primary">Media</h1>
      <p className="mb-8 text-muted-foreground">
        Images uploaded here (or via an image field in Content) are stored in the database and
        served at <code>/api/media/[id]</code>.
      </p>
      <MediaLibrary items={items} />
    </div>
  );
}
