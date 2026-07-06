import Link from "next/link";
import { ArrowRight, ExternalLink, GraduationCap, HeartPulse, Sparkles, UsersRound } from "lucide-react";
import type { Programme } from "@/lib/site";
import { GlassCard } from "@/components/GlassCard";
import { cn } from "@/lib/utils";

const icons = {
  sparkles: Sparkles,
  "heart-pulse": HeartPulse,
  "users-round": UsersRound,
  "graduation-cap": GraduationCap,
} as const;

const gradients = [
  "from-primary to-secondary",
  "from-secondary to-accent",
  "from-accent to-primary",
  "from-primary/80 to-accent/80",
];

export function ProgrammeCard({ programme, index }: { programme: Programme; index: number }) {
  const Icon = icons[programme.icon];
  return (
    <GlassCard className="group flex h-full flex-col hover:-translate-y-2">
      <div
        className={cn(
          "mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md",
          gradients[index % gradients.length]
        )}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div className="mb-3 flex items-center gap-2">
        <h3 className="font-heading text-xl font-semibold text-primary">{programme.name}</h3>
        {programme.platformUrl && (
          <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary">
            Live
          </span>
        )}
      </div>
      <p className="mb-6 flex-1 text-sm text-muted-foreground">{programme.shortDescription}</p>
      <div className="flex items-center justify-between gap-3">
        <Link
          href={`/programmes/${programme.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-secondary transition-all group-hover:gap-2"
        >
          Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        {programme.platformUrl && (
          <a
            href={programme.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Launch <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </GlassCard>
  );
}
