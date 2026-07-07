import { handleFormSubmission } from "@/lib/formSubmission";
import { site } from "@/lib/site";

export async function POST(request: Request) {
  return handleFormSubmission(request, ["name", "email", "interest"], {
    to: site.emails.careers,
    subject: "New volunteer interest submission",
  });
}
