"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Image as ImageIcon, Newspaper, LogOut } from "lucide-react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/news", label: "News", icon: Newspaper },
];

export function AdminNav({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-3">
        <Link href="/admin" className="shrink-0">
          <Logo markOnly className="h-8 w-auto" />
        </Link>
        <nav className="flex flex-1 items-center gap-1 overflow-x-auto">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <link.icon className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:inline">{adminName}</span>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
