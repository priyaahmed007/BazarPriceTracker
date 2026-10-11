import type { Metadata } from "next";
import { getSocialProviders } from "@/lib/auth-providers";
import SignInForm from "./SignInForm";

export const metadata: Metadata = {
  title: "সাইন ইন",
  description: "বাজার দর অ্যাকাউন্টে সাইন ইন করে পণ্যের বিস্তারিত বাজার মূল্য দেখুন।",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawRedirect = Array.isArray(params.redirect) ? params.redirect[0] : params.redirect;
  const redirectTo = rawRedirect && rawRedirect.startsWith("/") ? rawRedirect : undefined;

  return <SignInForm redirectTo={redirectTo} providers={getSocialProviders()} />;
}
