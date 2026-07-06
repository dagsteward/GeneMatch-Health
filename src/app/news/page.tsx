import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "News",
  description: `News and updates from ${site.name} — coming soon as our programmes launch.`,
};

export default function NewsPage() {
  return (
    <Section className="bg-card">
      <Reveal>
        <Eyebrow>News</Eyebrow>
        <h1 className="mb-6 font-heading text-3xl font-semibold text-primary md:text-5xl">
          News & Updates
        </h1>
      </Reveal>
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
    </Section>
  );
}
