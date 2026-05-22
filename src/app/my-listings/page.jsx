"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";

import Link from "next/link";

import {
  CalendarDays,
  DollarSign,
  Layers3,
  Plus,
  Search,
  Users,
  LayoutGrid,
  Eye,
} from "lucide-react";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

import { EditModal } from "@/components/EditModal";

import { DeleteAlert } from "@/components/DeleteAlert";

const MyListingsPage = () => {
  const { data: session } =
    authClient.useSession();

  const user = session?.user;

  const [rooms, setRooms] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  // FETCH MY ROOMS
  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchRooms =
      async () => {
        try {
          setLoading(true);

          const {data: tokenData} = await authClient.token();

          const response =
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/my-rooms/${user.id}`,
              {
                headers: {
                  authorization: `Bearer ${tokenData?.token}`,
                },
              }
            );

          if (!response.ok) {
            throw new Error(
              "Failed to fetch rooms"
            );
          }

          const data =
            await response.json();

          setRooms(data || []);
        } catch (error) {
          console.log(error);

          toast.error(
            "Failed to load rooms"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchRooms();
  }, [user?.id]);

  // REMOVE ROOM FROM UI
  const removeRoom = (
    id
  ) => {
    const remainingRooms =
      rooms.filter(
        (room) =>
          room._id !== id
      );

    setRooms(remainingRooms);
  };

  // UPDATE ROOM IN UI
  const updateRoomInState = (
    updatedRoom
  ) => {
    const updatedRooms =
      rooms.map((room) =>
        room._id ===
        updatedRoom._id
          ? updatedRoom
          : room
      );

    setRooms(updatedRooms);
  };

  // FILTERED ROOMS
  const filteredRooms =
    useMemo(() => {
      return rooms.filter(
        (room) =>
          room.roomName
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [rooms, search]);

  // STATS
  const totalRooms =
    rooms.length;

  const totalBookings =
    rooms.reduce(
      (acc, room) =>
        acc +
        Number(
          room.bookingCount || 0
        ),
      0
    );

  const totalRevenue =
    rooms.reduce(
      (acc, room) =>
        acc +
        Number(
          room.hourlyRate || 0
        ) *
        Number(
          room.bookingCount || 0
        ),
      0
    );

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020617]">
      {/* BACKGROUND */}
      <div className="absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-[-120px] h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
              Workspace Dashboard
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
              My Listings
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">
              Manage your listed
              workspaces, monitor
              bookings, and keep
              your rooms updated.
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* SEARCH */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                placeholder="Search room..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="h-14 w-full rounded-2xl border border-white/10 bg-slate-900/80 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400"
              />
            </div>

            {/* ADD ROOM */}
            <Link
              href="/add-room"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 px-6 font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:scale-[1.02]"
            >
              <Plus className="h-5 w-5" />
              Add Room
            </Link>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {/* TOTAL ROOMS */}
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  Total Rooms
                </p>

                <h2 className="mt-3 text-4xl font-black text-white">
                  {totalRooms}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10">
                <LayoutGrid className="h-6 w-6 text-sky-400" />
              </div>
            </div>
          </div>

          {/* BOOKINGS */}
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  Total Bookings
                </p>

                <h2 className="mt-3 text-4xl font-black text-white">
                  {totalBookings}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                <CalendarDays className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* REVENUE */}
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  Revenue
                </p>

                <h2 className="mt-3 text-4xl font-black text-white">
                  $
                  {totalRevenue}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10">
                <DollarSign className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* OWNER */}
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm text-slate-400">
                  Owner
                </p>

                <h2 className="mt-3 truncate text-2xl font-black text-white">
                  {user?.name ||
                    "Unknown"}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-24 flex justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-700 border-t-sky-400" />
          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          filteredRooms.length ===
            0 && (
            <div className="mt-20 rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-16 text-center backdrop-blur-xl">
              <h2 className="text-3xl font-black text-white">
                No Rooms Found
              </h2>

              <p className="mt-4 text-slate-400">
                You haven’t added
                any room yet.
              </p>

              <Link
                href="/add-room"
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                <Plus className="h-5 w-5" />
                Add Room
              </Link>
            </div>
          )}

        {/* ROOMS GRID */}
        {!loading &&
          filteredRooms.length >
            0 && (
            <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {filteredRooms.map(
                (room) => (
                  <motion.div
                    key={room._id}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl"
                  >
                    {/* IMAGE */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={
                          room.image
                        }
                        alt={
                          room.roomName
                        }
                        fill
                        className="object-cover transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                      {/* RATE */}
                      <div className="absolute right-4 top-4 rounded-full bg-black/50 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                        $
                        {
                          room.hourlyRate
                        }
                        /hr
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-2xl font-bold text-white">
                            {
                              room.roomName
                            }
                          </h2>

                          <p className="mt-2 text-sm text-slate-400">
                            {
                              room.floor
                            }
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-950/80 px-4 py-3 text-center">
                          <p className="text-xs text-slate-500">
                            Bookings
                          </p>

                          <p className="mt-1 text-lg font-bold text-white">
                            {room.bookingCount ||
                              0}
                          </p>
                        </div>
                      </div>

                      {/* DESCRIPTION */}
                      <p className="mt-5 line-clamp-3 text-sm leading-7 text-slate-400">
                        {
                          room.description
                        }
                      </p>

                      {/* INFO */}
                      <div className="mt-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-sky-400" />

                          <p className="text-sm text-slate-300">
                            Capacity:{" "}
                            {
                              room.capacity
                            }
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Layers3 className="h-4 w-4 text-sky-400" />

                          <p className="text-sm text-slate-300">
                            Floor:{" "}
                            {
                              room.floor
                            }
                          </p>
                        </div>
                      </div>

                      {/* AMENITIES */}
                      {room.amenities
                        ?.length >
                        0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {room.amenities
                            .slice(
                              0,
                              4
                            )
                            .map(
                              (
                                item,
                                index
                              ) => (
                                <span
                                  key={
                                    index
                                  }
                                  className="rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-xs text-slate-300"
                                >
                                  {item}
                                </span>
                              )
                            )}
                        </div>
                      )}

                      {/* ACTIONS */}
                      <div className="mt-8 flex flex-wrap gap-3">
                        {/* VIEW */}
                        <Link
                          href={`/rooms/${room._id}`}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Link>

                        {/* EDIT */}
                        <EditModal
                          room={room}
                          rooms={rooms}
                          setRooms={
                            setRooms
                          }
                          onUpdated={
                            updateRoomInState
                          }
                        />

                        {/* DELETE */}
                        <DeleteAlert
                          room={room}
                          onDelete={
                            removeRoom
                          }
                        />
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          )}
      </div>
    </section>
  );
};

export default MyListingsPage;