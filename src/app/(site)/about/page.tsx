import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { GlassCard } from "@/components/GlassCard";
import { founder, site } from "@/lib/site";
import { getContentMap } from "@/lib/content";
import { contentRegistry } from "@/lib/content-registry";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Us",
  description: `${site.mission} Learn about ${site.name}'s mission, vision, values and founding team.`,
};

function defaultsFor(prefix: string) {
  return Object.fromEntries(
    contentRegistry.filter((f) => f.key.startsWith(prefix)).map((f) => [f.key, f.default])
  );
}

export default async function AboutPage() {
  const content = await getContentMap(defaultsFor("about."));
  const values = JSON.parse(content["about.values"]) as { name: string; description: string }[];

  return (
    <>
      <Section className="bg-card">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>About Us</Eyebrow>
            <h1 className="mb-6 font-heading text-3xl font-semibold text-primary md:text-5xl">
              {site.name}
            </h1>
            <p className="max-w-3xl text-lg text-muted-foreground">{content["about.hero.intro"]}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={content["about.hero.image"]}
                alt="A family enjoying time together outdoors"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                unoptimized
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-muted/40">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Reveal>
            <GlassCard>
              <h2 className="mb-4 font-heading text-xl font-semibold text-primary">Our Vision</h2>
              <p className="text-muted-foreground">{content["about.vision"]}</p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard>
              <h2 className="mb-4 font-heading text-xl font-semibold text-primary">
                Our Mission
              </h2>
              <p className="text-muted-foreground">{content["about.mission"]}</p>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-card">
        <Reveal>
          <h2 className="mb-12 text-center font-heading text-2xl font-semibold text-primary md:text-3xl">
            Our Core Values
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((value, i) => (
            <Reveal key={value.name} delay={i * 0.05}>
              <div className="rounded-2xl border border-border p-6 text-center">
                <h3 className="mb-2 font-heading font-semibold text-primary">{value.name}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <Eyebrow>Founding Team</Eyebrow>
              <h2 className="mb-4 font-heading text-2xl font-semibold text-primary">
                {founder.name}
              </h2>
              <p className="mb-2 text-sm font-semibold text-secondary">
                {founder.role} · {founder.credentials}
              </p>
              <p className="text-muted-foreground">{content["about.founder.bio"]}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <Eyebrow>Governance</Eyebrow>
              <h2 className="mb-4 font-heading text-2xl font-semibold text-primary">
                A CIC Built for Public Benefit
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                  <span>{content["about.governance.assetLock"]}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                  <span>{site.registrationStatus}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                  <span>{content["about.governance.board"]}</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
