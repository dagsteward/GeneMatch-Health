import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  createSession,
  findAdminByEmail,
  isLockedOut,
  recordLoginAttempt,
  verifyPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  try {
    if (await isLockedOut(email)) {
      return NextResponse.json(
        { error: "Too many failed attempts. Try again in 15 minutes." },
        { status: 429 }
      );
    }

    const admin = await findAdminByEmail(email);
    const valid = admin ? await verifyPassword(password, admin.password_hash) : false;

    await recordLoginAttempt(email, valid);

    if (!admin || !valid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = await createSession(admin.id);
    const store = await cookies();
    store.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[auth/login] failed:", (err as Error).message);
    return NextResponse.json(
      { error: "Could not reach the database. Try again shortly." },
      { status: 503 }
    );
  }
}
