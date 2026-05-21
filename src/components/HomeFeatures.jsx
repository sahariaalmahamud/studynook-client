import { Globe, ShieldCheck, Clock3 } from "lucide-react";

const featureItems = [
  {
    icon: Globe,
    title: "Instant room discovery",
    description: "Search and book the right study space in seconds with live availability and smart filters.",
  },
  {
    icon: Clock3,
    title: "Flexible booking windows",
    description: "Choose the exact hours you need and only pay for the time you use.",
  },
  {
    icon: ShieldCheck,
    title: "Secure payment experience",
    description: "Protected transactions and verified hosts make every booking safe and reliable.",
  },
];

const HomeFeatures = () => {
  return (
    <section className="py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-sm">Why choose StudyNook</p>
          <h2 className="mt-4 text-4xl font-extrabold text-slate-900 sm:text-5xl">Study room booking made effortless</h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Enjoy a smarter way to reserve private study spaces, manage bookings, and stay focused in quiet, comfortable environments.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featureItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:border-blue-200">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-purple-500 text-white mb-6 shadow-xl shadow-blue-500/10">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-7">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
