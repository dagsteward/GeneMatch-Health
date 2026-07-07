"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ExternalLink, Menu, Sparkles, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
    <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/80 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
          <Logo className="h-7 w-auto sm:h-8" />
        </Link>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-secondary"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <a
            href={site.aiPlatformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-secondary px-5 py-2 text-sm font-semibold text-secondary transition-colors hover:bg-secondary/5"
          >
            Launch GeneMatch AI <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <Link
            href="/partnerships"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
          >
            Partner With Us
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={site.aiPlatformUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Launch GeneMatch AI"
            className="flex h-11 w-11 items-center justify-center text-secondary"
          >
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-primary"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>
    </header>

    {open && (
      <button
        aria-label="Close menu overlay"
        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        onClick={() => setOpen(false)}
      />
    )}

    <div
      className={cn(
        "fixed inset-y-0 left-0 z-[60] flex h-full w-72 max-w-[85vw] flex-col overflow-y-auto rounded-r-2xl bg-sidebar shadow-xl transition-transform duration-300 ease-in-out lg:hidden",
        open ? "translate-x-0" : "-translate-x-full"
      )}
      aria-hidden={!open}
    >
      <div className="p-6 text-white">
        <div className="mb-8 font-heading text-lg font-semibold">GeneMatch Navigation</div>
        <div className="space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="block rounded-full px-4 py-3.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.aiPlatformUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="mt-4 flex items-center justify-center gap-1.5 rounded-full border-2 border-white/30 px-4 py-3.5 text-center font-semibold text-white"
          >
            Launch GeneMatch AI <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            href="/partnerships"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="mt-2 block rounded-full bg-secondary px-4 py-3.5 text-center font-semibold text-secondary-foreground"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
