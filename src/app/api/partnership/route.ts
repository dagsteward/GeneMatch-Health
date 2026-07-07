import { handleFormSubmission } from "@/lib/formSubmission";
import { site } from "@/lib/site";

export async function POST(request: Request) {
  return handleFormSubmission(request, ["name", "organisation", "interest", "goals"], {
    to: site.emails.partnerships,
    subject: "New partnership inquiry",
  });
}
