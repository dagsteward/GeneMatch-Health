import { handleFormSubmission } from "@/lib/formSubmission";

// NOTE: No transactional email provider is configured. This validates the
// submission but does not deliver it to partnerships@genematchhealth.org yet —
// wire up a real provider + API key before launch.
export async function POST(request: Request) {
  return handleFormSubmission(request, ["name", "organisation", "interest", "goals"]);
}
