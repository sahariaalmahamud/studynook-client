import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

import {
  BookOpen,
  Phone,
  MailIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-slate-200">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_30%)]" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* TOP */}
        <div className="grid gap-14 lg:grid-cols-[1.5fr_repeat(2,1fr)]">
          {/* BRAND */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-4"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-blue-500 blur-xl opacity-30 transition-opacity group-hover:opacity-50" />

                <div className="relative flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-2xl shadow-blue-500/30">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-black tracking-tight text-white">
                  StudyNook
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Smart workspace booking platform.
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md leading-relaxed text-slate-400">
              Discover modern study rooms, productive workspaces,
              and peaceful environments designed for students,
              freelancers, and teams.
            </p>
          </div>

          {/* USEFUL LINKS */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
              Useful Links
            </h3>

            <ul className="space-y-4">
              {[
                {
                  name: "Home",
                  path: "/",
                },

                {
                  name: "Rooms",
                  path: "/rooms",
                },

                {
                  name: "About",
                  path: "/about",
                },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="group inline-flex items-center gap-2 text-slate-300 transition-all duration-300 hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-600 transition-all group-hover:w-3 group-hover:bg-blue-400" />

                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
              Contact
            </h3>

            <div className="space-y-5">
              {/* EMAIL */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                  <MailIcon className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Email
                  </p>

                  <a
                    href="mailto:support@studynook.com"
                    className="text-white transition hover:text-blue-400"
                  >
                    support@studynook.com
                  </a>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
                  <Phone className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Phone
                  </p>

                  <a
                    href="tel:+880123456789"
                    className="text-white transition hover:text-purple-400"
                  >
                    +880 1234-567890
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          {/* COPYRIGHT */}
          <div>
            <p className="text-sm text-slate-500">
              © 2026 StudyNook. All rights reserved.
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Built for students, creators & productive teams.
            </p>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-3">
            {[
              {
                icon: FaFacebookF,
                href: "https://www.facebook.com/s.a.mahamud.fullstackdeveloper",
              },

              {
                icon: FaLinkedinIn,
                href: "https://www.linkedin.com/in/saharia-al-mahamud",
              },

              {
                icon: FaInstagram,
                href: "/",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </a>
              );
            })}

            {/* X ICON */}
            <a
              href="https://x.com/saharia_bd"
              target="_blank"
              rel="noreferrer"
              className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M18.244 2H21l-6.56 7.497L22 22h-6.828l-5.348-6.985L3.707 22H1l7.02-8.02L2 2h7l4.836 6.35L18.244 2Zm-1.197 18h1.885L7.976 3.896H5.954L17.047 20Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;