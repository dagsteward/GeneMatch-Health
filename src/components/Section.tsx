import { cn } from "@/lib/utils";
import { DnaHelixBackground } from "@/components/DnaHelixBackground";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  /** Render the animated DNA helix behind this section's content, matching the Home hero. */
  withHelix?: boolean;
};

export function Section({ children, className, containerClassName, id, withHelix }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", withHelix && "relative overflow-hidden", className)}
    >
      {withHelix && <DnaHelixBackground opacity={0.15} />}
      <div
        className={cn(
          "mx-auto max-w-[1280px] px-6 md:px-10",
          withHelix && "relative z-10",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-secondary",
        className
      )}
    >
      {children}
    </div>
  );
}
