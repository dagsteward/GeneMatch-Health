import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, destroySession } from "@/lib/auth";

export async function POST() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;

  if (token) {
    try {
      await destroySession(token);
    } catch (err) {
      console.warn("[auth/logout] failed to destroy session row:", (err as Error).message);
    }
  }

  store.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
