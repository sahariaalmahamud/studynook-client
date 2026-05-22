const AboutPage = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_30%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 inline-flex rounded-full bg-sky-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
              About StudyNook
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              A smarter way to book study spaces and workrooms.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              StudyNook helps students, freelancers, and teams discover modern workspaces, reserve rooms instantly, and manage bookings with a clean, easy-to-use interface.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-6">
              <h2 className="mb-4 text-xl font-semibold text-white">Our mission</h2>
              <p className="text-slate-400 leading-7">
                We want to make it simple to find productive environments that fit your schedule, budget, and study style.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-6">
              <h2 className="mb-4 text-xl font-semibold text-white">What we offer</h2>
              <p className="text-slate-400 leading-7">
                Browse curated rooms, check availability, and book instantly from anywhere — all while keeping your listings organized and up to date.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-6">
              <h2 className="mb-4 text-xl font-semibold text-white">Designed for students</h2>
              <p className="text-slate-400 leading-7">
                StudyNook is built for modern learners: flexible, fast, and tailored to the routines of study groups, solo learners, and remote teams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
