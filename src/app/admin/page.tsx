import Link from "next/link";
import { FileText, Image as ImageIcon, Newspaper, ExternalLink } from "lucide-react";
import { getCurrentAdmin } from "@/lib/auth";

const cards = [
  {
    href: "/admin/content",
    icon: FileText,
    title: "Content",
    description: "Edit the text and images used across every page of the site.",
  },
  {
    href: "/admin/media",
    icon: ImageIcon,
    title: "Media",
    description: "Upload and manage images used across the site.",
  },
  {
    href: "/admin/news",
    icon: Newspaper,
    title: "News",
    description: "Write, edit and publish news articles.",
  },
];

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();

  return (
    <div>
      <h1 className="mb-2 font-heading text-2xl font-semibold text-primary">
        Welcome, {admin?.name}
      </h1>
      <p className="mb-10 text-muted-foreground">
        Manage GeneMatch Health CIC&apos;s live website content from here.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-2xl bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <card.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mb-2 font-heading font-semibold text-primary">{card.title}</h2>
            <p className="text-sm text-muted-foreground">{card.description}</p>
          </Link>
        ))}
      </div>

      <Link
        href="/"
        target="_blank"
        className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:underline"
      >
        View the live site <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </div>
  );
}
