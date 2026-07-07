// Isolated from auth.ts on purpose: middleware.ts runs on the Edge runtime
// and must not pull in db.ts (mysql2 needs Node's net/tls, unavailable there).
export const SESSION_COOKIE = "gm_admin_session";
