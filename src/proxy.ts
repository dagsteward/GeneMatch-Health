import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/session-cookie";

// Edge runtime can't reach MySQL, so this only does a cheap "is there a
// cookie at all" check. The real session validation (hash lookup against
// admin_sessions) happens in src/app/admin/layout.tsx on the Node runtime.
export function proxy(request: NextRequest) {
  const hasSessionCookie = request.cookies.has(SESSION_COOKIE);

  if (!hasSessionCookie) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
