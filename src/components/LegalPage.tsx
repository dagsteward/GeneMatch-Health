import { Section } from "@/components/Section";

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
    <Section className="bg-card">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 font-heading text-3xl font-semibold text-primary md:text-4xl">
          {title}
        </h1>
        <p className="mb-10 text-sm text-muted-foreground">Last updated: {updated}</p>
        <div className="prose prose-neutral max-w-none prose-headings:font-heading prose-headings:text-primary prose-a:text-secondary">
          {children}
        </div>
      </div>
    </Section>
  );
}
