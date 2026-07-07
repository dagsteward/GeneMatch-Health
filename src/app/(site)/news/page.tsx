import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Newspaper } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { listPublishedPosts } from "@/lib/news";
import { site } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "News",
  description: `News and updates from ${site.name}.`,
};

export default async function NewsPage() {
  const posts = await listPublishedPosts();

  return (
    <Section className="bg-card" withHelix>
      <Reveal>
        <Eyebrow>News</Eyebrow>
        <h1 className="mb-10 font-heading text-3xl font-semibold text-primary md:text-5xl">
          News & Updates
        </h1>
      </Reveal>

      {posts.length === 0 ? (
        <Reveal>
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
            <Newspaper className="mx-auto mb-4 h-8 w-8 text-secondary" aria-hidden="true" />
            <h2 className="mb-2 font-heading text-lg font-semibold text-primary">
              Nothing to share yet
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              {site.name} is a newly founded organisation — we&apos;d rather post nothing than
              invent news. As our programmes launch and our first pilots and partnerships take
              shape, we&apos;ll publish real updates here.
            </p>
            <div className="mx-auto max-w-sm">
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.06}>
              <Link
                href={`/news/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                {post.cover_media_id && (
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={`/api/media/${post.cover_media_id}`}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : ""}
                  </p>
                  <h2 className="mb-2 font-heading text-lg font-semibold text-primary">
                    {post.title}
                  </h2>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                    Read more <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
