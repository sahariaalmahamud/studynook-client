export default function RoomDetailsLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-6xl rounded-[2rem] border border-white/10 bg-slate-900/90 p-10 text-center shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="mx-auto mb-8 h-20 w-20 rounded-full border-4 border-slate-800 border-t-sky-400 animate-spin" />
        <h2 className="text-3xl font-bold text-white">Loading room details...</h2>
        <p className="mt-4 text-slate-400">Please wait while we fetch the latest room information for you.</p>
      </div>
    </div>
  );
}
