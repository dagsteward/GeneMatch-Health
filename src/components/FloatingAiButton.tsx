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
      aria-label="Try GeneMatch AI"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:shadow-xl active:scale-95 lg:bottom-6 lg:right-6 lg:h-auto lg:w-auto lg:py-3 lg:pl-4 lg:pr-5"
    >
      <Sparkles className="h-5 w-5 text-accent lg:h-4 lg:w-4" aria-hidden="true" />
      <span className="hidden text-sm font-semibold lg:inline">Try GeneMatch AI</span>
    </a>
  );
}
