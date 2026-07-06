import { NextResponse } from "next/server";

// Shared handler for the site's lead-gen forms (contact, partnership inquiry,
// volunteer interest). No transactional email provider is configured yet —
// see the NOTE in each route file. This validates required fields and logs
// the submission so nothing is silently dropped.
export async function handleFormSubmission(request: Request, requiredFields: string[]) {
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

  return NextResponse.json({ ok: true });
}
