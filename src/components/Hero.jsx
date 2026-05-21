"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  BookOpen,
  Users,
  Star,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Wifi,
} from "lucide-react";

/* FLOATING BLUR */
const FloatingBlob = ({
  delay = 0,
  size = "w-[420px] h-[420px]",
  top = "10%",
  left = "-5%",
}) => {
  return (
    <motion.div
      className={`absolute ${size} rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-400/10 blur-3xl`}
      style={{ top, left }}
      animate={{
        x: [0, 40, 0],
        y: [0, 30, 0],
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

/* STATS CARD */
const StatCard = ({
  icon: Icon,
  label,
  value,
  delay,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay,
        duration: 0.7,
      }}
      whileHover={{
        y: -5,
      }}
      className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.07]"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
          <Icon className="h-6 w-6 text-white" />
        </div>

        <div>
          <p className="text-sm text-slate-400">
            {label}
          </p>

          <h3 className="text-2xl font-black text-white">
            {value}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020617]">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_35%)]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* FLOATING BLOBS */}
      <FloatingBlob
        delay={0}
        top="5%"
        left="-10%"
      />

      <FloatingBlob
        delay={1}
        top="55%"
        left="70%"
        size="w-[350px] h-[350px]"
      />

      <FloatingBlob
        delay={2}
        top="20%"
        left="65%"
        size="w-[280px] h-[280px]"
      />

      {/* MAIN */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 py-28 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >
            {/* BADGE */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.2,
              }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-5 py-3 backdrop-blur-xl"
            >
              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />

              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-sm font-semibold text-transparent">
                Quiet • Smart • Productive
              </span>
            </motion.div>

            {/* TITLE */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.8,
              }}
              className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Discover Your
              <span className="mt-3 block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Dream Study Space
              </span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
              }}
              className="mt-8 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl"
            >
              Book modern, peaceful,
              and fully-equipped study
              rooms for deep focus,
              team collaboration, and
              productive learning.
            </motion.p>

            {/* FEATURES */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.7,
              }}
              className="mt-8 flex flex-wrap gap-4"
            >
              {[
                {
                  icon: Wifi,
                  text: "Fast Wi-Fi",
                },
                {
                  icon: ShieldCheck,
                  text: "Private Rooms",
                },
                {
                  icon: Sparkles,
                  text: "Modern Setup",
                },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl"
                  >
                    <Icon className="h-5 w-5 text-blue-400" />

                    <span className="text-sm font-medium text-slate-200">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.8,
              }}
              className="mt-12 flex flex-col gap-5 sm:flex-row"
            >
              <motion.div
                whileHover={{
                  scale: 1.04,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <Link
                  href="/rooms"
                  className="group inline-flex h-16 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 px-8 text-lg font-bold text-white shadow-2xl shadow-blue-500/20 transition-all"
                >
                  <BookOpen className="h-5 w-5" />

                  Explore Rooms

                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.04,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <Link
                  href="/add-room"
                  className="inline-flex h-16 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-8 text-lg font-semibold text-white backdrop-blur-xl transition-all hover:border-blue-500/30 hover:bg-white/[0.08]"
                >
                  <Users className="h-5 w-5 text-blue-400" />
                  List Your Room
                </Link>
              </motion.div>
            </motion.div>

            {/* STATS */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1,
              }}
              className="mt-14 grid gap-5 sm:grid-cols-3"
            >
              <StatCard
                icon={BookOpen}
                label="Study Rooms"
                value="120+"
                delay={1}
              />

              <StatCard
                icon={Users}
                label="Active Users"
                value="8K+"
                delay={1.1}
              />

              <StatCard
                icon={Star}
                label="Rating"
                value="4.9"
                delay={1.2}
              />
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
            }}
            className="relative hidden lg:block"
          >
            {/* MAIN CARD */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-8 shadow-2xl backdrop-blur-2xl"
            >
              {/* TOP LIGHT */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400" />

              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-[2rem]">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop"
                  alt="study room"
                  className="h-[540px] w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
              </div>

              {/* FLOAT CARD */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute bottom-10 left-10 rounded-3xl border border-white/10 bg-[#0f172a]/80 p-5 backdrop-blur-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500">
                    <Sparkles className="h-7 w-7 text-white" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Premium Workspace
                    </h3>

                    <p className="text-sm text-slate-400">
                      Comfortable • Quiet
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* SMALL FLOATING CARD */}
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute -right-8 top-20 rounded-3xl border border-white/10 bg-[#0f172a]/80 p-5 backdrop-blur-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Available Today
                  </p>

                  <h3 className="text-xl font-black text-white">
                    24 Rooms
                  </h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020617] to-transparent" />
    </section>
  );
}