"use client";

import { Sparkles } from "lucide-react";
import { site } from "@/lib/site";

// A persistent, honest link out to the live GeneMatch AI platform — not an
// in-page chat widget, since no AI assistant runs on this marketing site.
export function FloatingAiButton() {
  return (
    <a
      href={site.aiPlatformUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-primary py-3 pl-4 pr-5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl active:scale-95 lg:flex"
    >
      <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
      <span>Try GeneMatch AI</span>
    </a>
  );
}
