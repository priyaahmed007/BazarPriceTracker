import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

/**
 * Better Auth catch-all route handler.
 * Mounted at `/api/auth/*` and used by `authClient` for sign in, sign up,
 * social OAuth callbacks, session refresh and sign out.
 */
export const { GET, POST } = toNextJsHandler(auth);

export const runtime = "nodejs";