import { NextResponse, type NextRequest } from "next/server";

/**
 * Server side protected route guard (Next.js 16 renamed `middleware` to `proxy`).
 *
 * This is an optimistic check: it only verifies that a Better Auth session
 * cookie exists so the user is redirected before the protected page renders.
 * The real session is always validated again on the client with
 * `authClient.useSession()`.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const hasSessionCookie =
    request.cookies.has("better-auth.session_token") ||
    request.cookies.has("__Secure-better-auth.session_token");

  if (hasSessionCookie) {
    return NextResponse.next();
  }

  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set("redirect", `${pathname}${search}`);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};
