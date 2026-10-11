export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16 py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-2xl">🛒</span>
            <span className="text-xl font-bold text-white">বাজার দর</span>
          </div>
          <p className="text-sm text-slate-400">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        {/* Right Side */}
        <div className="text-center md:text-right text-xs text-slate-400 max-w-md">
          <p>
            “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
          </p>
          <p className="mt-2 text-slate-500">
            © ২০২৬ বাজার দর |
          </p>
        </div>
      </div>
    </footer>
  );
}
