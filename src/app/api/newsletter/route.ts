import { NextResponse } from "next/server";
import { sendFormNotification } from "@/lib/mailer";
import { site } from "@/lib/site";

// NOTE: no mailing-list provider (e.g. Mailchimp) is configured — signups are
// not added to any list yet. This does notify info@ by email so a real person
// sees each signup, but building an actual mailing list needs a provider.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  try {
    await sendFormNotification({
      to: site.emails.info,
      subject: "New newsletter signup",
      fields: { email },
      replyTo: email,
    });
  } catch (err) {
    console.error("[newsletter] failed to send notification:", (err as Error).message);
  }

  return NextResponse.json({ ok: true });
}
