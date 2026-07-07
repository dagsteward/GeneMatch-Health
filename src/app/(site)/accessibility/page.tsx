import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `${site.name}'s accessibility statement and commitments.`,
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility Statement" updated="July 2026">
      <h2>Our commitment</h2>
      <p>
        {site.name} is committed to making this website accessible to as many people as
        possible, in line with the Web Content Accessibility Guidelines (WCAG) 2.2, level AA.
      </p>

      <h2>What we&apos;ve done</h2>
      <ul>
        <li>Semantic HTML structure with meaningful heading levels</li>
        <li>Keyboard-navigable menus, forms and interactive components</li>
        <li>Colour combinations checked against WCAG AA contrast requirements</li>
        <li>Reduced-motion support for users who prefer minimal animation</li>
        <li>Descriptive alt text and labels for images, icons and form fields</li>
      </ul>

      <h2>Feedback</h2>
      <p>
        If you find any part of this website difficult to use, please let us know at{" "}
        <a href={`mailto:${site.emails.info}`}>{site.emails.info}</a> so we can improve it.
      </p>
    </LegalPage>
  );
}
