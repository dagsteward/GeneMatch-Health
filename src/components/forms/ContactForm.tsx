"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormSubmit } from "@/hooks/useFormSubmit";

export function ContactForm() {
  const { status, errorMessage, submit } = useFormSubmit("/api/contact");

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-8 text-center">
        <p className="font-heading text-lg font-semibold text-primary">Message sent.</p>
        <p className="mt-2 text-sm text-muted-foreground">We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form
      className="space-y-5 rounded-3xl bg-white p-8 shadow-xl"
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
        submit(data);
      }}
    >
      <div>
        <Label htmlFor="contact-name" className="mb-2 block">
          Name
        </Label>
        <Input id="contact-name" name="name" required />
      </div>
      <div>
        <Label htmlFor="contact-email" className="mb-2 block">
          Email
        </Label>
        <Input id="contact-email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="contact-message" className="mb-2 block">
          Message
        </Label>
        <Textarea id="contact-message" name="message" rows={5} required />
      </div>
      {status === "error" && <p className="text-sm text-destructive">{errorMessage}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-transform active:scale-95 disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
