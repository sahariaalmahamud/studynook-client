import Link from "next/link";
import { ArrowRight, BookOpen, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.15),transparent_28%)] pointer-events-none" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-4 py-2 text-xs uppercase tracking-[0.35em] text-sky-300 shadow-sm shadow-sky-500/10">
              <Search className="h-4 w-4 text-sky-300" />
              Page not found
            </p>

            <div className="space-y-4">
              <h1 className="text-7xl font-black tracking-tight text-white sm:text-8xl">404</h1>
              <p className="max-w-2xl text-2xl font-semibold text-slate-200 leading-tight sm:text-3xl">
                We couldn&apos;t find the page you were looking for.
              </p>
            </div>

            <p className="max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              The link may be broken, the page may have moved, or the URL may be mistyped.
              Return to a safe place and continue browsing available study rooms.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                <BookOpen className="h-5 w-5" />
                Go to Homepage
              </Link>

              <Link
                href="/rooms"
                className="inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-700 bg-slate-950/90 px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
              >
                <ArrowRight className="h-5 w-5" />
                Browse Rooms
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/40">
            <div className="grid gap-4">
              <div className="rounded-3xl bg-slate-900/70 p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Need help?</p>
                <p className="mt-3 text-base font-semibold text-white">Reach out to support if the issue persists.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                  <p className="text-sm text-slate-400">Popular pages</p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-200">
                    <li>
                      <Link href="/rooms" className="text-sky-300 hover:text-sky-200">
                        All rooms
                      </Link>
                    </li>
                    <li>
                      <Link href="/add-room" className="text-sky-300 hover:text-sky-200">
                        Add your room
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                  <p className="text-sm text-slate-400">Quick actions</p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-200">
                    <li>
                      <Link href="/my-listings" className="text-sky-300 hover:text-sky-200">
                        My listings
                      </Link>
                    </li>
                    <li>
                      <Link href="/my-bookings" className="text-sky-300 hover:text-sky-200">
                        My bookings
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
