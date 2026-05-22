export default function MyBookingsLoading() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/90 p-10 text-center shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="mx-auto mb-8 h-20 w-20 rounded-full border-4 border-slate-800 border-t-sky-400 animate-spin" />
        <h2 className="text-3xl font-bold text-white">Loading your bookings...</h2>
        <p className="mt-4 text-slate-400">Fetching reservation details from your account.</p>
      </div>
    </div>
  );
}
