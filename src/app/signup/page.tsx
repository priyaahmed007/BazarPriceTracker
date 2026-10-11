import type { Metadata } from "next";
import { getSocialProviders } from "@/lib/auth-providers";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "সাইন আপ",
  description: "বাজার দর-এ নতুন অ্যাকাউন্ট খুলে পণ্যের দৈনিক বাজার দর ও বাজারভিত্তিক মূল্য দেখুন।",
};

export default async function SignUpPage() {
  return <SignUpForm providers={getSocialProviders()} />;
}
