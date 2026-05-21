"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock3, MapPin, Sparkles, Users } from "lucide-react";
import Image from "next/image";

const fallbackImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900";

const RoomCard = ({ room }) => {
  const router = useRouter();
  const roomId = room._id ?? room.id;

  const title = room.roomName || room.title || room.name || "Study space";
  const description =
    room.description || room.summary || room.subtitle || room.overview || "A premium study room with modern amenities and thoughtful design.";
  const imageSrc = room.image || room.thumbnail || room.coverImage || fallbackImage;
  const floor = room.floor || room.level || room.location || "Campus";
  const capacity = Number(room.capacity ?? room.seats ?? 0);
  const hourlyRate = Number(room.hourlyRate ?? room.price ?? 0);
  const bookedCount = Number(room.bookedCount ?? room.bookings ?? 0);
  const amenities = Array.isArray(room.amenities)
    ? room.amenities
    : Array.isArray(room.features)
    ? room.features
    : [];

  const openRoom = () => {
    if (!roomId) return;
    router.push(`/rooms/${roomId}`);
  };

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80 shadow-2xl shadow-slate-950/30 transition duration-300"
    >
      <div className="relative overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          width={720}
          height={500}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-72 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-slate-950/90 via-slate-950/30 to-transparent" aria-hidden="true" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-100 backdrop-blur-sm">
          <MapPin className="h-3.5 w-3.5 text-sky-300" />
          {floor}
        </div>
      </div>

      <div className="flex flex-col gap-5 p-6 sm:p-7">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <span className="rounded-2xl bg-sky-500/15 px-3 py-2 text-sm font-semibold text-sky-300">
              ${hourlyRate}/hr
            </span>
          </div>
          <p className="text-sm leading-6 text-slate-400 line-clamp-3">{description}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            <Users className="h-4 w-4 text-sky-300" />
            <span>{capacity} seats</span>
          </div>
          <div className="inline-flex items-center gap-3 justify-between rounded-3xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
            <span className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-amber-300" />
              Booked
            </span>
            <span className="font-semibold text-white">{bookedCount}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 5).map((amenity) => (
            <span
              key={amenity}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-2 text-xs font-medium text-slate-200"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              {amenity}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={openRoom}
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
        >
          View Details
        </button>
      </div>
    </motion.article>
  );
};

export default RoomCard;
