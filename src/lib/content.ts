import { query, execute } from "@/lib/db";

type ContentRow = { content_key: string; value: string };

/**
 * Look up a single content override. Falls back to `fallback` if there's no
 * override yet, or if the database is unreachable — a DB hiccup must never
 * break page rendering.
 */
export async function getContent(key: string, fallback: string): Promise<string> {
  try {
    const rows = await query<ContentRow>(
      "SELECT content_key, value FROM content_blocks WHERE content_key = ? LIMIT 1",
      [key]
    );
    return rows[0]?.value ?? fallback;
  } catch (err) {
    console.warn(`[content] falling back for "${key}":`, (err as Error).message);
    return fallback;
  }
}

/**
 * Batch version — one query for many keys. `fallbacks` maps key -> default.
 * Returns a map with every requested key present (override or fallback).
 */
export async function getContentMap(
  fallbacks: Record<string, string>
): Promise<Record<string, string>> {
  const keys = Object.keys(fallbacks);
  if (keys.length === 0) return {};

  const result = { ...fallbacks };
  try {
    const placeholders = keys.map(() => "?").join(", ");
    const rows = await query<ContentRow>(
      `SELECT content_key, value FROM content_blocks WHERE content_key IN (${placeholders})`,
      keys
    );
    for (const row of rows) {
      result[row.content_key] = row.value;
    }
  } catch (err) {
    console.warn("[content] batch fetch failed, using fallbacks:", (err as Error).message);
  }
  return result;
}

export async function setContent(key: string, value: string, adminId: number): Promise<void> {
  await execute(
    `INSERT INTO content_blocks (content_key, value, updated_by) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE value = VALUES(value), updated_by = VALUES(updated_by)`,
    [key, value, adminId]
  );
}
