"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormSubmit } from "@/hooks/useFormSubmit";

const interestAreas = [
  "Community Outreach",
  "Health Education Workshops",
  "Content & Communications",
  "Research Support",
  "Technology & Development",
  "Other",
];

export function VolunteerForm() {
  const { status, errorMessage, submit } = useFormSubmit("/api/volunteer");

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-8 text-center">
        <p className="font-heading text-lg font-semibold text-primary">Thank you.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ve received your details and will reach out as founding roles open up.
        </p>
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
        <Label htmlFor="vol-name" className="mb-2 block">
          Full Name
        </Label>
        <Input id="vol-name" name="name" required />
      </div>
      <div>
        <Label htmlFor="vol-email" className="mb-2 block">
          Email
        </Label>
        <Input id="vol-email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="vol-interest" className="mb-2 block">
          Area of Interest
        </Label>
        <Select name="interest" required>
          <SelectTrigger id="vol-interest" className="w-full">
            <SelectValue placeholder="Select an area" />
          </SelectTrigger>
          <SelectContent>
            {interestAreas.map((area) => (
              <SelectItem key={area} value={area}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {status === "error" && <p className="text-sm text-destructive">{errorMessage}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-secondary py-3.5 font-semibold text-secondary-foreground transition-transform active:scale-95 disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Register Interest"}
      </button>
    </form>
  );
}
