import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookies",
  description: `How ${site.name} uses cookies on this website.`,
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" updated="July 2026">
      <h2>What are cookies</h2>
      <p>
        Cookies are small text files stored on your device that help websites function and
        remember preferences.
      </p>

      <h2>Cookies we use</h2>
      <p>
        This website currently uses only strictly necessary cookies required for basic site
        functionality. We do not currently use analytics, advertising or tracking cookies.
      </p>

      <h2>Managing cookies</h2>
      <p>
        You can control or delete cookies through your browser settings at any time. Blocking
        strictly necessary cookies may affect how parts of this site function.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about our use of cookies can be sent to{" "}
        <a href={`mailto:${site.emails.info}`}>{site.emails.info}</a>.
      </p>
    </LegalPage>
  );
}
