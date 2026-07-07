import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markOnly?: boolean;
  /** Force light (white/teal) text — for use on surfaces that never change with the theme, e.g. the mobile nav drawer. */
  light?: boolean;
};

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 78" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gm-mark-navy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#324768" />
          <stop offset="100%" stopColor="#0A2342" />
        </linearGradient>
        <linearGradient id="gm-mark-teal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3FCBB6" />
          <stop offset="100%" stopColor="#0F9D8A" />
        </linearGradient>
      </defs>
      {/* head */}
      <circle cx="30" cy="12" r="10" fill="url(#gm-mark-navy)" />
      {/* shoulders connecting head to the two helix strands */}
      <path
        d="M19 21 Q30 17 41 21"
        fill="none"
        stroke="url(#gm-mark-navy)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* twisting double-helix body */}
      <path
        d="M18 24 C 40 30, 40 44, 22 51 C 5 58, 5 66, 20 76"
        fill="none"
        stroke="url(#gm-mark-navy)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M42 24 C 20 30, 20 44, 38 51 C 55 58, 55 66, 40 76"
        fill="none"
        stroke="url(#gm-mark-teal)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* rungs at the crossing points */}
      <circle cx="30" cy="37" r="2.5" fill="#2BB7E8" />
      <circle cx="30" cy="64" r="2.5" fill="#2BB7E8" />
    </svg>
  );
}

export function Logo({ className, markOnly = false, light = false }: LogoProps) {
  if (markOnly) {
    return <LogoMark className={cn("h-8 w-auto", className)} />;
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-auto shrink-0" />
      <span className="flex flex-col justify-center leading-none">
        <span className="font-heading text-lg font-bold tracking-tight">
          <span className={light ? "text-white" : "text-primary"}>Gene</span>
          <span className={light ? "text-[#65DAC4]" : "text-secondary"}>Match</span>
        </span>
        <span
          className={cn(
            "mt-0.5 text-[9px] font-semibold uppercase tracking-[0.2em]",
            light ? "text-white/70" : "text-muted-foreground"
          )}
        >
          Health CIC
        </span>
      </span>
    </span>
  );
}
