"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import {
    BookOpen,
    Menu,
    X,
    User,
    LogOut,
    LayoutDashboard,
    PlusCircle,
    CalendarCheck,
    Building2,
    Sparkles,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export function MainNavbar() {
    const [isMenuOpen, setIsMenuOpen] =
        useState(false);

    const [scrolled, setScrolled] =
        useState(false);

    const [profileOpen, setProfileOpen] =
        useState(false);

    const { data: session, isPending } =
        authClient.useSession();

    // SCROLL EFFECT
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );
    }, []);

    // CLOSE MOBILE MENU
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener(
            "resize",
            handleResize
        );

        return () =>
            window.removeEventListener(
                "resize",
                handleResize
            );
    }, []);

    // CLOSE DROPDOWN OUTSIDE CLICK
    useEffect(() => {
        const close = () =>
            setProfileOpen(false);

        window.addEventListener(
            "click",
            close
        );

        return () =>
            window.removeEventListener(
                "click",
                close
            );
    }, []);

    // LOGOUT
    const handleLogOut = async () => {
        const { error } =
            await authClient.signOut({
                callbackURL: "/",
            });

        if (error) {
            toast.error(
                error.message ||
                "Logout failed"
            );

            return;
        }

        toast.success(
            "Logged out successfully"
        );
    };

    // NAV LINKS
    const navLinks = [
        {
            href: "/",
            label: "Home",
        },
        {
            href: "/rooms",
            label: "Rooms",
        },
        {
            href: "/add-room",
            label: "Add Room",
        },
        {
            href: "/my-listings",
            label: "My Listings",
        },
        {
            href: "/my-bookings",
            label: "My Bookings",
        },
    ];

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-500 before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:bg-gradient-to-r before:from-transparent before:via-sky-500/30 before:to-transparent ${scrolled
                    ? "bg-slate-950/95 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.45)] border-b border-slate-800/60"
                    : "bg-slate-950/75 backdrop-blur-xl"
                }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-[88px] items-center justify-between">
                    {/* LOGO */}
                    <Link
                        href="/"
                        className="group flex items-center gap-3"
                    >
                        <motion.div
                            whileHover={{
                                rotate: 10,
                                scale: 1.05,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 shadow-[0_10px_40px_rgba(14,165,233,0.35)]"
                        >
                            <BookOpen className="h-6 w-6 text-white" />
                        </motion.div>

                        <div>
                            <h2 className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-2xl font-black tracking-tight text-transparent">
                                StudyNook
                            </h2>

                            <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-slate-500">
                                Workspace
                            </p>
                        </div>
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav className="hidden items-center gap-2 lg:flex">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-full px-5 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:bg-sky-500/10 hover:text-white hover:shadow-lg hover:shadow-sky-500/10"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* RIGHT SIDE */}
                    <div className="hidden items-center gap-4 md:flex">
                        {!isPending &&
                            !session ? (
                            <>
                                {/* LOGIN */}
                                <Link
                                    href="/login"
                                    className="rounded-full border border-slate-700/50 bg-slate-950/80 px-5 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-sky-500/40 hover:bg-slate-900/80 hover:text-white"
                                >
                                    Login
                                </Link>

                                {/* REGISTER */}
                                <Link
                                    href="/register"
                                    className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-bold text-white shadow-[0_10px_40px_rgba(14,165,233,0.35)] transition-all duration-300 hover:scale-105 hover:bg-sky-400 hover:shadow-[0_15px_50px_rgba(14,165,233,0.4)]"
                                >
                                    <Sparkles className="h-4 w-4" />
                                    Join Free
                                </Link>
                            </>
                        ) : (
                            <div
                                className="relative"
                                onClick={(e) =>
                                    e.stopPropagation()
                                }
                            >
                                {/* PROFILE BUTTON */}
                                <button
                                    onClick={() =>
                                        setProfileOpen(
                                            !profileOpen
                                        )
                                    }
                                    className="group flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-950/80 px-3 py-2 transition-all duration-300 hover:border-sky-500/30 hover:bg-slate-900/80"
                                >
                                    <Image
                                        src={
                                            session?.user
                                                ?.image ||
                                            "https://i.ibb.co/4pDNDk1/avatar.png"
                                        }
                                        alt="user"
                                        width={44}
                                        height={44}
                                        className="h-11 w-11 rounded-full object-cover ring-2 ring-sky-500/20"
                                    />

                                    <div className="hidden text-left lg:block">
                                        <h3 className="max-w-28 truncate text-sm font-bold text-white">
                                            {
                                                session?.user
                                                    ?.name
                                            }
                                        </h3>

                                        <p className="text-xs text-slate-400">
                                            Workspace Owner
                                        </p>
                                    </div>
                                </button>

                                {/* DROPDOWN */}
                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 15,
                                                scale: 0.95,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 10,
                                                scale: 0.95,
                                            }}
                                            transition={{
                                                duration: 0.2,
                                            }}
                                            className="absolute right-0 top-16 w-72 overflow-hidden rounded-[2rem] border border-slate-700/60 bg-slate-950/95 shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
                                        >
                                            {/* TOP */}
                                            <div className="border-b border-white/10 p-5">
                                                <div className="flex items-center gap-4">
                                                    <Image
                                                        src={
                                                            session
                                                                ?.user
                                                                ?.image ||
                                                            "https://i.ibb.co/4pDNDk1/avatar.png"
                                                        }
                                                        alt="user"
                                                        width={50}
                                                        height={50}
                                                        className="rounded-full object-cover"
                                                    />

                                                    <div>
                                                        <h3 className="font-bold text-white">
                                                            {
                                                                session
                                                                    ?.user
                                                                    ?.name
                                                            }
                                                        </h3>

                                                        <p className="max-w-40 truncate text-sm text-slate-400">
                                                            {
                                                                session
                                                                    ?.user
                                                                    ?.email
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* LINKS */}
                                            <div className="p-3">
                                                <Link
                                                    href="/dashboard"
                                                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition-all duration-300 hover:bg-slate-900/70 hover:text-white"
                                                >
                                                    <LayoutDashboard className="h-5 w-5 text-sky-400" />
                                                    Dashboard
                                                </Link>

                                                <Link
                                                    href="/add-room"
                                                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition-all duration-300 hover:bg-slate-900/70 hover:text-white"
                                                >
                                                    <PlusCircle className="h-5 w-5 text-emerald-400" />
                                                    Add Room
                                                </Link>

                                                <Link
                                                    href="/my-listings"
                                                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition-all duration-300 hover:bg-slate-900/70 hover:text-white"
                                                >
                                                    <Building2 className="h-5 w-5 text-violet-400" />
                                                    My Listings
                                                </Link>

                                                <Link
                                                    href="/my-bookings"
                                                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition-all duration-300 hover:bg-slate-900/70 hover:text-white"
                                                >
                                                    <CalendarCheck className="h-5 w-5 text-yellow-400" />
                                                    My Bookings
                                                </Link>

                                                <Link
                                                    href="/settings"
                                                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition-all duration-300 hover:bg-slate-900/70 hover:text-white"
                                                >
                                                    <User className="h-5 w-5 text-pink-400" />
                                                    Settings
                                                </Link>

                                                {/* LOGOUT */}
                                                <button
                                                    onClick={
                                                        handleLogOut
                                                    }
                                                    className="mt-2 flex w-full items-center gap-3 rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition-all duration-300 hover:bg-red-500/20"
                                                >
                                                    <LogOut className="h-5 w-5" />
                                                    Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() =>
                            setIsMenuOpen(
                                !isMenuOpen
                            )
                        }
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700/50 bg-slate-950/80 text-white transition-all duration-300 hover:bg-slate-900/80 md:hidden"
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -20,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="border-t border-slate-700/60 bg-slate-950/95 px-4 pb-8 pt-5 backdrop-blur-3xl md:hidden"
                    >
                        {/* USER */}
                        {session && (
                            <div className="mb-6 flex items-center gap-4 rounded-[2rem] border border-slate-700/50 bg-slate-900/95 p-4 shadow-xl shadow-slate-950/40">
                                <Image
                                    src={
                                        session?.user
                                            ?.image ||
                                        "https://i.ibb.co/4pDNDk1/avatar.png"
                                    }
                                    alt="user"
                                    width={55}
                                    height={55}
                                    className="rounded-full object-cover"
                                />

                                <div>
                                    <h3 className="font-bold text-white">
                                        {
                                            session?.user
                                                ?.name
                                        }
                                    </h3>

                                    <p className="max-w-44 truncate text-sm text-slate-400">
                                        {
                                            session?.user
                                                ?.email
                                        }
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* NAV LINKS */}
                        <div className="space-y-3">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() =>
                                        setIsMenuOpen(
                                            false
                                        )
                                    }
                                    className="flex items-center rounded-2xl border border-slate-700/50 bg-slate-950/80 px-5 py-4 text-base font-semibold text-slate-100 transition-all duration-300 hover:border-sky-500/20 hover:bg-slate-900/80"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* AUTH */}
                        {!session ? (
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <Link
                                    href="/login"
                                    className="flex items-center justify-center rounded-2xl border border-slate-700/50 bg-slate-950/80 px-5 py-4 font-semibold text-white transition-all duration-300 hover:bg-slate-900/80"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="flex items-center justify-center rounded-2xl bg-sky-500 px-5 py-4 font-bold text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:bg-sky-400"
                                >
                                    Join Free
                                </Link>
                            </div>
                        ) : (
                            <button
                                onClick={
                                    handleLogOut
                                }
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500/10 px-5 py-4 font-semibold text-red-400 transition-all duration-300 hover:bg-red-500/20"
                            >
                                <LogOut className="h-5 w-5" />
                                Logout
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}