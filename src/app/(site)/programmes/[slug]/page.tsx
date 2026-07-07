import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, GraduationCap, HeartPulse, Sparkles, UsersRound } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { GlassCard } from "@/components/GlassCard";
import { programmes } from "@/lib/site";
import { getContentMap } from "@/lib/content";
import { contentRegistry } from "@/lib/content-registry";

const icons = {
  sparkles: Sparkles,
  "heart-pulse": HeartPulse,
  "users-round": UsersRound,
  "graduation-cap": GraduationCap,
} as const;

export const revalidate = 60;

export function generateStaticParams() {
  return programmes.map((programme) => ({ slug: programme.slug }));
}

function defaultsFor(prefix: string) {
  return Object.fromEntries(
    contentRegistry.filter((f) => f.key.startsWith(prefix)).map((f) => [f.key, f.default])
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  if (!programme) return {};
  return {
    title: programme.name,
    description: programme.shortDescription,
  };
}

export default async function ProgrammeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  if (!programme) notFound();

  const Icon = icons[programme.icon];
  const content = await getContentMap(defaultsFor(`programme.${slug}.`));
  const summary = content[`programme.${slug}.summary`];
  const features = JSON.parse(content[`programme.${slug}.features`]) as {
    title: string;
    description: string;
  }[];
  const faqs = JSON.parse(content[`programme.${slug}.faqs`]) as {
    question: string;
    answer: string;
  }[];
  const imageSrc = programme.image ? content[`programme.${slug}.image`] : undefined;

  return (
    <>
      <Section className="bg-card" withHelix>
        <div className={programme.image ? "grid grid-cols-1 items-center gap-10 lg:grid-cols-2" : ""}>
          <Reveal>
            <Eyebrow>{programme.platformUrl ? "Flagship Programme · Live" : "Flagship Programme"}</Eyebrow>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h1 className="font-heading text-3xl font-semibold text-primary md:text-5xl">
                {programme.name}
              </h1>
            </div>
            <p className="mb-8 max-w-3xl text-lg text-muted-foreground">{summary}</p>
            {programme.platformUrl && (
              <a
                href={programme.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-secondary px-8 py-4 text-sm font-semibold text-secondary-foreground shadow-lg transition-transform active:scale-95"
              >
                Launch GeneMatch AI <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </Reveal>
          {programme.image && imageSrc && (
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src={imageSrc}
                  alt={programme.image.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </Reveal>
          )}
        </div>
      </Section>

      <Section className="bg-muted/40">
        <Reveal>
          <h2 className="mb-12 font-heading text-2xl font-semibold text-primary md:text-3xl">
            What We&apos;re Building
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.08}>
              <GlassCard className="h-full">
                <h3 className="mb-3 font-heading text-lg font-semibold text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <Reveal>
          <h2 className="mb-8 text-center font-heading text-2xl font-semibold text-primary md:text-3xl">
            Frequently Asked Questions
          </h2>
        </Reveal>
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <Accordion defaultValue={["faq-0"]}>
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-heading text-base font-semibold text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-brand text-brand-foreground">
        <Reveal>
          <div className="text-center">
            <h2 className="mb-4 font-heading text-2xl font-semibold md:text-3xl">
              Want to help shape {programme.name}?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-white/70">
              We&apos;re building this programme with clinical, academic and community
              partners from the ground up.
            </p>
            <Link
              href="/partnerships"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-brand transition-transform active:scale-95"
            >
              Become a Partner <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
