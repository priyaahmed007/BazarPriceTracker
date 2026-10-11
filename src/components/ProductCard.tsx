import Link from "next/link";
import { Product, toBengaliNumber } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isRising = product.is_rising;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        {/* Emoji Icon and Category */}
        <div className="flex items-center justify-between mb-3">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            {product.emoji}
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
            {product.category_name}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors mb-1">
          {product.name}
        </h3>

        {/* Unit */}
        <p className="text-xs text-slate-500 font-medium mb-4">{product.unit}</p>
      </div>

      {/* Price Row */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-600 block">আজকের দাম</span>
          <span className="text-xl font-extrabold text-slate-900">
            {toBengaliNumber(product.price)} <span className="text-sm font-medium text-slate-600">টাকা</span>
          </span>
        </div>

        {/* Change Badge */}
        <div
          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
            isRising
              ? "bg-rose-50 text-rose-700 border border-rose-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}
        >
          <span>{isRising ? "▲" : "▼"}</span>
          <span>{toBengaliNumber(Math.abs(product.change))}%</span>
        </div>
      </div>
    </Link>
  );
}
