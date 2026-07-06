import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { programmes, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Programmes",
  description: `The four founding programmes of ${site.name}: GeneMatch AI™, Fertility™, Family Health™ and Education™.`,
};

export default function ProgrammesPage() {
  return (
    <>
      <Section className="bg-card">
        <Reveal>
          <Eyebrow>Our Programmes</Eyebrow>
          <h1 className="mb-6 font-heading text-3xl font-semibold text-primary md:text-5xl">
            Four Flagship Programmes
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            {site.name} operates four specialised programmes under a unified brand — each
            addressing a different part of the gap between health knowledge and everyday
            decisions.
          </p>
        </Reveal>
      </Section>

      <Section className="bg-muted/40">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {programmes.map((programme, i) => (
            <Reveal key={programme.slug} delay={i * 0.08}>
              <ProgrammeCard programme={programme} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
