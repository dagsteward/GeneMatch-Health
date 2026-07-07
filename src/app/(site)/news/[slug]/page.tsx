import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { getPostBySlug } from "@/lib/news";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at ? new Date(post.published_at).toISOString() : undefined,
      images: post.cover_media_id ? [`/api/media/${post.cover_media_id}`] : undefined,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Section className="bg-card">
      <div className="mx-auto max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {post.published_at
            ? new Date(post.published_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : ""}
        </p>
        <h1 className="mb-8 font-heading text-3xl font-semibold text-primary md:text-4xl">
          {post.title}
        </h1>
        {post.cover_media_id && (
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={`/api/media/${post.cover_media_id}`}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="prose prose-neutral max-w-none whitespace-pre-wrap text-muted-foreground">
          {post.body}
        </div>
      </div>
    </Section>
  );
}
