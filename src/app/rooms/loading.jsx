export default function RoomsLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-6xl space-y-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="h-8 w-1/3 animate-pulse rounded-full bg-slate-800" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl"
            >
              <div className="h-64 w-full animate-pulse rounded-[1.5rem] bg-slate-800" />
              <div className="mt-6 space-y-4">
                <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-800" />
                <div className="h-4 w-1/2 animate-pulse rounded-full bg-slate-800" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="h-10 animate-pulse rounded-2xl bg-slate-800" />
                  <div className="h-10 animate-pulse rounded-2xl bg-slate-800" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
