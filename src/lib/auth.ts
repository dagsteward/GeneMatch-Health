import { randomBytes, createHash } from "node:crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { query, execute } from "@/lib/db";
import { SESSION_COOKIE } from "@/lib/session-cookie";

export { SESSION_COOKIE };
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MINUTES = 15;

export type AdminUser = { id: number; email: string; name: string };

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(adminId: number): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await execute(
    "INSERT INTO admin_sessions (admin_id, token_hash, expires_at) VALUES (?, ?, ?)",
    [adminId, hashToken(token), expiresAt]
  );
  return token;
}

export async function validateSession(token: string | undefined): Promise<AdminUser | null> {
  if (!token) return null;
  try {
    const rows = await query<AdminUser & { expires_at: string }>(
      `SELECT u.id, u.email, u.name, s.expires_at
       FROM admin_sessions s
       JOIN admin_users u ON u.id = s.admin_id
       WHERE s.token_hash = ? AND s.expires_at > NOW()
       LIMIT 1`,
      [hashToken(token)]
    );
    const row = rows[0];
    if (!row) return null;
    return { id: row.id, email: row.email, name: row.name };
  } catch (err) {
    console.warn("[auth] session validation failed:", (err as Error).message);
    return null;
  }
}

export async function destroySession(token: string): Promise<void> {
  await execute("DELETE FROM admin_sessions WHERE token_hash = ?", [hashToken(token)]);
}

/** Server Component / Route Handler helper — reads the cookie and validates it. */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return validateSession(token);
}

export async function recordLoginAttempt(email: string, succeeded: boolean): Promise<void> {
  await execute("INSERT INTO login_attempts (email, succeeded) VALUES (?, ?)", [
    email,
    succeeded,
  ]);
}

export async function isLockedOut(email: string): Promise<boolean> {
  const rows = await query<{ count: number }>(
    `SELECT COUNT(*) as count FROM login_attempts
     WHERE email = ? AND succeeded = FALSE
       AND attempted_at > (NOW() - INTERVAL ? MINUTE)`,
    [email, LOCKOUT_WINDOW_MINUTES]
  );
  return (rows[0]?.count ?? 0) >= MAX_FAILED_ATTEMPTS;
}

export async function findAdminByEmail(
  email: string
): Promise<(AdminUser & { password_hash: string }) | null> {
  const rows = await query<AdminUser & { password_hash: string }>(
    "SELECT id, email, name, password_hash FROM admin_users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0] ?? null;
}
