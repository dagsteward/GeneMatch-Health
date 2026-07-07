import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { listAllPosts } from "@/lib/news";
import { deleteNewsPost } from "@/app/admin/news/actions";

export const dynamic = "force-dynamic";

export default async function AdminNewsListPage() {
  const posts = await listAllPosts();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 font-heading text-2xl font-semibold text-primary">News</h1>
          <p className="text-muted-foreground">Write, edit and publish news articles.</p>
        </div>
        <Link
          href="/admin/news/new"
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
          No posts yet — create your first one.
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between rounded-2xl bg-card p-5 shadow-sm"
            >
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <h2 className="font-heading font-semibold text-primary">{post.title}</h2>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      post.status === "published"
                        ? "bg-secondary/10 text-secondary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/news/${post.id}`}
                  className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Link>
                <form action={deleteNewsPost.bind(null, post.id)}>
                  <button
                    type="submit"
                    className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
