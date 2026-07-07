// Single source of truth for GeneMatch Health CIC's real content.
// Sourced from the CIC's Business Plan, Full Detailed Plan, 3 Flagship Programmes
// funding pack, Organisational Manual, Articles of Association and Form CIC36.
// All forward-looking figures are targets/goals, not achieved results — the CIC
// was only formed in June 2026 and has no historical track record yet.

export const site = {
  name: "GeneMatch Health CIC",
  shortName: "GeneMatch",
  tagline: "Empowering Healthier Families Through Intelligent Matching",
  vision:
    "To create healthier generations by making health knowledge, preventive care, and intelligent health insights accessible to everyone.",
  mission:
    "To improve health and wellbeing through innovative technology, education, research, and community engagement that empowers individuals and families to make informed health decisions.",
  legalForm: "Community Interest Company Limited by Guarantee",
  founded: "2026",
  companyNumber: "17297892",
  incorporatedDate: "24 June 2026",
  registrationStatus:
    "GeneMatch Health CIC is registered with Companies House as a Community Interest Company (Company No. 17297892), incorporated on 24 June 2026.",
  domain: "genematchhealth.org",
  aiPlatformUrl: "https://gene-match.vercel.app",
  emails: {
    info: "info@genematchhealth.org",
    partnerships: "partnerships@genematchhealth.org",
    grants: "grants@genematchhealth.org",
    careers: "careers@genematchhealth.org",
  },
  keywords: [
    "GeneMatch Health",
    "GeneMatch Health CIC",
    "community interest company health",
    "genomic health literacy",
    "preventive health technology",
    "family health history tool",
    "health risk awareness AI",
    "fertility education UK",
    "health equity community interest company",
    "NHS health innovation partnership",
    "AI health education platform",
  ],
} as const;

export const founder = {
  name: "David Agyemang",
  role: "Founder & Managing Director",
  credentials: "MBA, LL.M",
  bio: "David founded GeneMatch Health CIC to close the gap between complex health and genomic data and the everyday decisions families make. He leads strategy, governance, partnerships and fundraising as the organisation builds its founding team.",
};

export const values = [
  {
    name: "Innovation",
    description: "Using technology responsibly to solve health challenges.",
  },
  {
    name: "Community Impact",
    description: "Creating measurable social value and improving lives.",
  },
  {
    name: "Accessibility",
    description: "Making health information understandable and available to all.",
  },
  {
    name: "Integrity",
    description: "Operating ethically, transparently, and responsibly.",
  },
  {
    name: "Inclusion",
    description: "Serving diverse communities and reducing health inequalities.",
  },
];

export type Programme = {
  slug: string;
  name: string;
  shortDescription: string;
  icon: "sparkles" | "heart-pulse" | "users-round" | "graduation-cap";
  summary: string;
  platformUrl?: string;
  image?: { src: string; alt: string };
  features: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
};

export const programmes: Programme[] = [
  {
    slug: "ai",
    name: "GeneMatch AI™",
    shortDescription:
      "Our live AI-powered health support platform for risk awareness, compatibility insights and preventive recommendations.",
    icon: "sparkles",
    platformUrl: site.aiPlatformUrl,
    image: {
      src: "/images/health-fitness.jpg",
      alt: "A person out running while tracking their health data on a wearable device",
    },
    summary:
      "GeneMatch AI™ is our first flagship programme, live today — an AI-powered health education and preventive health platform translating health literacy resources, risk-awareness tools and personalised educational content into plain, actionable guidance for individuals and families.",
    features: [
      {
        title: "Health Risk Awareness",
        description:
          "Tools to help people understand common and inherited health risk factors in plain language.",
      },
      {
        title: "Preventive Recommendations",
        description:
          "Educational, evidence-informed suggestions to support healthier day-to-day decisions — not a diagnosis.",
      },
      {
        title: "Personalised Learning",
        description:
          "Content tailored to a person's own health goals and questions, built with input from clinical and academic partners.",
      },
    ],
    faqs: [
      {
        question: "Is GeneMatch AI™ live yet?",
        answer:
          "Yes. GeneMatch AI™ is live now — you can try it directly at gene-match.vercel.app. We continue to build on it as our founding flagship programme.",
      },
      {
        question: "Will it store or sell my data?",
        answer:
          "GeneMatch Health CIC's asset lock and CIC status mean any surplus is reinvested in our community benefit objectives. We are designing GeneMatch AI™ around UK GDPR and the NHS Data Security and Protection Toolkit, and we will never sell personal data to third parties or insurers.",
      },
      {
        question: "Does GeneMatch AI™ provide medical diagnoses?",
        answer:
          "No. GeneMatch AI™ is designed to provide educational insights and health literacy support based on current public health guidance. It is intended to complement, not replace, advice from a GP or qualified medical professional.",
      },
    ],
  },
  {
    slug: "fertility",
    name: "GeneMatch Fertility™",
    shortDescription:
      "Supporting reproductive and fertility awareness through education, resources and family planning guidance.",
    icon: "heart-pulse",
    summary:
      "GeneMatch Fertility™ supports reproductive and fertility awareness through fertility education, reproductive health resources, family planning guidance, community support initiatives and research partnerships.",
    features: [
      {
        title: "Fertility Education",
        description:
          "Clear, evidence-based information on fertility and reproductive health, built for real decision-making.",
      },
      {
        title: "Family Planning Guidance",
        description:
          "Resources to help couples and individuals plan for their family's future health with confidence.",
      },
      {
        title: "Community Support",
        description:
          "Connecting people with community initiatives and research partnerships as the programme grows.",
      },
    ],
    faqs: [
      {
        question: "Who is GeneMatch Fertility™ for?",
        answer:
          "Individuals, couples, and anyone seeking reliable fertility awareness and family planning information, particularly communities with limited access to this education today.",
      },
      {
        question: "Is this a clinical or diagnostic service?",
        answer:
          "No. GeneMatch Fertility™ provides education and awareness resources. It is not a substitute for consultation with a GP, fertility specialist or reproductive health clinician.",
      },
    ],
  },
  {
    slug: "family-health",
    name: "GeneMatch Family Health™",
    shortDescription:
      "Helping families manage health proactively with family history tools, preventive guidance and wellness resources.",
    icon: "users-round",
    image: {
      src: "/images/doctor-patient.jpg",
      alt: "Two clinicians reviewing patient scan results together",
    },
    summary:
      "GeneMatch Family Health™ helps families manage health proactively through family health history tools, preventive healthcare guidance, wellness programmes, health tracking resources and family health education.",
    features: [
      {
        title: "Family Health History Tools",
        description:
          "Simple ways for families to record and understand shared health history across generations.",
      },
      {
        title: "Preventive Guidance",
        description:
          "Practical, understandable guidance to support proactive rather than reactive family healthcare.",
      },
      {
        title: "Wellness Programmes",
        description:
          "Educational programmes designed to build healthier habits across the whole family.",
      },
    ],
    faqs: [
      {
        question: "Do I need a diagnosis to use Family Health resources?",
        answer:
          "No. GeneMatch Family Health™ is an education and planning resource, designed to sit alongside — not replace — advice from your GP or healthcare provider.",
      },
    ],
  },
  {
    slug: "education",
    name: "GeneMatch Education™",
    shortDescription:
      "Delivering workshops, training, public awareness campaigns and community engagement on health literacy.",
    icon: "graduation-cap",
    summary:
      "GeneMatch Education™ delivers workshops, training programmes, public awareness campaigns, research publications, community engagement activities and digital learning resources.",
    features: [
      {
        title: "Workshops & Training",
        description:
          "In-person and digital sessions building health and genomic literacy for community groups and professionals.",
      },
      {
        title: "Public Awareness Campaigns",
        description:
          "Campaigns designed to reach underserved communities with trusted, accessible health information.",
      },
      {
        title: "Digital Learning Resources",
        description:
          "Curriculum and materials that can be shared with schools, community groups and healthcare partners.",
      },
    ],
    faqs: [
      {
        question: "Can our organisation host a GeneMatch Education™ workshop?",
        answer:
          "We're building partnerships with community groups, schools and healthcare organisations for our first workshops. Get in touch via our Partnerships page to discuss hosting one.",
      },
    ],
  },
];

export const targets = {
  year1: {
    label: "Year 1 Target",
    users: "1,000",
    workshops: "20",
    beneficiaries: "500",
  },
  year3: {
    label: "Year 3 Target",
    users: "50,000",
    workshops: "100",
    beneficiaries: "25,000",
  },
  year5: {
    label: "Year 5 Target",
    users: "250,000",
    indirectBeneficiaries: "500,000",
    workshops: "500",
  },
  pilot: {
    name: "GeneMatch Community Health Intelligence Pilot",
    location: "Greater Manchester",
    duration: "12 months",
    participants: "1,000",
    status: "Proposed — seeking delivery partners",
  },
};

export const partnerBenefits = [
  {
    title: "Founding Recognition",
    description:
      "Be recognised as one of our founding partners in our public materials and reporting as GeneMatch Health CIC grows.",
  },
  {
    title: "Early Access & Co-Design",
    description:
      "Shape GeneMatch AI™ and our other programmes before they reach the public, with direct input into features and pilots.",
  },
  {
    title: "Shared Research & Insights",
    description:
      "Get early access to findings from our research partnerships and pilots, including our proposed Greater Manchester pilot.",
  },
  {
    title: "A Publicly Accountable Mission",
    description:
      "As a registered, asset-locked Community Interest Company, every partnership with us furthers a transparent, community-benefit purpose — not private profit.",
  },
];

export const targetPartners = {
  sectors: [
    "NHS Integrated Care Boards",
    "GP Networks",
    "Community Health Trusts",
    "NHS Innovation Hubs",
    "Innovate UK",
    "National Lottery Community Fund",
    "Health Innovation Networks",
  ],
  universities: [
    "University of Manchester",
    "Manchester Metropolitan University",
    "University of Salford",
    "King's College London",
  ],
};

export const roadmap = [
  {
    phase: "Year 1 — Foundation",
    status: "In progress",
    description:
      "Register GeneMatch Health CIC, launch this website and brand, launch the GeneMatch AI™ platform, establish GeneMatch Education™, build initial partnerships and apply for grant funding.",
  },
  {
    phase: "Year 2 — Build",
    status: "Planned",
    description:
      "Expand GeneMatch AI™ and educational programmes, secure funding partnerships and grow community engagement.",
  },
  {
    phase: "Year 3 — Expand",
    status: "Planned",
    description:
      "Pursue national expansion, research collaborations, NHS partnership opportunities and international pilot programmes.",
  },
];

export const clinicalCommitments = [
  {
    title: "Clinical Assurance",
    description:
      "We are designing our governance and safety processes with reference to NHS clinical safety standards (DCB0129/0160) as GeneMatch AI™ moves toward pilot stage.",
  },
  {
    title: "Ethical Standards",
    description:
      "We intend to establish an independent ethics function to guide data sovereignty and equitable access as the organisation grows.",
  },
  {
    title: "Data Privacy",
    description:
      "GeneMatch AI™ is being designed around UK GDPR, the Data Protection Act 2018 and the NHS Data Security and Protection Toolkit.",
  },
];

export const fundingAvenues = [
  {
    title: "Corporate Partnerships",
    description:
      "CSR and innovation partnerships with corporates aligned to ethical AI, digital inclusion and preventive health — from joint pilots to in-kind technical support.",
  },
  {
    title: "Research Funding & Grants",
    description:
      "Grant funding from bodies such as Innovate UK, the National Lottery Community Fund, Health Innovation Networks and NHS Innovation Programmes, alongside university research grants.",
  },
  {
    title: "Community Sponsorship",
    description:
      "Sponsorship of our GeneMatch Education™ workshops and community outreach — putting your organisation's name behind health literacy where it's needed most.",
  },
  {
    title: "Volunteer & In-Kind Support",
    description:
      "Time, expertise and in-kind contributions from volunteers, advisors and organisations — see our Careers & Volunteering page to get involved directly.",
  },
];

export const revenueModel = [
  { stream: "Grants", description: "Applications to public, charitable and innovation funding programmes." },
  { stream: "Educational Services", description: "Workshops, training programmes and health education events." },
  { stream: "Partnerships", description: "Collaborations with healthcare organisations and universities." },
  { stream: "Sponsorship", description: "Corporate and institutional sponsorship opportunities." },
  { stream: "Technology Licensing", description: "Licensing selected digital solutions to approved partners." },
  { stream: "Consultancy", description: "Health innovation, governance and digital transformation consulting." },
];

export const nav = [
  { href: "/about", label: "About" },
  { href: "/programmes", label: "Programmes" },
  { href: "/research", label: "Research" },
  { href: "/community-impact", label: "Impact" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export const footerLinks = {
  organisation: [
    { href: "/about", label: "About Us" },
    { href: "/programmes", label: "Programmes" },
    { href: "/research", label: "Research & Innovation" },
    { href: "/community-impact", label: "Community Impact" },
    { href: "/partnerships", label: "Partnerships" },
  ],
  resources: [
    { href: "/funding", label: "Funding & Support" },
    { href: "/news", label: "News" },
    { href: "/resources", label: "Resources" },
    { href: "/careers", label: "Careers & Volunteering" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
    { href: "/cookies", label: "Cookies" },
    { href: "/accessibility", label: "Accessibility" },
  ],
};
