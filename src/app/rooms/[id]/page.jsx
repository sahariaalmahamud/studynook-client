
// import EnrollmentButton from '@/components/EnrollmentButton';
// import { auth } from '@/lib/auth';
// import BookModal from '@/components/BookModal';

import RoomBookingSection from '@/components/RoomBookingSection';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { BookOpen, Clock, BarChart, Users, Edit3, Trash2, Calendar1 } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const fetchSingleRoom = async (id) => {
    if (!id) {
        return {};
    }

    const {token} = await auth.api.getToken({
        headers: await headers()
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const bodyText = await res.text();

    if (!res.ok) {
        console.error(`Failed to fetch room ${id}:`, res.status, bodyText);
        return {};
    }

    try {
        return JSON.parse(bodyText) || {};
    } catch (error) {
        console.error(`Invalid JSON response for room ${id}:`, error, bodyText);
        return {};
    }
};

// const fetchSingleCourse = async (id, token) => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`, {
//         headers: {
//             authorization: `Bearer ${token}` || ""
//         }
//     });
//     const data = res.json();
//     return data || {};
// }

export default async function RoomDetails({ params }) {
    const { id } = await params;

    if (!id || id === 'undefined' || id === 'null') {
        return notFound();
    }

    const room = await fetchSingleRoom(id);

    const roomName = room.roomName || room.title || 'Room Details';
    const image = room.image || room.thumbnail;
    const description = room.description || room.summary || '';
    const floor = room.floor;
    const capacity = room.capacity;
    const hourlyRate = room.hourlyRate ?? room.price;
    const bookingCount = room.bookingCount ?? room.enrollCount;
    const amenities = Array.isArray(room.amenities) ? room.amenities : [];

    const stats = [
        floor != null && { icon: BarChart, label: `Floor ${floor}` },
        capacity != null && { icon: Users, label: `${capacity} seats` },
        hourlyRate != null && { icon: Clock, label: `$${hourlyRate}/hr` },
        bookingCount != null && { icon: BookOpen, label: `${bookingCount} bookings` },
    ].filter(Boolean);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl"
                    >
                        <div className="relative h-[340px] sm:h-[420px] lg:h-[500px]">
                            {image ? (
                                <Image
                                    src={image}
                                    alt={roomName}
                                    fill
                                    sizes="100vw"
                                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                                />
                            ) : (
                                <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-800 flex items-center justify-center text-slate-500 text-sm tracking-[0.18em] uppercase">
                                    Image not available
                                </div>
                            )}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.65),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.0),rgba(15,23,42,0.9))]" />
                            <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                                <div className="flex flex-wrap gap-3">
                                    {bookingCount != null && (
                                        <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-200">
                                            {bookingCount} bookings
                                        </span>
                                    )}
                                    {capacity != null && (
                                        <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-200">
                                            {capacity} seats
                                        </span>
                                    )}
                                    {floor != null && (
                                        <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-200">
                                            Floor {floor}
                                        </span>
                                    )}
                                </div>
                                <div className="max-w-3xl">
                                    <p className="text-sm uppercase tracking-[0.32em] text-slate-400 mb-3">StudyNook room</p>
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                                        {roomName}
                                    </h1>
                                    {description ? (
                                        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                                            {description}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>

                    {stats.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                            {stats.map((item, index) => (
                                <div
                                    key={index}
                                    className="group rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:border-blue-500/30"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-blue-400 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.15)]">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <p className="mt-5 text-sm uppercase tracking-[0.24em] text-slate-500">Quick fact</p>
                                    <p className="mt-3 text-lg font-semibold text-white">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {amenities.length > 0 && (
                        <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Amenities</p>
                                    <h2 className="mt-2 text-2xl font-semibold text-white">Study room features</h2>
                                </div>
                                <p className="text-sm text-slate-400">{amenities.length} available</p>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                                {amenities.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-slate-700/80 bg-white/5 px-4 py-2 text-sm text-slate-200 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <aside className="lg:col-span-1">
                    <div className="sticky top-24 rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">

                        <div className="flex flex-col gap-5">

                            <div className="flex items-start justify-between gap-4">

                                <div>
                                    <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                                        Room summary
                                    </p>

                                    {hourlyRate != null ? (
                                        <p className="mt-3 text-4xl font-black text-white">
                                            ${hourlyRate}
                                            <span className="ml-2 text-base font-medium text-slate-400">
                                                /hr
                                            </span>
                                        </p>
                                    ) : (
                                        <p className="mt-3 text-4xl font-black text-white">
                                            Pricing TBD
                                        </p>
                                    )}
                                </div>

                            </div>

                            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-5">

                                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                                    Room details
                                </p>

                                <dl className="mt-5 space-y-4 text-slate-300">

                                    {floor != null && (
                                        <div className="flex items-center justify-between gap-4 text-sm">
                                            <span className="text-slate-400">Floor</span>
                                            <span className="font-semibold text-white">
                                                {floor}
                                            </span>
                                        </div>
                                    )}

                                    {capacity != null && (
                                        <div className="flex items-center justify-between gap-4 text-sm">
                                            <span className="text-slate-400">Capacity</span>
                                            <span className="font-semibold text-white">
                                                {capacity} seats
                                            </span>
                                        </div>
                                    )}

                                    {bookingCount != null && (
                                        <div className="flex items-center justify-between gap-4 text-sm">
                                            <span className="text-slate-400">Booked</span>
                                            <span className="font-semibold text-white">
                                                {bookingCount} times
                                            </span>
                                        </div>
                                    )}

                                </dl>

                            </div>

                            {/* BOOK BUTTON */}
                            <div>
                                <RoomBookingSection room={room} />
                            </div>

                        </div>

                    </div>
                </aside>
            </div>
        </div>
    );
}


