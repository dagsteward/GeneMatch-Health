import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/lib/site";
import { getContent } from "@/lib/content";
import { getRegistryField } from "@/lib/content-registry";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

const departments = [
  { label: "General Enquiries", email: site.emails.info },
  { label: "Partnerships", email: site.emails.partnerships },
  { label: "Grants & Funding", email: site.emails.grants },
  { label: "Careers & Volunteering", email: site.emails.careers },
];

export default async function ContactPage() {
  const introField = getRegistryField("contact.hero.intro")!;
  const intro = await getContent(introField.key, introField.default);

  return (
    <Section className="bg-card">
      <Reveal>
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mb-6 font-heading text-3xl font-semibold text-primary md:text-5xl">
          Get in Touch
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-muted-foreground">{intro}</p>
      </Reveal>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {departments.map((dept) => (
                <div key={dept.email} className="rounded-xl border border-border p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-secondary">
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    {dept.label}
                  </div>
                  <a href={`mailto:${dept.email}`} className="text-sm font-medium text-primary hover:underline">
                    {dept.email}
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
