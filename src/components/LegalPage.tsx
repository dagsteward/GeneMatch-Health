import { Section } from "@/components/Section";
import { site } from "@/lib/site";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <Section className="bg-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 font-heading text-3xl font-semibold text-primary md:text-4xl">
          {title}
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">Last updated: {updated}</p>
        <div className="mb-10 rounded-xl border border-secondary/30 bg-secondary/5 p-4 text-sm text-muted-foreground">
          This is a draft policy prepared for {site.name} ahead of launch. It has not yet been
          reviewed by a solicitor and should be checked before the site goes live.
        </div>
        <div className="prose prose-neutral max-w-none prose-headings:font-heading prose-headings:text-primary prose-a:text-secondary">
          {children}
        </div>
      </div>
    </Section>
  );
}
