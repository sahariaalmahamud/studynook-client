"use client";

import { useMemo, useState } from "react";

import {
  Card,
  CardHeader,
  Input,
  TextArea,
  Button,
} from "@heroui/react";

import {
  Check,
  Plus,
} from "lucide-react";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const amenityOptions = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
  "Coffee Area",
  "LED Monitor",
  "Smart TV",
  "Conference Table",
];

export default function AddRoomPage() {
  const { data: session } =
    authClient.useSession();

  const user = session?.user;

  const [loading, setLoading] =
    useState(false);

  const [amenities, setAmenities] =
    useState([]);

  const [previewImage, setPreviewImage] =
    useState("");

  // TOGGLE AMENITIES
  const toggleAmenity = (value) => {
    setAmenities((prev) =>
      prev.includes(value)
        ? prev.filter(
            (item) => item !== value
          )
        : [...prev, value]
    );
  };

  // LIVE TEXT
  const amenityText = useMemo(() => {
    if (amenities.length === 0) {
      return "No amenities selected";
    }

    return amenities.join(", ");
  }, [amenities]);

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error(
        "Please login first"
      );
      return;
    }

    try {
      setLoading(true);

      const form = e.target;

      const formData =
        new FormData(form);

      formData.append(
        "amenities",
        JSON.stringify(amenities)
      );

      const data = Object.fromEntries(
        formData.entries()
      );

      // PARSE AMENITIES
      data.amenities = JSON.parse(
        data.amenities
      );

      // OWNER INFO
      data.ownerId = user?.id;

      data.ownerName = user?.name;

      data.ownerEmail = user?.email;

      data.ownerImage = user?.image;

      // EXTRA
      data.bookingCount = 0;

      data.createdAt =
        new Date();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(data),
        }
      );

      const result =
        await response.json();

      // SUCCESS
      if (result.success) {
        toast.success(
          "Room added successfully!"
        );

        form.reset();

        setAmenities([]);

        setPreviewImage("");

        window.location.href =
          "/my-listings";
      } else {
        toast.error(
          "Failed to add room"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#020617] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-400">
            Workspace Management
          </p>

          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
            Add New Room
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Create a modern and
            comfortable workspace
            listing for your users.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.55fr]">
          {/* FORM */}
          <Card className="rounded-[2rem] border border-white/10 bg-slate-900/70">
            <CardHeader className="border-b border-white/10 p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10">
                  <Plus className="h-7 w-7 text-sky-400" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Room Details
                  </h2>

                  <p className="text-sm text-slate-400">
                    Fill all required
                    information carefully.
                  </p>
                </div>
              </div>
            </CardHeader>

            <div className="p-8">
              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* BASIC */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Input
                    label="Room Name"
                    name="roomName"
                    placeholder="Enter room name"
                    variant="bordered"
                    radius="lg"
                    size="lg"
                    required
                  />

                  <Input
                    label="Floor"
                    name="floor"
                    placeholder="e.g. 3rd Floor"
                    variant="bordered"
                    radius="lg"
                    size="lg"
                    required
                  />

                  <Input
                    label="Capacity"
                    name="capacity"
                    type="number"
                    placeholder="Enter room capacity"
                    variant="bordered"
                    radius="lg"
                    size="lg"
                    required
                  />

                  <Input
                    label="Hourly Rate ($)"
                    name="hourlyRate"
                    type="number"
                    placeholder="Enter hourly rate"
                    variant="bordered"
                    radius="lg"
                    size="lg"
                    required
                  />

                  <Input
                    label="Image URL"
                    name="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    variant="bordered"
                    radius="lg"
                    size="lg"
                    required
                    onChange={(e) =>
                      setPreviewImage(
                        e.target.value
                      )
                    }
                    className="md:col-span-2"
                  />

                  <TextArea
                    label="Description"
                    name="description"
                    placeholder="Write room description..."
                    variant="bordered"
                    rows={6}
                    required
                    className="md:col-span-2"
                  />
                </div>

                {/* AMENITIES */}
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Room Amenities
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        Select available
                        facilities.
                      </p>
                    </div>

                    <div className="rounded-full bg-slate-950 px-4 py-2 text-sm text-slate-300">
                      {amenities.length} Selected
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {amenityOptions.map(
                      (option) => {
                        const active =
                          amenities.includes(
                            option
                          );

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              toggleAmenity(
                                option
                              )
                            }
                            className={`flex items-center justify-between rounded-2xl border px-5 py-4 transition ${
                              active
                                ? "border-sky-500 bg-sky-500/10"
                                : "border-white/10 bg-slate-950"
                            }`}
                          >
                            <span className="font-medium text-white">
                              {option}
                            </span>

                            <div
                              className={`flex h-6 w-6 items-center justify-center rounded-full ${
                                active
                                  ? "bg-sky-500"
                                  : "bg-slate-800"
                              }`}
                            >
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* SUBMIT */}
                <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      Selected Amenities
                    </p>

                    <p className="mt-2 text-sm text-white">
                      {amenityText}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    isLoading={loading}
                    size="lg"
                    radius="full"
                    className="h-14 bg-sky-500 px-10 text-base font-bold text-slate-950"
                  >
                    {loading
                      ? "Creating..."
                      : "Add Room"}
                  </Button>
                </div>
              </form>
            </div>
          </Card>

          {/* PREVIEW */}
          <div className="space-y-6">
            <Card className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={
                    previewImage ||
                    "https://images.unsplash.com/photo-1507842217343-583bb7270b66"
                  }
                  alt="Preview"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <p className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                    Live Preview
                  </p>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-white">
                  Your Workspace
                </h2>

                <div className="mt-6 flex flex-wrap gap-2">
                  {amenities.length >
                  0 ? (
                    amenities.map(
                      (item) => (
                        <span
                          key={item}
                          className="rounded-full bg-slate-950 px-3 py-1 text-xs text-slate-300"
                        >
                          {item}
                        </span>
                      )
                    )
                  ) : (
                    <p className="text-sm text-slate-500">
                      No amenities selected
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}