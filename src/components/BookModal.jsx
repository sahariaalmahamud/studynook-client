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

  const { data: session } = authClient.useSession();
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
        startTime,
        endTime,
        note,

        totalHours,
        totalCost,

        status: "confirmed",
      };

      const {data: tokenData} = await authClient.token();
      console.log('token data', tokenData);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${tokenData?.token}`
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0"
            onClick={handleClose}
          />

          {/* modal */}
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
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-white">Book Room</h2>
                <p className="text-sm text-slate-400">{roomName}</p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-lg hover:bg-white/10 p-2 transition"
              >
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            {/* form */}
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <Calendar className="inline mr-2 h-4 w-4" />
                  Date
                </label>
                <input
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>

              {/* Time Range */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    <Clock3 className="inline mr-2 h-4 w-4" />
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    required
                  />
                </div>
              </div>

              {/* Validation message */}
              {validationMessage && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm text-red-300">
                  {validationMessage}
                </div>
              )}

              {/* Duration & Cost */}
              {isTimeRangeValid && (
                <div className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Duration</span>
                    <span className="text-white font-semibold">{totalHours} hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Hourly Rate</span>
                    <span className="text-white font-semibold">${hourlyRate}/hr</span>
                  </div>
                  <div className="border-t border-blue-500/30 pt-2 flex justify-between">
                    <span className="text-slate-300">Total Cost</span>
                    <span className="text-blue-300 font-bold">${totalCost.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Note */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <TextCursor className="inline mr-2 h-4 w-4" />
                  Additional Notes
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Any special requirements?"
                  rows="2"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                />
              </div>

              {/* Error message */}
              {errorMessage && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm text-red-300">
                  {errorMessage}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-semibold text-white hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !isTimeRangeValid || !date}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      <span>Booking...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Confirm Booking</span>
                    </>
                  )}
                </button>
              </div>
            </form>
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