"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import type { SocialProviderId, SocialProviderInfo } from "@/lib/auth-providers";

interface SignInFormProps {
  redirectTo?: string;
  providers: SocialProviderInfo[];
}

export default function SignInForm({ redirectTo, providers }: SignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialProviderId | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দুটোই পূরণ করুন!");
      return;
    }

    setIsSubmitting(true);
    const { error } = await authClient.signIn.email({
      email: email.trim(),
      password,
    });
    setIsSubmitting(false);

    if (error) {
      toast.error(
        error.message === "Invalid email or password"
          ? "ইমেইল বা পাসওয়ার্ড সঠিক নয়!"
          : error.message || "সাইন ইন করা যায়নি, আবার চেষ্টা করুন।",
      );
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে! স্বাগতম 🎉");
    router.push(redirectTo ?? "/");
    router.refresh();
  };

  const handleSocial = async (provider: SocialProviderInfo) => {
    if (!provider.enabled) {
      toast.error(
        `${provider.label} সাইন-ইন এখনো কনফিগার করা হয়নি। সার্ভারে ${provider.label.toUpperCase()}_CLIENT_ID ও সিক্রেট যোগ করুন।`,
      );
      return;
    }

    setSocialLoading(provider.id);
    await authClient.signIn.social({
      provider: provider.id,
      callbackURL: redirectTo ?? "/",
    });
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-900">সাইন ইন করুন</h1>
          <p className="text-xs text-slate-500">আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন</p>
        </div>

        {redirectTo ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-medium text-amber-800">
            🔒 এই পেজটি দেখতে আগে সাইন ইন করা প্রয়োজন।
          </p>
        ) : null}

        <div className="grid grid-cols-2 gap-3">
          {providers.map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleSocial(provider)}
              type="button"
              disabled={socialLoading !== null}
              className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>{provider.icon}</span>
              {socialLoading === provider.id ? "অপেক্ষা করুন..." : provider.label}
            </button>
          ))}
        </div>

        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-xs text-slate-400 absolute">অথবা</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="signin-email" className="block text-xs font-bold text-slate-700 mb-1">
              ইমেইল অ্যাড্রেস
            </label>
            <input
              id="signin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@gmail.com"
              autoComplete="email"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="signin-password" className="block text-xs font-bold text-slate-700 mb-1">
              পাসওয়ার্ড
            </label>
            <input
              id="signin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
                সাইন ইন হচ্ছে...
              </span>
            ) : (
              "সাইন ইন করুন"
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="text-emerald-700 font-bold hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
