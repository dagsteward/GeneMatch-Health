import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, HeartHandshake, ShieldCheck } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { DnaHelixBackground } from "@/components/DnaHelixBackground";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { programmes, site, targets, targetPartners } from "@/lib/site";

const missionPillars = [
  {
    icon: ShieldCheck,
    title: "Responsible AI",
    description:
      "Transparent, ethically-governed AI tools designed to support — never replace — professional medical advice.",
  },
  {
    icon: BookOpenCheck,
    title: "Health Literacy for All",
    description:
      "Making health knowledge understandable and accessible, especially for communities facing health inequalities.",
  },
  {
    icon: HeartHandshake,
    title: "Community-Led Research",
    description:
      "Building research and delivery partnerships with universities, the NHS and community organisations from day one.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-background">
        <DnaHelixBackground opacity={0.2} />
        <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-6 py-20 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Community Interest Company</Eyebrow>
            <h1 className="mb-6 max-w-3xl font-heading text-4xl font-semibold leading-tight text-primary md:text-6xl">
              {site.tagline}
            </h1>
            <p className="mb-10 max-w-2xl text-lg text-muted-foreground">{site.mission}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/programmes"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg transition-transform active:scale-95"
              >
                Explore Our Programmes <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/partnerships"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary px-8 py-4 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                Partner With Us
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/images/family-hero.png"
                  alt="A multiracial family smiling together"
                  fill
                  sizes="(min-width: 1024px) 35vw, 90vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section className="bg-card">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Our Mission</Eyebrow>
            <h2 className="mb-12 font-heading text-2xl font-semibold text-primary md:text-3xl">
              Health Literacy through AI, Research &amp; Partnerships
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {missionPillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <pillar.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="mb-4 font-heading text-lg font-semibold text-primary">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <h2 className="mb-12 font-heading text-2xl font-semibold text-primary md:text-3xl">
            Core Programmes
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {programmes.map((programme, i) => (
            <Reveal key={programme.slug} delay={i * 0.08}>
              <ProgrammeCard programme={programme} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-brand text-brand-foreground">
        <Reveal>
          <div className="mb-12 text-center">
            <Eyebrow className="bg-white/10 text-white">Our Founding Goals</Eyebrow>
            <h2 className="font-heading text-2xl font-semibold md:text-3xl">
              Where we&apos;re headed — not where we&apos;ve been
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70">
              GeneMatch Health CIC was founded in 2026. These are the targets guiding our
              roadmap, not results we&apos;ve already achieved.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-4">
          <div>
            <CountUp
              value={targets.year1.users}
              className="mb-2 block font-heading text-4xl font-semibold md:text-5xl"
            />
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
              {targets.year1.label}: Platform Users
            </div>
          </div>
          <div>
            <CountUp
              value={targets.year1.workshops}
              className="mb-2 block font-heading text-4xl font-semibold md:text-5xl"
            />
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
              {targets.year1.label}: Workshops
            </div>
          </div>
          <div>
            <CountUp
              value={targets.year1.beneficiaries}
              className="mb-2 block font-heading text-4xl font-semibold md:text-5xl"
            />
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
              {targets.year1.label}: Beneficiaries
            </div>
          </div>
          <div>
            <CountUp
              value={targets.year5.users}
              className="mb-2 block font-heading text-4xl font-semibold md:text-5xl"
            />
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
              {targets.year5.label}: Platform Users
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-card">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Who We&apos;re Building With</Eyebrow>
            <h2 className="mb-4 font-heading text-2xl font-semibold text-primary md:text-3xl">
              Founding partnerships, not a finished network
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-sm text-muted-foreground">
              As a newly formed CIC, we&apos;re actively building relationships across the
              health, research and innovation sectors below — we don&apos;t yet have signed
              partnerships to announce.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-border p-8">
              <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-secondary">
                Target Sectors
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {targetPartners.sectors.map((sector) => (
                  <li key={sector}>{sector}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border p-8">
              <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-secondary">
                Target Academic Partners
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {targetPartners.universities.map((uni) => (
                  <li key={uni}>{uni}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="mt-12 text-center">
            <Link
              href="/partnerships"
              className="inline-flex items-center gap-2 rounded-xl bg-secondary px-8 py-4 text-sm font-semibold text-secondary-foreground transition-transform active:scale-95"
            >
              Become a Founding Partner <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
