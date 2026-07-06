"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormSubmit } from "@/hooks/useFormSubmit";

const interests = [
  "Clinical Research Collaboration",
  "Regional Health Integration",
  "Educational Grant",
  "Data Security Infrastructure",
  "Corporate Sponsorship",
  "Other",
];

export function PartnershipForm() {
  const { status, errorMessage, submit } = useFormSubmit("/api/partnership");

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-8 text-center">
        <p className="font-heading text-lg font-semibold text-primary">Thank you.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ve received your inquiry and will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-5 rounded-3xl bg-white p-8 shadow-xl md:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
        submit(data);
      }}
    >
      <div>
        <Label htmlFor="partner-name" className="mb-2 block">
          Full Name
        </Label>
        <Input id="partner-name" name="name" placeholder="Dr. Sarah Johnson" required />
      </div>
      <div>
        <Label htmlFor="partner-org" className="mb-2 block">
          Organisation
        </Label>
        <Input id="partner-org" name="organisation" placeholder="NHS Trust / Foundation" required />
      </div>
      <div>
        <Label htmlFor="partner-interest" className="mb-2 block">
          Partnership Interest
        </Label>
        <Select name="interest" required>
          <SelectTrigger id="partner-interest" className="w-full">
            <SelectValue placeholder="Select an area of interest" />
          </SelectTrigger>
          <SelectContent>
            {interests.map((interest) => (
              <SelectItem key={interest} value={interest}>
                {interest}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="partner-goals" className="mb-2 block">
          Brief Description of Goals
        </Label>
        <Textarea
          id="partner-goals"
          name="goals"
          placeholder="Tell us about your mission..."
          rows={4}
          required
        />
      </div>
      {status === "error" && <p className="text-sm text-destructive">{errorMessage}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-primary py-4 text-lg font-semibold text-primary-foreground transition-transform active:scale-95 disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Submit Partnership Inquiry"}
      </button>
    </form>
  );
}
