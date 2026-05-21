import { Star, Users, MessageCircle } from "lucide-react";

const trustItems = [
  {
    icon: Star,
    stat: "4.9/5",
    label: "Average rating",
  },
  {
    icon: Users,
    stat: "2,300+",
    label: "Happy students",
  },
  {
    icon: MessageCircle,
    stat: "24/7",
    label: "Support available",
  },
];

const HomeTrust = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] items-center">
          <div>
            <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-sm">Trusted by learners</p>
            <h2 className="mt-4 text-4xl font-extrabold text-slate-900 sm:text-5xl">Built for students who want focus and flexibility</h2>
            <p className="mt-6 text-slate-500 max-w-xl leading-8">
              StudyNook gives you the tools to book private rooms faster, stay organized, and enjoy a calm study environment without the hassle.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-extrabold text-slate-900">{item.stat}</p>
                  <p className="text-sm text-slate-500 mt-2">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTrust;
