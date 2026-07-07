import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { execute } from "@/lib/db";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File is too large (max 8MB)." }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await execute(
      "INSERT INTO media (filename, mime_type, data, size_bytes) VALUES (?, ?, ?, ?)",
      [file.name, file.type, buffer, file.size]
    );
    return NextResponse.json({ id: result.insertId, url: `/api/media/${result.insertId}` });
  } catch (err) {
    console.error("[media/upload] failed:", (err as Error).message);
    return NextResponse.json({ error: "Could not save the file." }, { status: 503 });
  }
}
