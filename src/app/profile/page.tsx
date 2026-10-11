"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে আগে সাইন ইন করুন!");
      router.replace("/signin?redirect=%2Fprofile");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-10 space-y-4 animate-pulse">
        <div className="h-32 bg-slate-200 rounded-3xl"></div>
        <div className="h-40 bg-slate-200 rounded-3xl"></div>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-emerald-600 text-white flex items-center justify-center text-4xl font-extrabold shadow-md">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
          <div className="text-center sm:text-left space-y-1">
            <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
            <p className="text-sm text-slate-500 font-medium">{user.email}</p>
            <span className="inline-block text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full mt-2">
              নিয়মিত ব্যবহারকারী
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800">অ্যাকাউন্ট তথ্য</h2>
          <div className="bg-slate-50 p-4 rounded-2xl space-y-3 border border-slate-100 text-sm">
            <div className="flex justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500">নাম:</span>
              <span className="font-semibold text-slate-800">{user.name}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500">ইমেইল:</span>
              <span className="font-semibold text-slate-800">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">স্ট্যাটাস:</span>
              <span className="font-bold text-emerald-600">সক্রিয়</span>
            </div>
          </div>
        </div>

        {/* C3. Challenge action — opens the update information form */}
        <div className="pt-2 flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-rose-50 hover:text-rose-600"
          >
            সাইন আউট
          </button>
          <Link
            href="/profile/edit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-sm text-sm transition text-center"
          >
            তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
