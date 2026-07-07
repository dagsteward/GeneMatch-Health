import { NextResponse } from "next/server";
import { sendFormNotification } from "@/lib/mailer";

// Shared handler for the site's lead-gen forms (contact, partnership inquiry,
// volunteer interest). Validates required fields, then emails the submission
// to the given department address. A mail delivery failure is logged but
// still returns success to the visitor — losing the confirmation UI over an
// SMTP hiccup would be worse than a missed internal notification.
export async function handleFormSubmission(
  request: Request,
  requiredFields: string[],
  options: { to: string; subject: string }
) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const missing = requiredFields.filter((field) => !String(body[field] ?? "").trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const fields: Record<string, string> = {};
  for (const field of requiredFields) {
    fields[field] = String(body[field]).trim();
  }

  const replyTo = typeof body.email === "string" && body.email.trim() ? body.email.trim() : undefined;

  try {
    await sendFormNotification({ to: options.to, subject: options.subject, fields, replyTo });
  } catch (err) {
    console.error(`[form] failed to send notification to ${options.to}:`, (err as Error).message);
  }

  return NextResponse.json({ ok: true });
}
