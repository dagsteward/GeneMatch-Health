import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-8 shadow-sm transition-all duration-300",
        dark ? "glass-dark text-white" : "glass",
        className
      )}
    >
      {children}
    </div>
  );
}
