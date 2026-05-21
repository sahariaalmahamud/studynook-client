"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  X,
  TextCursor,
  Calendar,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const BookModal = ({ room }) => {
  const { _id, roomName, image, hourlyRate } = room ?? {};

  const {data: session} = authClient.useSession();
  const user = session?.user;
  // console.log('user data', user);


  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const minDate = useMemo(
    () => new Date().toISOString().slice(0, 10),
    []
  );

  const parseTime = (value) => {
    if (!value) return null;

    const [hour, minute] = value.split(":").map(Number);

    return Number.isFinite(hour) && Number.isFinite(minute)
      ? hour + minute / 60
      : null;
  };

  const totalHours = useMemo(() => {
    const start = parseTime(startTime);
    const end = parseTime(endTime);

    if (start === null || end === null) return 0;

    const diff = end - start;

    return diff > 0 ? Number(diff.toFixed(2)) : 0;
  }, [startTime, endTime]);

  const totalCost = useMemo(() => {
    return totalHours * Number(hourlyRate || 0);
  }, [totalHours, hourlyRate]);

  const isTimeRangeValid = useMemo(() => {
    if (!startTime || !endTime) return false;

    const start = parseTime(startTime);
    const end = parseTime(endTime);

    return start !== null && end !== null && end > start;
  }, [startTime, endTime]);

  const validationMessage =
    startTime && endTime && !isTimeRangeValid
      ? "Please select a valid booking time range."
      : "";

  const resetForm = () => {
    setDate("");
    setStartTime("");
    setEndTime("");
    setNote("");
    setErrorMessage("");
  };

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    if (!date || !startTime || !endTime || !isTimeRangeValid) {
      const errorText = "Please select a valid booking time range.";

      setErrorMessage(errorText);
      toast.error(errorText);

      return;
    }

    if (!_id) {
      const errorText =
        "Unable to complete booking. Please try again.";

      setErrorMessage(errorText);
      toast.error(errorText);

      return;
    }

    setIsSubmitting(true);

    try {
      const booking = {

        userId: user?.id,
        userImage: user?.image,
        userName: user?.name,
        roomId: _id,
        roomName,
        hourlyRate,
        image,
        date,
        // startTime,
        // endTime,
        // note,
        // totalHours,
        // totalCost,
      };

      // console.log('payload', payload);

      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_API_URL}/rooms/${_id}/bookings`,
        `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(booking),
        }
      );

      if (!response.ok) {
        const body = await response.json().catch(() => null);

        const conflictMessage =
          body?.message ||
          body?.error ||
          "Booking conflict detected.";

        setErrorMessage(conflictMessage);
        toast.error(conflictMessage);

        return;
      }

      toast.success("Booking confirmed successfully!");

      resetForm();
      handleClose();
    } catch (error) {
      const conflictMessage =
        "A booking conflict occurred. Please choose another slot.";

      setErrorMessage(conflictMessage);
      toast.error(conflictMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 backdrop-blur-md px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* BACKDROP */}
          <div
            className="absolute inset-0"
            onClick={handleClose}
          />

          {/* MODAL */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#020617] shadow-[0_20px_120px_rgba(0,0,0,0.7)]"
          >
            {/* HEADER */}
            <div className="flex items-start justify-between border-b border-white/10 p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sky-400">
                  Workspace Booking
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  Reserve {roomName}
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Select your preferred time slot and confirm booking.
                </p>
              </div>

              <button
                onClick={handleClose}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-900 text-slate-300 transition hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* BODY */}
            <div className="grid gap-6 p-6 lg:grid-cols-[1.4fr_0.8fr]">
              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="rounded-[1.8rem] border border-white/10 bg-slate-900/60 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10">
                      <Calendar className="h-5 w-5 text-sky-400" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Booking Information
                      </h3>

                      <p className="text-sm text-slate-400">
                        Fill in your booking details.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {/* DATE */}
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-slate-200">
                        Date
                      </span>

                      <input
                        type="date"
                        min={minDate}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                      />
                    </label>

                    {/* START */}
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-slate-200">
                        Start Time
                      </span>

                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) =>
                          setStartTime(e.target.value)
                        }
                        required
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                      />
                    </label>

                    {/* END */}
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-slate-200">
                        End Time
                      </span>

                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) =>
                          setEndTime(e.target.value)
                        }
                        required
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                      />
                    </label>

                    {/* NOTE */}
                    <label className="space-y-2 sm:col-span-2">
                      <span className="text-sm font-medium text-slate-200">
                        Additional Note
                      </span>

                      <textarea
                        rows={5}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Write additional information..."
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                      />
                    </label>
                  </div>
                </div>

                {(validationMessage || errorMessage) && (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {validationMessage || errorMessage}
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400 disabled:opacity-60"
                  >
                    <CheckCircle2 className="h-4 w-4" />

                    {isSubmitting
                      ? "Booking..."
                      : "Confirm Booking"}
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              {/* SUMMARY */}
              <div className="space-y-5">
                <div className="rounded-[1.8rem] border border-white/10 bg-slate-900/70 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Booking Summary
                  </p>

                  <div className="mt-5 space-y-4">
                    <div className="rounded-2xl bg-slate-950 p-5">
                      <p className="text-sm text-slate-400">
                        Total Cost
                      </p>

                      <h3 className="mt-2 text-4xl font-black text-white">
                        ${totalCost.toFixed(2)}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-2xl bg-slate-950 p-4">
                        <p className="text-xs uppercase text-slate-500">
                          Hours
                        </p>

                        <p className="mt-2 text-2xl font-bold text-white">
                          {totalHours || 0}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-950 p-4">
                        <p className="text-xs uppercase text-slate-500">
                          Rate
                        </p>

                        <p className="mt-2 text-2xl font-bold text-white">
                          ${hourlyRate}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-slate-950 p-4">
                      <p className="text-xs uppercase text-slate-500">
                        Time Range
                      </p>

                      <p className="mt-2 text-sm text-slate-200">
                        {startTime && endTime
                          ? `${startTime} → ${endTime}`
                          : "Select booking time"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-white/10 bg-slate-900/70 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Booking Notes
                  </p>

                  <div className="mt-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock3 className="mt-1 h-4 w-4 text-sky-400" />

                      <p className="text-sm leading-6 text-slate-300">
                        Booking cost updates automatically based on selected hours.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <TextCursor className="mt-1 h-4 w-4 text-slate-400" />

                      <p className="text-sm leading-6 text-slate-300">
                        You can add extra notes before confirming your booking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-sky-500/20 bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
      >
        <CalendarDays className="h-5 w-5" />
        Book Now
      </button>

      {mounted &&
        createPortal(modalContent, document.body)}
    </>
  );
};

export default BookModal;