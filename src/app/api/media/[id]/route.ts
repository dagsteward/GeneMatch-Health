import { NextResponse } from "next/server";
import { query, execute } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";

type MediaRow = { data: Buffer; mime_type: string };

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mediaId = Number(id);
  if (!Number.isInteger(mediaId)) {
    return NextResponse.json({ error: "Invalid media id." }, { status: 400 });
  }

  try {
    const rows = await query<MediaRow>("SELECT data, mime_type FROM media WHERE id = ? LIMIT 1", [
      mediaId,
    ]);
    const row = rows[0];
    if (!row) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    return new NextResponse(new Uint8Array(row.data), {
      headers: {
        "Content-Type": row.mime_type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("[media/get] failed:", (err as Error).message);
    return NextResponse.json({ error: "Could not load media." }, { status: 503 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id } = await params;
  const mediaId = Number(id);
  if (!Number.isInteger(mediaId)) {
    return NextResponse.json({ error: "Invalid media id." }, { status: 400 });
  }

  try {
    await execute("DELETE FROM media WHERE id = ?", [mediaId]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[media/delete] failed:", (err as Error).message);
    return NextResponse.json({ error: "Could not delete." }, { status: 503 });
  }
}
