"use server";

import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { setContent } from "@/lib/content";

export async function saveContentField(key: string, value: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { ok: false, error: "Not authenticated." };
  }

  try {
    await setContent(key, value, admin.id);
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (err) {
    console.error("[admin/content] save failed:", (err as Error).message);
    return { ok: false, error: "Could not save — the database may be unreachable." };
  }
}
