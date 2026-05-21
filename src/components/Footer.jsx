import Link from "next/link";
import { BookOpen, Mail, ShieldCheck, MapPin, Globe, Share2, Users, Clock3 } from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-slate-200">
    {/* Background Effects */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_30%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* TOP SECTION */}
        <div className="grid gap-14 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
            {/* Brand */}
            <div className="space-y-7">
                <Link href="/" className="inline-flex items-center gap-4 group">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-3xl bg-blue-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />

                        <div className="relative flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-2xl shadow-blue-500/30">
                            <BookOpen className="h-6 w-6 text-white" />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-white">
                            StudyNook
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Smart & peaceful study room booking platform.
                        </p>
                    </div>
                </Link>

                <p className="max-w-md leading-relaxed text-slate-400">
                    Discover modern study spaces, private work areas, and
                    collaborative rooms designed to help students and teams stay
                    productive anytime, anywhere.
                </p>

                {/* Contact Card */}
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
                            <Mail className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-sm text-slate-400">
                                Need support?
                            </p>

                            <a
                                href="mailto:support@studynook.com"
                                className="mt-1 inline-block text-base font-semibold text-white hover:text-blue-400 transition-colors"
                            >
                                support@studynook.com
                            </a>

                            <p className="mt-2 text-sm text-slate-500">
                                We usually respond within a few hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Links Wrapper */}
            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
                {/* Explore */}
                <div>
                    <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
                        Explore
                    </h3>

                    <ul className="space-y-4">
                        {[
                            { name: "Browse Rooms", path: "/rooms" },
                            { name: "Add Room", path: "/add-room" },
                            { name: "My Listings", path: "/my-listings" },
                            { name: "My Bookings", path: "/my-bookings" },
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

                {/* Support */}
                <div>
                    <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
                        Support
                    </h3>

                    <ul className="space-y-4">
                        {[
                            "Privacy Policy",
                            "Terms & Conditions",
                            "Help Center",
                            "Contact Support",
                        ].map((item) => (
                            <li key={item}>
                                <a
                                    href="#"
                                    className="group inline-flex items-center gap-2 text-slate-300 transition-all duration-300 hover:text-white"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-slate-600 transition-all group-hover:w-3 group-hover:bg-purple-400" />
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Features */}
                <div>
                    <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
                        Why Choose Us
                    </h3>

                    <div className="space-y-5">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 rounded-xl bg-blue-500/10 p-2 text-blue-400">
                                <MapPin className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="font-medium text-white">
                                    Flexible Access
                                </p>
                                <p className="text-sm text-slate-400">
                                    Book study rooms from anywhere anytime.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="mt-1 rounded-xl bg-emerald-500/10 p-2 text-emerald-400">
                                <ShieldCheck className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="font-medium text-white">
                                    Safe Booking
                                </p>
                                <p className="text-sm text-slate-400">
                                    Secure reservations and trusted room owners.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="mt-1 rounded-xl bg-purple-500/10 p-2 text-purple-400">
                                <Clock3 className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="font-medium text-white">
                                    Instant Availability
                                </p>
                                <p className="text-sm text-slate-400">
                                    Real-time room schedules and quick booking.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
            <div>
                <p className="text-sm text-slate-500">
                    © 2026 StudyNook Inc. All rights reserved.
                </p>

                <p className="mt-1 text-xs text-slate-600">
                    Built for students, creators & productive teams.
                </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
                {[
                    { icon: Globe },
                    { icon: Share2 },
                    { icon: Users },
                ].map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <a
                            key={index}
                            href="#"
                            className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
                        >
                            <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                        </a>
                    );
                })}
            </div>
        </div>
    </div>
</footer>
    );
};

export default Footer;
