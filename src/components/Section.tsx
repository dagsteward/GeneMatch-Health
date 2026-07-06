import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
};

export function Section({ children, className, containerClassName, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className={cn("mx-auto max-w-[1280px] px-6 md:px-10", containerClassName)}>
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
