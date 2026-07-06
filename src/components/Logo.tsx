import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markOnly?: boolean;
  light?: boolean;
};

export function Logo({ className, markOnly = false, light = false }: LogoProps) {
  return (
    <svg
      viewBox={markOnly ? "20 10 80 60" : "0 0 400 100"}
      className={cn("h-8 w-auto", className)}
      role="img"
      aria-label="GeneMatch Health"
    >
      <defs>
        <linearGradient id="gm-logo-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0A2342" />
          <stop offset="100%" stopColor="#0F9D8A" />
        </linearGradient>
      </defs>
      <path
        d="M40 30 Q50 20 60 30 T80 30"
        fill="none"
        stroke="url(#gm-logo-grad)"
        strokeWidth={8}
        strokeLinecap="round"
      />
      <path
        d="M40 50 Q50 40 60 50 T80 50"
        fill="none"
        stroke="url(#gm-logo-grad)"
        strokeWidth={8}
        strokeLinecap="round"
      />
      <circle cx={60} cy={40} r={12} fill="#2BB7E8" />
      {!markOnly && (
        <>
          <text
            x={100}
            y={65}
            fontFamily="var(--font-heading), Poppins, sans-serif"
            fontWeight={700}
            fontSize={32}
            fill={light ? "#ffffff" : "#0A2342"}
          >
            GeneMatch
          </text>
          <text
            x={310}
            y={65}
            fontFamily="var(--font-heading), Poppins, sans-serif"
            fontWeight={400}
            fontSize={32}
            fill={light ? "#65DAC4" : "#0F9D8A"}
          >
            Health
          </text>
        </>
      )}
    </svg>
  );
}
