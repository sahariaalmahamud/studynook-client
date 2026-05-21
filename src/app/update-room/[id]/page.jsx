"use client";

import {
  useEffect,
  useState,
} from "react";

import { useParams } from "next/navigation";

import toast from "react-hot-toast";

import {
  Card,
  Input,
  TextArea,
  Button,
} from "@heroui/react";

export default function UpdateRoomPage() {
  const params = useParams();

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

  // UPDATE
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
        floor: form.floor.value,
        capacity:
          form.capacity.value,
        hourlyRate:
          form.hourlyRate.value,
        image: form.image.value,
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
        data.success
      ) {
        toast.success(
          "Room updated successfully"
        );
      } else {
        toast.error(
          "Update failed"
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
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-700 border-t-sky-400" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#020617] py-10">
      <div className="mx-auto max-w-3xl px-4">
        <Card className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8">
          <h1 className="mb-8 text-4xl font-black text-white">
            Update Room
          </h1>

          <form
            onSubmit={
              handleUpdate
            }
            className="space-y-6"
          >
            <Input
              label="Room Name"
              name="roomName"
              defaultValue={
                room?.roomName
              }
              variant="bordered"
              required
            />

            <Input
              label="Floor"
              name="floor"
              defaultValue={
                room?.floor
              }
              variant="bordered"
              required
            />

            <Input
              label="Capacity"
              name="capacity"
              type="number"
              defaultValue={
                room?.capacity
              }
              variant="bordered"
              required
            />

            <Input
              label="Hourly Rate"
              name="hourlyRate"
              type="number"
              defaultValue={
                room?.hourlyRate
              }
              variant="bordered"
              required
            />

            <Input
              label="Image URL"
              name="image"
              defaultValue={
                room?.image
              }
              variant="bordered"
              required
            />

            <TextArea
              label="Description"
              name="description"
              defaultValue={
                room?.description
              }
              variant="bordered"
              rows={6}
              required
            />

            <Button
              type="submit"
              isLoading={
                updating
              }
              className="h-14 w-full bg-sky-500 text-lg font-bold text-slate-950"
            >
              {updating
                ? "Updating..."
                : "Update Room"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}