"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import toast from "react-hot-toast";

import {
  motion,
} from "framer-motion";

import {
  ArrowLeft,
  ImageIcon,
  Layers3,
  DollarSign,
  Users,
  FileText,
  Sparkles,
  Save,
} from "lucide-react";

import Link from "next/link";

export default function UpdateRoomPage() {
  const params = useParams();

  const router = useRouter();

  const id = params.id;

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
    useState(false);

  const [room, setRoom] =
    useState(null);

  // FETCH ROOM
  useEffect(() => {
    const fetchRoom =
      async () => {
        try {
          const response =
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`
            );

          const data =
            await response.json();

          setRoom(data);
        } catch (error) {
          console.log(error);

          toast.error(
            "Failed to load room"
          );
        } finally {
          setLoading(false);
        }
      };

    if (id) {
      fetchRoom();
    }
  }, [id]);

  // UPDATE ROOM
  const handleUpdate = async (
    e
  ) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const form = e.target;

      const updatedRoom = {
        roomName:
          form.roomName.value,

        floor:
          form.floor.value,

        capacity:
          Number(
            form.capacity.value
          ),

        hourlyRate:
          Number(
            form.hourlyRate.value
          ),

        image:
          form.image.value,

        description:
          form.description.value,
      };

      const response =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              updatedRoom
            ),
          }
        );

      const data =
        await response.json();

      if (
        data.modifiedCount > 0 ||
        data.success
      ) {
        toast.success(
          "Room updated successfully"
        );

        router.push(
          "/my-listings"
        );
      } else {
        toast.error(
          "No changes made"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Something went wrong"
      );
    } finally {
      setUpdating(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-700 border-t-sky-400" />
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020617] py-16">
      {/* BACKGROUND BLUR */}
      <div className="absolute left-[-100px] top-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-[-100px] h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* BACK BUTTON */}
        <Link
          href="/my-listings"
          className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Listings
        </Link>

        {/* CARD */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl"
        >
          {/* HEADER */}
          <div className="border-b border-white/10 bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-purple-500/10 p-8 md:p-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                  <Sparkles className="h-4 w-4" />
                  Update Workspace
                </div>

                <h1 className="mt-5 text-4xl font-black tracking-tight text-white md:text-5xl">
                  Edit Your Room
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">
                  Update your workspace details,
                  pricing, image, and room
                  information to keep your
                  listing fresh and attractive.
                </p>
              </div>

              {/* IMAGE PREVIEW */}
              <div className="hidden lg:block">
                <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/10 bg-white/5">
                  <ImageIcon className="h-12 w-12 text-sky-400" />
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={
              handleUpdate
            }
            className="grid gap-8 p-8 md:grid-cols-2 md:p-10"
          >
            {/* ROOM NAME */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300">
                Room Name
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="roomName"
                  defaultValue={
                    room?.roomName
                  }
                  required
                  className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-5 text-white outline-none transition focus:border-sky-400"
                  placeholder="Enter room name"
                />
              </div>
            </div>

            {/* FLOOR */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <Layers3 className="h-4 w-4 text-sky-400" />
                Floor
              </label>

              <input
                type="text"
                name="floor"
                defaultValue={
                  room?.floor
                }
                required
                className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-5 text-white outline-none transition focus:border-sky-400"
                placeholder="e.g. 3rd Floor"
              />
            </div>

            {/* CAPACITY */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <Users className="h-4 w-4 text-emerald-400" />
                Capacity
              </label>

              <input
                type="number"
                name="capacity"
                defaultValue={
                  room?.capacity
                }
                required
                className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-5 text-white outline-none transition focus:border-emerald-400"
                placeholder="Room capacity"
              />
            </div>

            {/* HOURLY RATE */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <DollarSign className="h-4 w-4 text-yellow-400" />
                Hourly Rate
              </label>

              <input
                type="number"
                name="hourlyRate"
                defaultValue={
                  room?.hourlyRate
                }
                required
                className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-5 text-white outline-none transition focus:border-yellow-400"
                placeholder="$ per hour"
              />
            </div>

            {/* IMAGE URL */}
            <div className="space-y-3 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <ImageIcon className="h-4 w-4 text-pink-400" />
                Image URL
              </label>

              <input
                type="text"
                name="image"
                defaultValue={
                  room?.image
                }
                required
                className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-5 text-white outline-none transition focus:border-pink-400"
                placeholder="Paste room image URL"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-3 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <FileText className="h-4 w-4 text-violet-400" />
                Description
              </label>

              <textarea
                rows={7}
                name="description"
                defaultValue={
                  room?.description
                }
                required
                className="w-full rounded-[2rem] border border-white/10 bg-slate-950/70 px-5 py-5 text-white outline-none transition focus:border-violet-400"
                placeholder="Write detailed room description..."
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={
                  updating
                }
                className="group flex h-16 w-full items-center justify-center gap-3 rounded-[1.5rem] bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 text-lg font-bold text-white shadow-2xl shadow-sky-500/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-sky-500/40 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Save className="h-5 w-5" />

                {updating
                  ? "Updating Room..."
                  : "Save Changes"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}