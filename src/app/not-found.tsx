import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center text-5xl shadow-inner border border-rose-100">
        404
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-extrabold text-slate-900">পেজটি পাওয়া যায়নি</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          আপনি যে পেজ বা প্রোডাক্টটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ভুল লিংক প্রবেশ করিয়েছেন।
        </p>
      </div>

      <div>
        <Link
          href="/"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl shadow-md transition transform hover:-translate-y-0.5 text-sm"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
