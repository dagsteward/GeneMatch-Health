import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { site } from "@/lib/site";
import { getContentMap } from "@/lib/content";
import { contentRegistry } from "@/lib/content-registry";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Careers & Volunteering",
  description: `Join ${site.name} as a founding volunteer or be first to hear about roles as we grow.`,
  keywords: [
    "GeneMatch Health careers",
    "health CIC volunteering UK",
    "community interest company jobs",
    "health charity volunteer opportunities",
    ...site.keywords,
  ],
  alternates: { canonical: "/careers" },
};

function defaultsFor(prefix: string) {
  return Object.fromEntries(
    contentRegistry.filter((f) => f.key.startsWith(prefix)).map((f) => [f.key, f.default])
  );
}

export default async function CareersPage() {
  const content = await getContentMap(defaultsFor("careers."));
  const volunteerAreas = JSON.parse(content["careers.volunteerAreas"]) as {
    title: string;
    description: string;
  }[];

  return (
    <>
      <Section className="bg-card" withHelix>
        <Reveal>
          <Eyebrow>Join the Mission</Eyebrow>
          <h1 className="mb-6 font-heading text-3xl font-semibold text-primary md:text-5xl">
            Careers &amp; Volunteering
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            {content["careers.hero.intro"]}
          </p>
        </Reveal>
      </Section>

      <Section className="bg-card pt-0">
        <Reveal>
          <Link
            href="#volunteer-form"
            aria-label="Jump to the volunteer sign-up form"
            className="group relative block overflow-hidden rounded-3xl shadow-xl"
          >
            <Image
              src={content["careers.hero.image"]}
              alt="GeneMatch Health CIC volunteers in matching t-shirts packing food donation boxes at a community outreach event"
              width={1717}
              height={916}
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              unoptimized
            />
          </Link>
        </Reveal>
      </Section>

      <Section id="volunteer-form" className="bg-muted/40">
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
