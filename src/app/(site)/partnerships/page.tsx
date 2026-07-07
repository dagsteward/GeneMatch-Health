import type { Metadata } from "next";
import { Award, Building2, FlaskConical, Hospital, Landmark, HeartHandshake, Rocket, ShieldCheck } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { DnaHelixBackground } from "@/components/DnaHelixBackground";
import { PartnershipForm } from "@/components/forms/PartnershipForm";
import { site } from "@/lib/site";
import { getContentMap } from "@/lib/content";
import { contentRegistry } from "@/lib/content-registry";

export const revalidate = 60;

function defaultsFor(prefix: string) {
  return Object.fromEntries(
    contentRegistry.filter((f) => f.key.startsWith(prefix)).map((f) => [f.key, f.default])
  );
}

export const metadata: Metadata = {
  title: "Partnerships",
  description: `Become a founding partner of ${site.name} — NHS, local authorities, universities, corporate and charity partners welcome.`,
  keywords: [
    "partner with GeneMatch Health",
    "NHS partnership opportunities",
    "university health research partnership UK",
    "corporate health CSR partnership",
    ...site.keywords,
  ],
  alternates: { canonical: "/partnerships" },
};

const benefitIcons = [Award, Rocket, FlaskConical, ShieldCheck];

const categories = [
  {
    icon: Hospital,
    title: "NHS",
    description: "Integrating screening protocols and preventive tools into primary care workflows.",
  },
  {
    icon: Landmark,
    title: "Local Authorities",
    description: "Addressing regional health disparities through localised data and community insight.",
  },
  {
    icon: Building2,
    title: "Corporate",
    description: "CSR initiatives focused on ethical AI, digital inclusion and preventive health.",
  },
  {
    icon: HeartHandshake,
    title: "Charities & Community Groups",
    description: "Empowering patient advocacy and community organisations with shared research and reach.",
  },
];

export default async function PartnershipsPage() {
  const content = await getContentMap(defaultsFor("partnerships."));
  const partnerBenefits = JSON.parse(content["partnerships.benefits"]) as {
    title: string;
    description: string;
  }[];

  return (
    <>
      <section className="relative overflow-hidden bg-brand py-24 text-center text-brand-foreground">
        <DnaHelixBackground opacity={0.15} />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <Reveal>
            <h1 className="mb-6 font-heading text-3xl font-semibold md:text-5xl">
              {content["partnerships.hero.heading"]}
            </h1>
            <p className="text-white/70">{content["partnerships.hero.subtext"]}</p>
          </Reveal>
        </div>
      </section>

      <Section className="bg-card">
        <Reveal>
          <h2 className="mb-4 font-heading text-2xl font-semibold text-primary md:text-3xl">
            Who We Want to Work With
          </h2>
          <p className="mb-12 max-w-2xl text-muted-foreground">
            {content["partnerships.categories.intro"]}
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => (
            <Reveal key={category.title} delay={i * 0.08}>
              <div className="rounded-xl border border-border p-8 transition-shadow hover:shadow-xl">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <category.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-heading font-semibold text-primary">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="why-partner" className="bg-muted/40">
        <Reveal>
          <Eyebrow>Why Partner With Us</Eyebrow>
          <h2 className="mb-4 font-heading text-2xl font-semibold text-primary md:text-3xl">
            Built for Genuine Collaboration
          </h2>
          <p className="mb-12 max-w-2xl text-muted-foreground">
            {site.name} is a registered Community Interest Company (No. {site.companyNumber}).
            Every partnership furthers our statutory, asset-locked community benefit objectives —
            here&apos;s what partnering with us looks like in practice.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {partnerBenefits.map((benefit, i) => {
            const Icon = benefitIcons[i % benefitIcons.length];
            return (
              <Reveal key={benefit.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-card p-8 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-heading font-semibold text-primary">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section id="partner-form" className="bg-card">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <Eyebrow>Become a Strategic Partner</Eyebrow>
              <h2 className="mb-4 font-heading text-2xl font-semibold text-primary md:text-3xl">
                Start the Conversation
              </h2>
              <p className="mb-6 text-muted-foreground">
                Tell us about your organisation and where you&apos;d like to collaborate. Our
                founder will personally respond to every inquiry while we build our founding
                team.
              </p>
              <p className="text-sm text-muted-foreground">
                Prefer email? Reach us directly at{" "}
                <a href={`mailto:${site.emails.partnerships}`} className="font-semibold text-secondary underline">
                  {site.emails.partnerships}
                </a>
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <PartnershipForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
