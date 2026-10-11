"use client";

import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          style: { fontSize: "14px", fontWeight: 500 },
          success: { iconTheme: { primary: "#16a34a", secondary: "#ffffff" } },
        }}
      />
      {children}
    </AuthProvider>
  );
}
