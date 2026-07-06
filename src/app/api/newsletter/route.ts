import { NextResponse } from "next/server";

// NOTE: No transactional email / mailing-list provider (e.g. Resend, Mailchimp,
// SendGrid) is configured yet. This route validates input and logs the
// submission so nothing is silently lost, but it does not actually send email
// or add the address to a list. Wire up a real provider + API key before launch.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  console.log("[newsletter] signup received (no provider configured):", email);

  return NextResponse.json({ ok: true });
}
