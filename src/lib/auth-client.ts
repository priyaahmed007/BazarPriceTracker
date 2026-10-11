import { createAuthClient } from "better-auth/react";

/**
 * Browser Better Auth client.
 * No `baseURL` is passed on purpose: Better Auth falls back to the current
 * origin, so the same code works on localhost, Vercel preview and production.
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const { useSession, signIn, signUp, signOut, updateUser } = authClient;
