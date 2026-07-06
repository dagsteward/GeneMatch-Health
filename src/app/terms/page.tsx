import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="July 2026">
      <h2>Acceptance of terms</h2>
      <p>
        By using this website, you agree to these terms of use. If you do not agree, please
        do not use the site.
      </p>

      <h2>Not medical advice</h2>
      <p>
        Content on this website, including information about GeneMatch AI™, GeneMatch
        Fertility™, GeneMatch Family Health™ and GeneMatch Education™, is provided for
        general educational and informational purposes only. It is not medical advice and is
        not a substitute for consultation with a GP or qualified healthcare professional.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The GeneMatch name, logo and programme names (GeneMatch AI™, GeneMatch Fertility™,
        GeneMatch Family Health™, GeneMatch Education™) are the property of {site.name}.
      </p>

      <h2>Community Interest Company status</h2>
      <p>
        {site.name} operates under the statutory Community Interest Company asset lock. Any
        surplus is reinvested in furthering our community benefit objectives, in accordance
        with Community Interest Company regulations.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        We make reasonable efforts to keep information on this site accurate, but we make no
        warranties about its completeness or accuracy, particularly given {site.name} is a
        newly founded organisation whose programmes and platforms are still in development.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href={`mailto:${site.emails.info}`}>{site.emails.info}</a>.
      </p>
    </LegalPage>
  );
}
