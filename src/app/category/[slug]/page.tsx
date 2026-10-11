"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import { fetchProducts } from "@/lib/api";
import { Product, CATEGORIES_DATA } from "@/lib/data";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<string>("default");

  const category = CATEGORIES_DATA.find((c) => c.slug === slug);

  useEffect(() => {
    async function loadCategoryProducts() {
      setLoading(true);
      const data = await fetchProducts(slug);
      setProducts(data);
      setLoading(false);
    }
    loadCategoryProducts();
  }, [slug]);

  // Challenge C1: Sort control supporting Bengali numbers / numeric values
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "low-to-high") {
      return a.price - b.price;
    }
    if (sortOption === "high-to-low") {
      return b.price - a.price;
    }
    return 0; // default order
  });

  // Empty state handling
  if (!loading && (!category || products.length === 0)) {
    return (
      <div className="text-center py-20 space-y-5 max-w-md mx-auto">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
          ⚠️
        </div>
        <h2 className="text-2xl font-bold text-slate-800">ক্যাটাগরি পাওয়া যায়নি</h2>
        <p className="text-slate-600 text-sm">
          আপনার নির্বাচন করা ক্যাটাগরিতে এই মুহূর্তে কোনো তথ্য নেই অথবা লিঙ্কটি সঠিক নয়।
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl shadow transition"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      {/* Category Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
            {category?.icon || "🛒"}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {category?.name || slug} এর বাজার দর
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {category?.description || "সর্বশেষ হালনাগাদকৃত বাজার মূল্য তালিকা"}
            </p>
          </div>
        </div>

        {/* C1. Sort Dropdown Control */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <label htmlFor="sort" className="text-sm font-semibold text-slate-700">
            সাজান:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl px-3.5 py-2 font-medium focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product Cards List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
