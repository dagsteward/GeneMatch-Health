import { notFound } from "next/navigation";
import { NewsForm } from "@/components/admin/NewsForm";
import { getPostById } from "@/lib/news";
import { updateNewsPost } from "@/app/admin/news/actions";

export default async function EditNewsPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-8 font-heading text-2xl font-semibold text-primary">Edit Post</h1>
      <NewsForm post={post} action={updateNewsPost.bind(null, post.id)} />
    </div>
  );
}
