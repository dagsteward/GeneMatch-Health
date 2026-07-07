import { site, founder, values, programmes, targetPartners, clinicalCommitments, roadmap, partnerBenefits, fundingAvenues, revenueModel } from "@/lib/site";

export type FieldType = "text" | "richtext" | "image" | "json";

export type RegistryField = {
  key: string;
  label: string;
  page: string;
  type: FieldType;
  default: string;
};

function json(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

export const contentRegistry: RegistryField[] = [
  // --- Home ---
  { key: "home.hero.eyebrow", label: "Hero eyebrow badge", page: "Home", type: "text", default: "Community Interest Company" },
  { key: "home.hero.tagline", label: "Hero headline", page: "Home", type: "text", default: site.tagline },
  { key: "home.hero.mission", label: "Hero subtext", page: "Home", type: "text", default: site.mission },
  { key: "home.hero.image", label: "Hero family photo", page: "Home", type: "image", default: "/images/family-hero.png" },
  { key: "home.mission.heading", label: "Mission section heading", page: "Home", type: "text", default: "Health Literacy through AI, Research & Partnerships" },
  { key: "home.mission.pillars", label: "Mission pillars (3 cards)", page: "Home", type: "json", default: json([
    { title: "Responsible AI", description: "Transparent, ethically-governed AI tools designed to support — never replace — professional medical advice." },
    { title: "Health Literacy for All", description: "Making health knowledge understandable and accessible, especially for communities facing health inequalities." },
    { title: "Community-Led Research", description: "Building research and delivery partnerships with universities, the NHS and community organisations from day one." },
  ]) },
  { key: "home.impact.heading", label: "Founding goals heading", page: "Home", type: "text", default: "Where we're headed — not where we've been" },
  { key: "home.impact.subtext", label: "Founding goals subtext", page: "Home", type: "text", default: "GeneMatch Health CIC was founded in 2026. These are the targets guiding our roadmap, not results we've already achieved." },
  { key: "home.partners.heading", label: "Partners section heading", page: "Home", type: "text", default: "Founding partnerships, not a finished network" },
  { key: "home.partners.subtext", label: "Partners section subtext", page: "Home", type: "text", default: "As a newly formed CIC, we're actively building relationships across the health, research and innovation sectors below — we don't yet have signed partnerships to announce." },

  // --- About ---
  { key: "about.hero.intro", label: "Hero intro paragraph", page: "About", type: "richtext", default: `${site.name} is a ${site.legalForm.toLowerCase()}, founded in ${site.founded} to bring AI-powered health education, preventive healthcare and community engagement to individuals and families across the UK.` },
  { key: "about.hero.image", label: "Hero photo", page: "About", type: "image", default: "/images/family-wellbeing.jpg" },
  { key: "about.vision", label: "Vision statement", page: "About", type: "richtext", default: site.vision },
  { key: "about.mission", label: "Mission statement", page: "About", type: "richtext", default: site.mission },
  { key: "about.values", label: "Core values (list)", page: "About", type: "json", default: json(values) },
  { key: "about.founder.bio", label: "Founder bio", page: "About", type: "richtext", default: founder.bio },
  { key: "about.governance.assetLock", label: "Governance — asset lock note", page: "About", type: "richtext", default: `${site.name} operates under the statutory Community Interest Company asset lock — assets and surplus are used to advance our community benefit objectives, not distributed as private profit.` },
  { key: "about.governance.board", label: "Governance — board note", page: "About", type: "richtext", default: "Our board is currently being formed. We plan to appoint Non-Executive Directors, and Medical, Research and Community Advisory representatives as we grow — we'll publish names here once appointments are confirmed." },

  // --- Programmes overview ---
  { key: "programmes.overview.intro", label: "Overview intro", page: "Programmes", type: "richtext", default: `${site.name} operates four specialised programmes under a unified brand — each addressing a different part of the gap between health knowledge and everyday decisions.` },

  // --- Programme detail pages (one set per programme) ---
  ...programmes.flatMap((p) => [
    { key: `programme.${p.slug}.summary`, label: `${p.name} — summary`, page: `Programme: ${p.name}`, type: "richtext" as const, default: p.summary },
    { key: `programme.${p.slug}.features`, label: `${p.name} — feature cards`, page: `Programme: ${p.name}`, type: "json" as const, default: json(p.features) },
    { key: `programme.${p.slug}.faqs`, label: `${p.name} — FAQs`, page: `Programme: ${p.name}`, type: "json" as const, default: json(p.faqs) },
    ...(p.image
      ? [{ key: `programme.${p.slug}.image`, label: `${p.name} — hero photo`, page: `Programme: ${p.name}`, type: "image" as const, default: p.image.src }]
      : []),
  ]),

  // --- Research ---
  { key: "research.hero.intro", label: "Hero intro", page: "Research", type: "richtext", default: "We're building the research foundations to bridge genomic and health science with frontline, community-led care — through ethical, evidence-led digital innovation." },
  { key: "research.hero.image", label: "Hero photo", page: "Research", type: "image", default: "/images/research-lab.jpg" },
  { key: "research.clinicalCommitments", label: "Clinical assurance commitments", page: "Research", type: "json", default: json(clinicalCommitments) },
  { key: "research.universities.intro", label: "Universities section intro", page: "Research", type: "richtext", default: "These are institutions we're actively reaching out to as research and pilot partners — not yet confirmed collaborations." },
  { key: "research.universities.list", label: "Target universities", page: "Research", type: "json", default: json(targetPartners.universities) },
  { key: "research.roadmap", label: "Three-year roadmap", page: "Research", type: "json", default: json(roadmap) },

  // --- Partnerships ---
  { key: "partnerships.hero.heading", label: "Hero heading", page: "Partnerships", type: "text", default: "Collective Action for Community Wellbeing" },
  { key: "partnerships.hero.subtext", label: "Hero subtext", page: "Partnerships", type: "text", default: "Bridging health research and equitable public health outcomes through strategic partnerships — from our very first day as a CIC." },
  { key: "partnerships.categories.intro", label: "Categories section intro", page: "Partnerships", type: "richtext", default: "We're a newly founded CIC actively building these relationships — this reflects who we're reaching out to, not partnerships already in place." },
  { key: "partnerships.benefits", label: "Why partner with us (benefits)", page: "Partnerships", type: "json", default: json(partnerBenefits) },

  // --- Funding ---
  { key: "funding.hero.intro", label: "Hero intro", page: "Funding", type: "richtext", default: `${site.name} is a registered, asset-locked Community Interest Company (No. ${site.companyNumber}) — every pound raised is reinvested in our community benefit objectives, never distributed as private profit.` },
  { key: "funding.avenues", label: "Ways to support us", page: "Funding", type: "json", default: json(fundingAvenues) },
  { key: "funding.revenueModel", label: "How we sustain our work", page: "Funding", type: "json", default: json(revenueModel) },

  // --- Community Impact ---
  { key: "community-impact.hero.intro", label: "Hero intro", page: "Community Impact", type: "richtext", default: `${site.name} was founded in ${site.founded}. We don't have a track record to report yet — what follows are the honest, forward-looking targets guiding our roadmap, not results we've already achieved.` },
  { key: "community-impact.hero.image", label: "Volunteers banner photo", page: "Community Impact", type: "image", default: "/images/volunteers-impact.png" },
  { key: "community-impact.measure.intro", label: "\"How we'll measure impact\" text", page: "Community Impact", type: "richtext", default: "As GeneMatch AI™ and our other programmes reach real people, we'll report genuine figures here — platform users, workshops delivered, community beneficiaries, partnerships established and research outputs." },

  // --- Careers ---
  { key: "careers.hero.intro", label: "Hero intro", page: "Careers", type: "richtext", default: `${site.name} is a newly founded organisation — we don't have paid roles open yet, but we're building a founding community of volunteers who want to shape what comes next. Register your interest and we'll be in touch as opportunities open up.` },
  { key: "careers.hero.image", label: "Volunteers banner photo", page: "Careers", type: "image", default: "/images/volunteers-impact.png" },
  { key: "careers.volunteerAreas", label: "Volunteer areas", page: "Careers", type: "json", default: json([
    { title: "Community Outreach", description: "Help us connect with community groups, faith organisations and health fairs." },
    { title: "Health Education", description: "Support the design and delivery of our first GeneMatch Education™ workshops." },
  ]) },

  // --- Contact ---
  { key: "contact.hero.intro", label: "Hero intro", page: "Contact", type: "richtext", default: "Whether you're a healthcare organisation, researcher, funder or simply curious about what we're building — we'd love to hear from you." },
];

export function getRegistryField(key: string): RegistryField | undefined {
  return contentRegistry.find((f) => f.key === key);
}

export function getRegistryPages(): string[] {
  return Array.from(new Set(contentRegistry.map((f) => f.page)));
}

export function getRegistryFieldsForPage(page: string): RegistryField[] {
  return contentRegistry.filter((f) => f.page === page);
}
