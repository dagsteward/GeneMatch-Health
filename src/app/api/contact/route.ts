import { handleFormSubmission } from "@/lib/formSubmission";

// NOTE: No transactional email provider (e.g. Resend, SendGrid) is configured.
// This validates the submission but does not deliver it to info@genematchhealth.org
// yet — wire up a real provider + API key before launch.
export async function POST(request: Request) {
  return handleFormSubmission(request, ["name", "email", "message"]);
}
