import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, MapPin, Sparkles, Users } from "lucide-react";

const AvailableRoomCard = ({ room }) => {
  const {
    _id,
    roomName,
    description,
    image,
    floor,
    capacity,
    hourlyRate,
    amenities = [],
  } = room;

  return (
    <article className="group relative flex min-h-130 flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/75 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={roomName}
          width={720}
          height={440}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-65 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-slate-950/90 via-slate-950/10 to-transparent" aria-hidden="true" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-sm font-semibold text-slate-100 backdrop-blur-sm">
          <MapPin className="h-4 w-4 text-sky-300" />
          <span>{floor}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">{roomName}</h2>
          <p className="max-w-full text-sm leading-6 text-slate-300 line-clamp-3">{description}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3 text-slate-100">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Capacity</p>
                <p className="text-base font-semibold">{capacity} people</p>
              </div>
            </div>
          </div>
          <div className="rounded-[1.25rem] border border-white/10 bg-slate-900/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Hourly rate</p>
                <p className="text-base font-semibold text-white">
                  ${hourlyRate}
                  <span className="text-slate-400">/hr</span>
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300">
                <Clock3 className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {amenities.map((amenity) => (
            <span
              key={amenity}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              {amenity}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <Link
            href={`/rooms/${_id}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default AvailableRoomCard;
