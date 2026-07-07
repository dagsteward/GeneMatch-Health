import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${site.name}'s privacy policy — how we collect, use and protect personal data.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2026">
      <h2>Who we are</h2>
      <p>
        {site.registrationStatus} This policy explains how we collect, use and protect
        information submitted through this website.
      </p>

      <h2>Information we collect</h2>
      <p>
        We collect information you provide directly, such as your name, email address and any
        message content, when you use our contact, partnership or volunteer interest forms, or
        subscribe to our mailing list.
      </p>

      <h2>How we use your information</h2>
      <p>
        We use the information you provide to respond to your enquiry, to consider partnership
        or volunteering interest, and — where you&apos;ve subscribed — to send occasional
        updates about our work. We do not sell personal data to third parties or insurers.
      </p>

      <h2>Legal basis and your rights</h2>
      <p>
        We process personal data in line with the UK General Data Protection Regulation (UK
        GDPR) and the Data Protection Act 2018. You have the right to access, correct or
        request deletion of your data at any time by emailing{" "}
        <a href={`mailto:${site.emails.info}`}>{site.emails.info}</a>.
      </p>

      <h2>Data retention</h2>
      <p>
        We retain enquiry and subscription data only as long as necessary to respond to your
        request or maintain our mailing list, and will delete it on request.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to{" "}
        <a href={`mailto:${site.emails.info}`}>{site.emails.info}</a>.
      </p>
    </LegalPage>
  );
}
