import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources",
  description: `Research publications and health literacy resources from ${site.name} — coming as our research programme produces them.`,
};

export default function ResourcesPage() {
  return (
    <Section className="bg-card" withHelix>
      <Reveal>
        <Eyebrow>Resources</Eyebrow>
        <h1 className="mb-6 font-heading text-3xl font-semibold text-primary md:text-5xl">
          Resource Library
        </h1>
      </Reveal>
      <Reveal>
        <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
          <BookOpen className="mx-auto mb-4 h-8 w-8 text-secondary" aria-hidden="true" />
          <h2 className="mb-2 font-heading text-lg font-semibold text-primary">
            Building our first resources
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            We don&apos;t have publications, workshop materials or downloadable guides ready
            to share yet. Rather than list placeholder documents, we&apos;ll populate this
            library as our GeneMatch Education™ and research programmes produce real,
            citable content.
          </p>
          <Link
            href="/research"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
          >
            See Our Research Strategy <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
