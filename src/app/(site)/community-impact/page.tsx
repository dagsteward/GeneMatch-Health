import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Users, GraduationCap, HeartHandshake } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { GlassCard } from "@/components/GlassCard";
import { site, targets } from "@/lib/site";
import { getContentMap } from "@/lib/content";
import { contentRegistry } from "@/lib/content-registry";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Community Impact",
  description: `${site.name}'s community impact goals and proposed pilot programme — honest, forward-looking targets, not fabricated results.`,
  keywords: [
    "GeneMatch Health community impact",
    "health inequality pilot programme UK",
    "Greater Manchester health pilot",
    "community health intelligence programme",
    ...site.keywords,
  ],
  alternates: { canonical: "/community-impact" },
};

const yearTargets = [targets.year1, targets.year3, targets.year5];

function defaultsFor(prefix: string) {
  return Object.fromEntries(
    contentRegistry.filter((f) => f.key.startsWith(prefix)).map((f) => [f.key, f.default])
  );
}

export default async function CommunityImpactPage() {
  const content = await getContentMap(defaultsFor("community-impact."));

  return (
    <>
      <Section className="bg-card" withHelix>
        <Reveal>
          <Eyebrow>Community Impact</Eyebrow>
          <h1 className="mb-6 font-heading text-3xl font-semibold text-primary md:text-5xl">
            Where We&apos;re Headed
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            {content["community-impact.hero.intro"]}
          </p>
        </Reveal>
      </Section>

      <Section className="bg-card pt-0">
        <Reveal>
          <Link
            href="/careers#volunteer-form"
            aria-label="Visit the Careers & Volunteering page to volunteer with us"
            className="group relative block overflow-hidden rounded-3xl shadow-xl"
          >
            <Image
              src={content["community-impact.hero.image"]}
              alt="GeneMatch Health CIC volunteers in matching t-shirts packing food donation boxes at a community outreach event"
              width={1717}
              height={916}
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              unoptimized
            />
          </Link>
        </Reveal>
      </Section>

      <Section className="bg-brand text-brand-foreground">
        <Reveal>
          <h2 className="mb-12 text-center font-heading text-2xl font-semibold md:text-3xl">
            Our Growth Targets
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {yearTargets.map((target, i) => (
            <Reveal key={target.label} delay={i * 0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <div className="mb-6 text-sm font-semibold uppercase tracking-wide text-white/60">
                  {target.label}
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <CountUp
                      value={target.users}
                      className="block font-heading text-4xl font-semibold"
                    />
                    <div className="mt-1 text-xs uppercase tracking-wide text-white/50">
                      Platform Users
                    </div>
                  </div>
                  <div className="flex justify-center gap-10">
                    <div>
                      <CountUp
                        value={target.workshops}
                        className="block font-heading text-2xl font-semibold"
                      />
                      <div className="mt-1 text-xs uppercase tracking-wide text-white/50">
                        Workshops
                      </div>
                    </div>
                    <div>
                      <CountUp
                        value={"beneficiaries" in target ? target.beneficiaries : target.indirectBeneficiaries}
                        className="block font-heading text-2xl font-semibold"
                      />
                      <div className="mt-1 text-xs uppercase tracking-wide text-white/50">
                        {"beneficiaries" in target ? "Beneficiaries" : "Indirect Beneficiaries"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <Reveal>
          <Eyebrow>Where We&apos;re Starting</Eyebrow>
          <h2 className="mb-4 font-heading text-2xl font-semibold text-primary md:text-3xl">
            {targets.pilot.name}
          </h2>
          <p className="mb-10 max-w-2xl text-muted-foreground">
            Rather than claim national coverage we don&apos;t have yet, our first proposed
            pilot is focused on one region.
          </p>
        </Reveal>
        <Reveal>
          <GlassCard className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <MapPin className="mb-3 h-6 w-6 text-secondary" aria-hidden="true" />
              <div className="font-heading text-lg font-semibold text-primary">
                {targets.pilot.location}
              </div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Location</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="mb-3 h-6 w-6 text-secondary" aria-hidden="true" />
              <div className="font-heading text-lg font-semibold text-primary">
                {targets.pilot.participants}
              </div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">
                Target Participants
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <GraduationCap className="mb-3 h-6 w-6 text-secondary" aria-hidden="true" />
              <div className="font-heading text-lg font-semibold text-primary">
                {targets.pilot.duration}
              </div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Duration</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <HeartHandshake className="mb-3 h-6 w-6 text-secondary" aria-hidden="true" />
              <div className="font-heading text-lg font-semibold text-secondary">
                {targets.pilot.status}
              </div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Status</div>
            </div>
          </GlassCard>
        </Reveal>
      </Section>

      <Section className="bg-muted/40">
        <Reveal>
          <h2 className="mb-4 font-heading text-2xl font-semibold text-primary md:text-3xl">
            How We&apos;ll Measure Impact
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            {content["community-impact.measure.intro"]}
          </p>
        </Reveal>
      </Section>

      <Section className="bg-card">
        <Reveal>
          <div className="text-center">
            <h2 className="mb-4 font-heading text-2xl font-semibold text-primary md:text-3xl">
              Want to help us hit these targets?
            </h2>
            <Link
              href="/partnerships"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
            >
              Become a Founding Partner <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
