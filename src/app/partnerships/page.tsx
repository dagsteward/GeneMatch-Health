import type { Metadata } from "next";
import { Building2, Hospital, Landmark, HeartHandshake } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { PartnershipForm } from "@/components/forms/PartnershipForm";
import { fundingTiers, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partnerships",
  description: `Become a founding partner of ${site.name} — NHS, local authorities, universities, corporate and charity partners welcome.`,
};

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

export default function PartnershipsPage() {
  return (
    <>
      <section className="bg-primary py-24 text-center text-primary-foreground">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h1 className="mb-6 font-heading text-3xl font-semibold md:text-5xl">
              Collective Action for Community Wellbeing
            </h1>
            <p className="text-white/70">
              Bridging health research and equitable public health outcomes through strategic
              partnerships — from our very first day as a CIC.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="bg-white">
        <Reveal>
          <h2 className="mb-4 font-heading text-2xl font-semibold text-primary md:text-3xl">
            Who We Want to Work With
          </h2>
          <p className="mb-12 max-w-2xl text-muted-foreground">
            We&apos;re a newly founded CIC actively building these relationships — this reflects
            who we&apos;re reaching out to, not partnerships already in place.
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

      <Section id="funding" className="bg-muted/40">
        <Reveal>
          <Eyebrow>Funding Ask</Eyebrow>
          <h2 className="mb-4 font-heading text-2xl font-semibold text-primary md:text-3xl">
            Empowering Public Health Innovation
          </h2>
          <p className="mb-12 max-w-2xl text-muted-foreground">
            As a Community Interest Company, every donation and grant is reinvested into our
            community benefit objectives under our statutory asset lock.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {fundingTiers.map((tier, i) => (
            <Reveal key={tier.stage} delay={i * 0.08}>
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-secondary">
                  {tier.stage}
                </div>
                <div className="mb-4 font-heading text-3xl font-semibold text-primary">
                  {tier.amount}
                </div>
                <p className="text-sm text-muted-foreground">{tier.use}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="partner-form" className="bg-white">
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
