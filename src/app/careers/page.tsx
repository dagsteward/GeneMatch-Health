import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers & Volunteering",
  description: `Join ${site.name} as a founding volunteer or be first to hear about roles as we grow.`,
};

const volunteerAreas = [
  {
    title: "Community Outreach",
    description: "Help us connect with community groups, faith organisations and health fairs.",
  },
  {
    title: "Health Education",
    description: "Support the design and delivery of our first GeneMatch Education™ workshops.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Section className="bg-card">
        <Reveal>
          <Eyebrow>Join the Mission</Eyebrow>
          <h1 className="mb-6 font-heading text-3xl font-semibold text-primary md:text-5xl">
            Careers &amp; Volunteering
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            {site.name} is a newly founded organisation — we don&apos;t have paid roles open
            yet, but we&apos;re building a founding community of volunteers who want to shape
            what comes next. Register your interest and we&apos;ll be in touch as opportunities
            open up.
          </p>
        </Reveal>
      </Section>

      <Section className="bg-muted/40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            {volunteerAreas.map((area, i) => (
              <Reveal key={area.title} delay={i * 0.08}>
                <div className="rounded-2xl bg-card p-6 shadow-sm">
                  <h3 className="mb-2 font-heading font-semibold text-primary">{area.title}</h3>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <p className="text-sm text-muted-foreground">
                Prefer email?{" "}
                <a href={`mailto:${site.emails.careers}`} className="font-semibold text-secondary underline">
                  {site.emails.careers}
                </a>
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <VolunteerForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
