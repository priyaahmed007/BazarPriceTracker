"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  updateProfile: (newName: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Wraps the real Better Auth session in a small React context so every client
 * component can read the signed in user without repeating the hook.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending, refetch } = authClient.useSession();

  const logout = useCallback(async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          refetch();
          toast.success("সফলভাবে সাইন আউট হয়েছে!");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "সাইন আউট করা যায়নি, আবার চেষ্টা করুন।");
        },
      },
    });
  }, [refetch]);

  const updateProfile = useCallback(
    async (newName: string) => {
      const trimmed = newName.trim();
      if (!trimmed) {
        toast.error("অনুগ্রহ করে আপনার সঠিক নাম লিখুন!");
        return false;
      }

      const { error } = await authClient.updateUser({ name: trimmed });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করা যায়নি!");
        return false;
      }

      await refetch();
      toast.success("প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!");
      return true;
    },
    [refetch],
  );

  const user: AuthUser | null = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }
    : null;

  return (
    <AuthContext.Provider value={{ user, isLoading: isPending, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
