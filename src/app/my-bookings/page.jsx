"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  CalendarDays,
  Clock3,
  DollarSign,
  BadgeCheck,
  X,
  Search,
  Calendar,
  TimerReset,
  LayoutGrid,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const MyBookingsPage = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // FETCH BOOKINGS
  useEffect(() => {
    if (!user?.id) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bookings/${user?.id}`
        );

        const data = await response.json();

        setBookings(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.id]);

  // FILTERED BOOKINGS
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) =>
      booking.roomName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [bookings, search]);

  // STATS
  const activeBookings = bookings.filter(
    (booking) => booking.status !== "cancelled"
  );

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "cancelled"
  );

  const totalSpent = activeBookings.reduce(
    (acc, booking) => acc + Number(booking.totalCost || 0),
    0
  );

  // CANCEL BOOKING
  const handleCancel = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}/cancel`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: user?.id,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Booking cancelled");

        const updatedBookings = bookings.map((booking) => {
          if (booking._id === id) {
            return {
              ...booking,
              status: "cancelled",
            };
          }

          return booking;
        });

        setBookings(updatedBookings);

        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <section className="min-h-screen bg-[#020617]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-400">
              Workspace Reservations
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-white">
              My Bookings
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Manage your room reservations, monitor booking
              activity, and cancel bookings when needed.
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              placeholder="Search room..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-14 w-full rounded-2xl border border-white/10 bg-slate-900 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {/* CARD */}
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  Total Bookings
                </p>

                <h2 className="mt-3 text-4xl font-black text-white">
                  {bookings.length}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10">
                <LayoutGrid className="h-6 w-6 text-sky-400" />
              </div>
            </div>
          </div>

          {/* ACTIVE */}
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  Active
                </p>

                <h2 className="mt-3 text-4xl font-black text-white">
                  {activeBookings.length}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                <BadgeCheck className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* CANCELLED */}
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  Cancelled
                </p>

                <h2 className="mt-3 text-4xl font-black text-white">
                  {cancelledBookings.length}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
                <TimerReset className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </div>

          {/* TOTAL SPENT */}
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  Total Spent
                </p>

                <h2 className="mt-3 text-4xl font-black text-white">
                  ${totalSpent}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10">
                <DollarSign className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-20 flex justify-center">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-700 border-t-sky-400" />
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredBookings.length === 0 && (
          <div className="mt-20 rounded-[2rem] border border-dashed border-white/10 bg-slate-900/50 p-16 text-center">
            <h2 className="text-3xl font-black text-white">
              No Bookings Found
            </h2>

            <p className="mt-4 text-slate-400">
              You haven’t booked any workspace yet.
            </p>
          </div>
        )}

        {/* BOOKINGS GRID */}
        {!loading && filteredBookings.length > 0 && (
          <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {filteredBookings.map((booking) => (
              <motion.div
                key={booking._id}
                layout
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70"
              >
                {/* IMAGE */}
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={booking.image}
                    alt={booking.roomName}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* STATUS */}
                  <div className="absolute left-4 top-4">
                    {booking.status === "cancelled" ? (
                      <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300 backdrop-blur-md">
                        Cancelled
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                        Confirmed
                      </span>
                    )}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {booking.roomName}
                      </h2>

                      <p className="mt-2 text-sm text-slate-400">
                        Premium workspace reservation
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-950 px-4 py-3 text-center">
                      <p className="text-xs text-slate-500">
                        Total
                      </p>

                      <p className="mt-1 text-lg font-bold text-white">
                        ${booking.totalCost}
                      </p>
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-4 w-4 text-sky-400" />

                      <p className="text-sm text-slate-300">
                        {booking.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock3 className="h-4 w-4 text-sky-400" />

                      <p className="text-sm text-slate-300">
                        {booking.startTime} → {booking.endTime}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-sky-400" />

                      <p className="text-sm text-slate-300">
                        {booking.totalHours} Hours
                      </p>
                    </div>
                  </div>

                  {/* NOTE */}
                  {booking.note && (
                    <div className="mt-5 rounded-2xl border border-white/5 bg-slate-950/70 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Note
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {booking.note}
                      </p>
                    </div>
                  )}

                  {/* ACTIONS */}
                  <div className="mt-6 flex gap-3">
                    {booking.status !== "cancelled" && (
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setIsModalOpen(true);
                        }}
                        className="flex-1 rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-400"
                      >
                        Cancel Booking
                      </button>
                    )}

                    <button className="rounded-2xl border border-white/10 bg-slate-950 px-5 py-3 font-semibold text-slate-200 transition hover:bg-slate-800">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* CANCEL MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          >
            {/* BACKDROP */}
            <div
              className="absolute inset-0"
              onClick={() => setIsModalOpen(false)}
            />

            {/* MODAL */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}
              transition={{
                duration: 0.25,
              }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[#020617] shadow-[0_20px_80px_rgba(0,0,0,0.7)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-orange-500" />

              <div className="p-7">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
                  <X className="h-10 w-10 text-red-400" />
                </div>

                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-white">
                    Cancel Booking?
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    This booking will be marked as cancelled.
                    You can still view it in your booking history.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 rounded-2xl border border-white/10 bg-slate-900 px-5 py-3 font-medium text-slate-200 transition hover:bg-slate-800"
                  >
                    Keep Booking
                  </button>

                  <button
                    onClick={() =>
                      handleCancel(selectedBooking?._id)
                    }
                    className="flex-1 rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-400"
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MyBookingsPage;