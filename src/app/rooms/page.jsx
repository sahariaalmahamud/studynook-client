"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Filter,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import { fetchRooms } from "@/lib/rooms/data";
import RoomCard from "@/components/RoomCard";

const amenityOptions = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAmenities, setSelectedAmenities] =
    useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // =====================================
  // PAGINATION
  // =====================================

  const [currentPage, setCurrentPage] = useState(1);

  const roomsPerPage = 6;

  // =====================================
  // LOAD ROOMS
  // =====================================

  useEffect(() => {
    let mounted = true;

    const loadRooms = async () => {
      setLoading(true);

      try {
        const data = await fetchRooms();

        if (mounted) {
          setRooms(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (mounted) {
          setRooms([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadRooms();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================
  // RESET PAGE ON FILTER CHANGE
  // =====================================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedAmenities,
    minPrice,
    maxPrice,
  ]);

  const searchValue = searchTerm
    .trim()
    .toLowerCase();

  const minValue = Number(minPrice);

  const maxValue = Number(maxPrice);

  // =====================================
  // FILTER ROOMS
  // =====================================

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const roomName = String(
        room.roomName || room.title || room.name || ""
      ).toLowerCase();

      const roomDescription = String(
        room.description ||
          room.summary ||
          room.subtitle ||
          ""
      ).toLowerCase();

      const searchable = `${roomName} ${roomDescription}`;

      const matchesSearch =
        !searchValue ||
        searchable.includes(searchValue);

      const amenities = Array.isArray(
        room.amenities
      )
        ? room.amenities
        : Array.isArray(room.features)
        ? room.features
        : [];

      const matchesAmenities =
        selectedAmenities.every((amenity) =>
          amenities.includes(amenity)
        );

      const rate = Number(
        room.hourlyRate ??
          room.price ??
          room.rate ??
          0
      );

      const matchesMin =
        minPrice === "" || rate >= minValue;

      const matchesMax =
        maxPrice === "" || rate <= maxValue;

      return (
        matchesSearch &&
        matchesAmenities &&
        matchesMin &&
        matchesMax
      );
    });
  }, [
    rooms,
    searchValue,
    selectedAmenities,
    minPrice,
    maxPrice,
    minValue,
    maxValue,
  ]);

  // =====================================
  // PAGINATED ROOMS
  // =====================================

  const totalPages = Math.ceil(
    filteredRooms.length / roomsPerPage
  );

  const startIndex =
    (currentPage - 1) * roomsPerPage;

  const paginatedRooms = filteredRooms.slice(
    startIndex,
    startIndex + roomsPerPage
  );

  // =====================================
  // ACTIVE FILTER COUNT
  // =====================================

  const activeFilters =
    Number(searchValue.length > 0) +
    selectedAmenities.length +
    Number(minPrice !== "") +
    Number(maxPrice !== "");

  // =====================================
  // TOGGLE AMENITY
  // =====================================

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity]
    );
  };

  // =====================================
  // RESET FILTERS
  // =====================================

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedAmenities([]);
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="hidden xl:block">
            <div className="sticky top-28 space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
              {/* Heading */}
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                  Refine search
                </p>

                <h2 className="text-2xl font-semibold text-white">
                  Filter rooms
                </h2>

                <p className="text-sm leading-6 text-slate-400">
                  Toggle amenities, adjust rate range,
                  or search by room name.
                </p>
              </div>

              {/* Search */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                  <label
                    htmlFor="search"
                    className="sr-only"
                  >
                    Search rooms
                  </label>

                  <input
                    id="search"
                    name="search"
                    type="search"
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(
                        event.target.value
                      )
                    }
                    placeholder="Search rooms"
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-12 py-3 text-sm text-slate-100 shadow-inner shadow-slate-950/20 outline-none transition focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
                  />
                </div>

                {/* Amenities */}
                <div className="space-y-3 rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                    Amenities
                  </p>

                  <div className="grid gap-3">
                    {amenityOptions.map((amenity) => (
                      <label
                        key={amenity}
                        className="inline-flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 transition hover:border-sky-400/30"
                      >
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(
                            amenity
                          )}
                          onChange={() =>
                            toggleAmenity(
                              amenity
                            )
                          }
                          className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-sky-400 focus:ring-sky-400"
                        />

                        <span>{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                    Price range
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-300">
                      <span>Min rate</span>

                      <input
                        inputMode="numeric"
                        min={0}
                        value={minPrice}
                        onChange={(event) =>
                          setMinPrice(
                            event.target.value.replace(
                              /[^0-9]/g,
                              ""
                            )
                          )
                        }
                        placeholder="0"
                        className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
                      />
                    </label>

                    <label className="space-y-2 text-sm text-slate-300">
                      <span>Max rate</span>

                      <input
                        inputMode="numeric"
                        min={0}
                        value={maxPrice}
                        onChange={(event) =>
                          setMaxPrice(
                            event.target.value.replace(
                              /[^0-9]/g,
                              ""
                            )
                          )
                        }
                        placeholder="25"
                        className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
                      />
                    </label>
                  </div>
                </div>

                {/* Reset */}
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex w-full items-center justify-center rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-400/40 hover:bg-slate-900"
                >
                  Reset filters
                </button>
              </div>
            </div>
          </aside>

          {/* Content */}
          <section className="space-y-8">
            {/* Top Bar */}
            <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                  Results
                </p>

                <h2 className="mt-2 text-3xl font-semibold text-white">
                  {filteredRooms.length} rooms found
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200">
                  <Filter className="h-4 w-4 text-sky-300" />

                  {activeFilters} active filter
                  {activeFilters === 1 ? "" : "s"}
                </span>

                <span className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200">
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  Premium campus spaces
                </span>
              </div>
            </div>

            {/* Cards */}
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {Array.from({ length: 6 }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80 shadow-2xl shadow-slate-950/30"
                      >
                        <div className="h-72 w-full animate-pulse bg-slate-800" />

                        <div className="space-y-4 p-6 sm:p-7">
                          <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-800" />

                          <div className="h-4 w-1/2 animate-pulse rounded-full bg-slate-800" />

                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="h-14 animate-pulse rounded-[1.25rem] bg-slate-800" />

                            <div className="h-14 animate-pulse rounded-[1.25rem] bg-slate-800" />
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <div className="h-9 w-20 animate-pulse rounded-full bg-slate-800" />

                            <div className="h-9 w-24 animate-pulse rounded-full bg-slate-800" />
                          </div>

                          <div className="h-12 animate-pulse rounded-[1.25rem] bg-slate-800" />
                        </div>
                      </div>
                    )
                  )}
                </motion.div>
              ) : filteredRooms.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[2rem] border border-dashed border-slate-700 bg-slate-900/80 p-12 text-center shadow-xl shadow-slate-950/20"
                >
                  <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-sky-300" />

                  <h3 className="text-2xl font-semibold text-white">
                    No rooms match your filters
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Try broadening the price range or
                    removing a selected amenity to reveal
                    more study rooms.
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-6 inline-flex items-center justify-center rounded-3xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
                  >
                    Reset filters
                  </button>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    key="rooms"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    className="grid gap-6 sm:grid-cols-2"
                  >
                    {paginatedRooms.map((room) => (
                      <RoomCard
                        key={room._id ?? room.id}
                        room={room}
                      />
                    ))}
                  </motion.div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                      {/* Previous */}
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() =>
                          setCurrentPage(
                            (prev) => prev - 1
                          )
                        }
                        className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:border-sky-400/40 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Previous
                      </button>

                      {/* Numbers */}
                      {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                      ).map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() =>
                            setCurrentPage(page)
                          }
                          className={`h-11 w-11 rounded-2xl text-sm font-semibold transition ${
                            currentPage === page
                              ? "bg-sky-500 text-white"
                              : "border border-white/10 bg-slate-900 text-slate-200 hover:border-sky-400/40"
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      {/* Next */}
                      <button
                        type="button"
                        disabled={
                          currentPage === totalPages
                        }
                        onClick={() =>
                          setCurrentPage(
                            (prev) => prev + 1
                          )
                        }
                        className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:border-sky-400/40 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RoomsPage;