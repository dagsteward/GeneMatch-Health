"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setError(json.error ?? "Something went wrong.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setStatus("error");
      setError("Could not reach the server.");
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-muted/40 px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-3xl bg-card p-8 shadow-xl">
          <div className="mb-6 flex items-center gap-2">
            <Lock className="h-4 w-4 text-secondary" aria-hidden="true" />
            <h1 className="font-heading text-lg font-semibold text-primary">Admin Sign In</h1>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="login-email" className="mb-2 block">
                Email
              </Label>
              <Input id="login-email" name="email" type="email" required autoComplete="username" />
            </div>
            <div>
              <Label htmlFor="login-password" className="mb-2 block">
                Password
              </Label>
              <Input
                id="login-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
              />
            </div>
            {status === "error" && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-transform active:scale-95 disabled:opacity-60"
            >
              {status === "loading" ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
