import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { GlassCard } from "@/components/GlassCard";
import { clinicalCommitments, roadmap, site, targetPartners, targets } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research & Innovation",
  description: `${site.name}'s research strategy, clinical assurance commitments and academic partnership goals.`,
};

export default function ResearchPage() {
  return (
    <>
      <Section className="bg-card">
        <Reveal>
          <Eyebrow>Innovation Lab</Eyebrow>
          <h1 className="mb-6 font-heading text-3xl font-semibold text-primary md:text-5xl">
            Advancing Digital Public Health
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            We&apos;re building the research foundations to bridge genomic and health science
            with frontline, community-led care — through ethical, evidence-led digital
            innovation.
          </p>
        </Reveal>
      </Section>

      <Section className="bg-brand text-brand-foreground">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {clinicalCommitments.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div>
                <h3 className="mb-3 font-heading text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-white/70">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <Reveal>
          <Eyebrow>Academic Ecosystem</Eyebrow>
          <h2 className="mb-4 font-heading text-2xl font-semibold text-primary md:text-3xl">
            Universities We&apos;re Building Relationships With
          </h2>
          <p className="mb-12 max-w-2xl text-muted-foreground">
            These are institutions we&apos;re actively reaching out to as research and pilot
            partners — not yet confirmed collaborations.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {targetPartners.universities.map((uni, i) => (
            <Reveal key={uni} delay={i * 0.05}>
              <div className="rounded-xl border border-border bg-muted/30 px-6 py-5 font-heading font-medium text-primary">
                {uni}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/40">
        <Reveal>
          <Eyebrow>Proposed Pilot</Eyebrow>
          <h2 className="mb-8 font-heading text-2xl font-semibold text-primary md:text-3xl">
            {targets.pilot.name}
          </h2>
        </Reveal>
        <Reveal>
          <GlassCard className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Location
              </div>
              <div className="font-heading text-lg font-semibold text-primary">
                {targets.pilot.location}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Duration
              </div>
              <div className="font-heading text-lg font-semibold text-primary">
                {targets.pilot.duration}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Target Participants
              </div>
              <div className="font-heading text-lg font-semibold text-primary">
                {targets.pilot.participants}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Status
              </div>
              <div className="font-heading text-lg font-semibold text-secondary">
                {targets.pilot.status}
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </Section>

      <Section className="bg-card">
        <Reveal>
          <h2 className="mb-4 font-heading text-2xl font-semibold text-primary md:text-3xl">
            Our Three-Year Roadmap
          </h2>
        </Reveal>
        <div className="relative space-y-8 border-l-2 border-border pl-8">
          {roadmap.map((step, i) => (
            <Reveal key={step.phase} delay={i * 0.1}>
              <div className="relative">
                <span
                  className={`absolute -left-[2.55rem] top-1 h-4 w-4 rounded-full border-2 border-white ${
                    step.status === "In progress" ? "bg-secondary" : "bg-border"
                  }`}
                  aria-hidden="true"
                />
                <div className="mb-1 flex items-center gap-3">
                  <h3 className="font-heading text-lg font-semibold text-primary">
                    {step.phase}
                  </h3>
                  <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                    {step.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-brand text-brand-foreground">
        <Reveal>
          <div className="text-center">
            <h2 className="mb-4 font-heading text-2xl font-semibold md:text-3xl">
              Working in research or health innovation?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-white/70">
              We&apos;d like to hear from universities, NHS bodies and research groups
              interested in shaping our first studies and pilots.
            </p>
            <Link
              href="/partnerships"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-brand transition-transform active:scale-95"
            >
              Start a Conversation <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
