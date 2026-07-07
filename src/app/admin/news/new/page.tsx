import { NewsForm } from "@/components/admin/NewsForm";
import { createNewsPost } from "@/app/admin/news/actions";

export default function NewNewsPostPage() {
  return (
    <div>
      <h1 className="mb-8 font-heading text-2xl font-semibold text-primary">New Post</h1>
      <NewsForm action={createNewsPost} />
    </div>
  );
}
