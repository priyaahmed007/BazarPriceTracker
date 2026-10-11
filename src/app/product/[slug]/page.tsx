"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { fetchSingleProduct } from "@/lib/api";
import { Product, toBengaliNumber } from "@/lib/data";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    // Protected route: without a real Better Auth session the visitor is sent
    // back to sign in and returned here afterwards via `?redirect=`.
    if (!user) {
      toast.error("পণ্যের বিস্তারিত দেখতে অনুগ্রহ করে আগে সাইন ইন করুন!");
      router.replace(`/signin?redirect=${encodeURIComponent(`/product/${slug}`)}`);
      return;
    }

    let cancelled = false;

    async function loadProduct() {
      setLoading(true);
      const data = await fetchSingleProduct(slug);
      if (!cancelled) {
        setProduct(data);
        setLoading(false);
      }
    }

    loadProduct();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading, slug, router]);

  if (authLoading || (user && loading)) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-6 animate-pulse">
        <div className="h-9 w-40 bg-slate-200 rounded-lg"></div>
        <div className="h-44 bg-slate-200 rounded-3xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-24 bg-slate-200 rounded-2xl"></div>
          <div className="h-24 bg-slate-200 rounded-2xl"></div>
          <div className="h-24 bg-slate-200 rounded-2xl"></div>
        </div>
        <div className="h-64 bg-slate-200 rounded-3xl"></div>
      </div>
    );
  }

  if (!user) return null;

  if (!product) {
    return (
      <div className="text-center py-16 space-y-4">
        <span className="text-6xl">🔍</span>
        <h2 className="text-2xl font-bold text-slate-800">পণ্যটি পাওয়া যায়নি</h2>
        <p className="text-slate-600">আপনার অনুসন্ধান করা পণ্যটির কোনো তথ্য মেলেনি।</p>
        <Link
          href="/"
          className="inline-block bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-lg border border-emerald-200 transition"
      >
        ← হোম পেজে ফিরে যান
      </Link>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
            {product.emoji}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                {product.category_name}
              </span>
              <span className="text-xs text-slate-500 font-medium">{product.unit}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {product.name}
            </h1>
            <p className="text-sm text-slate-600">
              {product.description ||
                "নিত্যপ্রয়োজনীয় পণ্যটির সর্বশেষ দরদাম, দাম বাড়া-কমার ধারা এবং বাজারভিত্তিক মূল্য।"}
            </p>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-4 rounded-2xl text-center min-w-[160px] w-full md:w-auto">
          <span className="text-xs text-slate-400 block mb-1">আজকের নির্ধারিত দাম</span>
          <span className="text-3xl font-extrabold text-emerald-400">
            {toBengaliNumber(product.price)}{" "}
            <span className="text-sm font-normal text-white">টাকা</span>
          </span>
          <span
            className={`mt-2 inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-bold ${
              product.is_rising ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/20 text-emerald-300"
            }`}
          >
            {product.is_rising ? "▲" : "▼"} {toBengaliNumber(Math.abs(product.change))}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
          <span className="text-xs font-bold text-emerald-700 block mb-1">সর্বনিম্ন দাম</span>
          <span className="text-2xl font-extrabold text-emerald-900">
            {toBengaliNumber(product.min_price)} টাকা
          </span>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center">
          <span className="text-xs font-bold text-rose-700 block mb-1">সর্বোচ্চ দাম</span>
          <span className="text-2xl font-extrabold text-rose-900">
            {toBengaliNumber(product.max_price)} টাকা
          </span>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 text-center">
          <span className="text-xs font-bold text-sky-700 block mb-1">গড় দাম</span>
          <span className="text-2xl font-extrabold text-sky-900">
            {toBengaliNumber(product.avg_price)} টাকা
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
          <span>🏪</span> বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase">
                <th className="py-3 px-4">বাজারের নাম</th>
                <th className="py-3 px-4">পণ্যের নাম</th>
                <th className="py-3 px-4">একক</th>
                <th className="py-3 px-4 text-right">আজকের দর (টাকা)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium">
              {product.bazars && product.bazars.length > 0 ? (
                product.bazars.map((bazar) => (
                  <tr key={bazar.name} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      <span className="text-emerald-600">📍</span> {bazar.name}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{product.name}</td>
                    <td className="py-3 px-4 text-slate-500">{product.unit}</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">
                      {toBengaliNumber(bazar.price)} ৳
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-slate-400">
                    বাজার তথ্য উপলব্ধ নয়
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
