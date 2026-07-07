import { query, execute } from "@/lib/db";

export type NewsPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_media_id: number | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function listPublishedPosts(): Promise<NewsPost[]> {
  try {
    return await query<NewsPost>(
      "SELECT * FROM news_posts WHERE status = 'published' ORDER BY published_at DESC"
    );
  } catch (err) {
    console.warn("[news] listPublishedPosts failed:", (err as Error).message);
    return [];
  }
}

export async function listAllPosts(): Promise<NewsPost[]> {
  return query<NewsPost>("SELECT * FROM news_posts ORDER BY created_at DESC");
}

export async function getPostBySlug(slug: string): Promise<NewsPost | null> {
  try {
    const rows = await query<NewsPost>(
      "SELECT * FROM news_posts WHERE slug = ? AND status = 'published' LIMIT 1",
      [slug]
    );
    return rows[0] ?? null;
  } catch (err) {
    console.warn("[news] getPostBySlug failed:", (err as Error).message);
    return null;
  }
}

export async function getPostById(id: number): Promise<NewsPost | null> {
  const rows = await query<NewsPost>("SELECT * FROM news_posts WHERE id = ? LIMIT 1", [id]);
  return rows[0] ?? null;
}

export type NewsPostInput = {
  title: string;
  excerpt: string;
  body: string;
  coverMediaId: number | null;
  status: "draft" | "published";
};

export async function createPost(input: NewsPostInput): Promise<number> {
  const slug = slugify(input.title);
  const publishedAt = input.status === "published" ? new Date() : null;
  const result = await execute(
    `INSERT INTO news_posts (slug, title, excerpt, body, cover_media_id, status, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [slug, input.title, input.excerpt, input.body, input.coverMediaId, input.status, publishedAt]
  );
  return result.insertId;
}

export async function updatePost(id: number, input: NewsPostInput): Promise<void> {
  const existing = await getPostById(id);
  const publishedAt =
    input.status === "published" ? (existing?.published_at ?? new Date()) : existing?.published_at ?? null;

  await execute(
    `UPDATE news_posts SET title = ?, excerpt = ?, body = ?, cover_media_id = ?, status = ?, published_at = ?
     WHERE id = ?`,
    [input.title, input.excerpt, input.body, input.coverMediaId, input.status, publishedAt, id]
  );
}

export async function deletePost(id: number): Promise<void> {
  await execute("DELETE FROM news_posts WHERE id = ?", [id]);
}
