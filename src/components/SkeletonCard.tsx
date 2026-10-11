export default function SkeletonCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm animate-pulse flex flex-col justify-between h-52">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-14 h-14 bg-slate-200 rounded-2xl"></div>
          <div className="w-16 h-5 bg-slate-200 rounded-full"></div>
        </div>
        <div className="w-3/4 h-6 bg-slate-200 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-slate-100 rounded"></div>
      </div>
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="w-24 h-6 bg-slate-200 rounded"></div>
        <div className="w-16 h-6 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
}
