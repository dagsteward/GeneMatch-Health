import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { GlassCard } from "@/components/GlassCard";
import { fundingAvenues, revenueModel, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Funding & Support",
  description: `How organisations can fund and support ${site.name} — corporate partnerships, research grants, sponsorship and volunteering.`,
};

export default function FundingPage() {
  return (
    <>
      <Section className="bg-card">
        <Reveal>
          <Eyebrow>Funding & Support</Eyebrow>
          <h1 className="mb-6 font-heading text-3xl font-semibold text-primary md:text-5xl">
            Help Us Build Public Health Innovation
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            {site.name} is a registered, asset-locked Community Interest Company (No.{" "}
            {site.companyNumber}) — every pound raised is reinvested in our community benefit
            objectives, never distributed as private profit.
          </p>
        </Reveal>
      </Section>

      <Section className="bg-muted/40">
        <Reveal>
          <h2 className="mb-12 font-heading text-2xl font-semibold text-primary md:text-3xl">
            Ways to Support Us
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {fundingAvenues.map((avenue, i) => (
            <Reveal key={avenue.title} delay={i * 0.08}>
              <GlassCard className="h-full">
                <h3 className="mb-3 font-heading text-lg font-semibold text-primary">
                  {avenue.title}
                </h3>
                <p className="text-sm text-muted-foreground">{avenue.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <Reveal>
          <h2 className="mb-4 font-heading text-2xl font-semibold text-primary md:text-3xl">
            How We Sustain Our Work
          </h2>
          <p className="mb-12 max-w-2xl text-muted-foreground">
            Alongside grants and sponsorship, we&apos;re building a mix of revenue streams so
            {` ${site.name} `}can grow sustainably as a social enterprise.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {revenueModel.map((item, i) => (
            <Reveal key={item.stream} delay={i * 0.05}>
              <div className="rounded-xl border border-border p-6">
                <h3 className="mb-2 font-heading font-semibold text-primary">{item.stream}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-brand text-brand-foreground">
        <Reveal>
          <div className="text-center">
            <h2 className="mb-4 font-heading text-2xl font-semibold md:text-3xl">
              Ready to support our mission?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-white/70">
              Reach our grants and funding team directly, or start a conversation through our
              partnerships form.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/partnerships#partner-form"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-brand transition-transform active:scale-95"
              >
                Start the Conversation <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={`mailto:${site.emails.grants}`}
                className="text-sm font-semibold text-white underline"
              >
                {site.emails.grants}
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
