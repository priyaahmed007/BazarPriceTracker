"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PRODUCTS_DATA, toBengaliNumber } from "@/lib/data";

const CATEGORIES = [
  { slug: "all", name: "সব পণ্য" },
  { slug: "chal", name: "চাল" },
  { slug: "sobji", name: "সবজি" },
  { slug: "mach-mangsho", name: "মাছ ও মাংস" },
  { slug: "dhim-tel", name: "ডিম ও তেল" },
  { slug: "mosla", name: "মসলা" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [formattedDate, setFormattedDate] = useState("");

  const handleLogout = useCallback(async () => {
    await logout();
    router.push("/");
    router.refresh();
  }, [logout, router]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const today = new Date();
      const dateStr = new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(today);
      setFormattedDate(dateStr);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-emerald-100 shadow-sm">
      {/* Top Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Left Logo & Date */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-2xl">🛒</span>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-1.5">
              বাজার দর
            </h1>
            <p className="text-xs text-emerald-700 font-medium h-4">
              {formattedDate}
            </p>
          </div>
        </Link>

        {/* Right Auth Buttons / User Profile */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="h-9 w-24 rounded-lg bg-slate-100 animate-pulse" aria-hidden="true" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition"
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                <span className="text-sm font-semibold text-slate-800 hidden sm:inline">
                  {user.name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-medium px-3.5 py-1.5 rounded-lg text-sm transition"
              >
                সাইন আউট
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="text-slate-700 hover:text-emerald-600 font-semibold px-3 py-1.5 text-sm rounded-lg hover:bg-slate-50 transition"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-1.5 rounded-lg text-sm shadow-sm transition"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Middle Category Nav */}
      <nav className="bg-slate-50 border-t border-slate-200/60 overflow-x-auto scrollbar-none">
        <div className="max-w-6xl mx-auto px-4 flex items-center space-x-1 py-1.5 text-sm">
          {CATEGORIES.map((cat) => {
            const href = cat.slug === "all" ? "/#সব-পণ্য" : `/category/${cat.slug}`;
            const isActive =
              cat.slug !== "all" && pathname.startsWith(`/category/${cat.slug}`);

            return (
              <Link
                key={cat.slug}
                href={href}
                className={`px-3.5 py-1.5 rounded-md whitespace-nowrap transition-colors font-medium ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Infinite Price Ticker Marquee */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 overflow-hidden shadow-inner">
        <div className="animate-marquee whitespace-nowrap flex items-center space-x-6">
          {[...PRODUCTS_DATA, ...PRODUCTS_DATA].map((item, idx) => {
            const isRising = item.is_rising;
            return (
              <div key={idx} className="inline-flex items-center space-x-1.5 px-2">
                <span>{item.emoji}</span>
                <span className="font-semibold text-white">{item.name}:</span>
                <span>{toBengaliNumber(item.price)} টাকা/{item.unit.replace("প্রতি ", "")}</span>
                <span
                  className={`px-1 rounded text-[10px] font-bold ${
                    isRising ? "bg-emerald-700 text-emerald-200" : "bg-rose-800 text-rose-200"
                  }`}
                >
                  {isRising ? "▲" : "▼"} {toBengaliNumber(Math.abs(item.change))}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
