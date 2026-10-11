"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function EditProfilePage() {
  const { user, isLoading, updateProfile } = useAuth();
  const router = useRouter();
  // `null` means "untouched": the input mirrors the stored name until the user
  // edits it, which avoids syncing state inside an effect.
  const [nameDraft, setNameDraft] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/signin?redirect=%2Fprofile%2Fedit");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto py-10 space-y-4 animate-pulse">
        <div className="h-8 w-1/2 bg-slate-200 rounded-lg"></div>
        <div className="h-64 bg-slate-200 rounded-3xl"></div>
      </div>
    );
  }

  if (!user) return null;

  const name = nameDraft ?? user.name;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUpdating(true);

    // Challenge C3: updates the user through Better Auth `updateUser` API.
    const success = await updateProfile(name);

    setIsUpdating(false);
    if (success) {
      router.push("/profile");
      router.refresh();
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <Link
            href="/profile"
            className="text-xs font-semibold text-emerald-700 hover:underline block mb-2"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900">তথ্য আপডেট করুন</h1>
          <p className="text-xs text-slate-500">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে নিচের ঘরে নতুন নাম লিখুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="edit-name" className="block text-xs font-bold text-slate-700 mb-1">
              আপনার নাম
            </label>
            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={(event) => setNameDraft(event.target.value)}
              placeholder="আপনার পুরো নাম"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-medium"
              required
            />
          </div>

          <div>
            <label htmlFor="edit-email" className="block text-xs font-bold text-slate-400 mb-1">
              ইমেইল অ্যাড্রেস (পরিবর্তনযোগ্য নয়)
            </label>
            <input
              id="edit-email"
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 text-slate-500 rounded-xl text-sm cursor-not-allowed font-medium"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <Link
              href="/profile"
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
            >
              বাতিল করুন
            </Link>
            <button
              type="submit"
              disabled={isUpdating}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-sm text-xs transition disabled:opacity-50"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
