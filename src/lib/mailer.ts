import nodemailer from "nodemailer";

type MailPayload = {
  to: string;
  subject: string;
  fields: Record<string, string>;
  replyTo?: string;
};

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    throw new Error("SMTP is not configured — missing SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASSWORD.");
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });
  return transporter;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Sends a plain internal notification for a form submission. Delivery
// failures are the caller's responsibility to catch — the site never lets a
// broken mail server take down a form submission (the row is still accepted).
export async function sendFormNotification({ to, subject, fields, replyTo }: MailPayload) {
  const from = process.env.SMTP_USER!;
  const text = Object.entries(fields)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  const html = Object.entries(fields)
    .map(([key, value]) => `<p><strong>${escapeHtml(key)}:</strong> ${escapeHtml(value).replace(/\n/g, "<br/>")}</p>`)
    .join("");

  await getTransporter().sendMail({
    from: `"GeneMatch Health CIC Website" <${from}>`,
    to,
    replyTo,
    subject,
    text,
    html,
  });
}
