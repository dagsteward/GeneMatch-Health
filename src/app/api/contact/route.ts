import { handleFormSubmission } from "@/lib/formSubmission";
import { site } from "@/lib/site";

export async function POST(request: Request) {
  return handleFormSubmission(request, ["name", "email", "message"], {
    to: site.emails.info,
    subject: "New contact form submission",
  });
}
