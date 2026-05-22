"use client";

import { useState } from "react";

import {
  Input,
  Modal,
  Surface,
  TextArea,
} from "@heroui/react";

import { Edit3 } from "lucide-react";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function EditModal({
  room,
  setRooms,
  rooms,
}) {
  const {
    _id,
    amenities,
    capacity,
    description,
    floor,
    hourlyRate,
    image,
    roomName,
  } = room;

  const [selectedAmenities, setSelectedAmenities] =
    useState(
      Array.isArray(
        amenities
      )
        ? amenities
        : []
    );

  const amenityOptions = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  const toggleAmenity = (
    value
  ) => {
    setSelectedAmenities(
      (prev) =>
        prev.includes(value)
          ? prev.filter(
              (item) =>
                item !== value
            )
          : [
              ...prev,
              value,
            ]
    );
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      const form =
        e.target;

      const updatedRoom = {
        roomName:
          form.roomName.value,

        floor:
          form.floor.value,

        image:
          form.image.value,

        capacity:
          Number(
            form.capacity.value
          ),

        hourlyRate:
          Number(
            form.hourlyRate.value
          ),

        description:
          form.description.value,

        amenities:
          selectedAmenities,
      };

      const {data: tokenData} = await authClient.token();

      try {
        const response =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/rooms/${_id}`,
            {
              method: "PATCH",

              headers: {
                "Content-Type":
                  "application/json",
                authorization: `Bearer ${tokenData?.token}`,
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

          // UI UPDATE
          const updated =
            rooms.map(
              (item) =>
                item._id ===
                _id
                  ? {
                      ...item,
                      ...updatedRoom,
                    }
                  : item
            );

          setRooms(
            updated
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
      }
    };

  return (
    <Modal>
      <Modal.Trigger>
        <button
          type="button"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          <Edit3 className="h-4 w-4" />
          Edit
        </button>
      </Modal.Trigger>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="max-h-[90vh] overflow-y-auto sm:max-w-3xl rounded-[2rem] border border-white/10 bg-[#0f172a]">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading className="text-2xl font-black text-white">
                Edit Room
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="grid grid-cols-1 gap-6 md:grid-cols-2"
                >
                  <Input
                    label="Room Name"
                    name="roomName"
                    defaultValue={
                      roomName
                    }
                    variant="bordered"
                    required
                  />

                  <Input
                    label="Floor"
                    name="floor"
                    defaultValue={
                      floor
                    }
                    variant="bordered"
                  />

                  <Input
                    label="Image URL"
                    name="image"
                    defaultValue={
                      image
                    }
                    variant="bordered"
                    className="md:col-span-2"
                    required
                  />

                  <Input
                    label="Capacity"
                    name="capacity"
                    type="number"
                    defaultValue={
                      capacity
                    }
                    variant="bordered"
                    required
                  />

                  <Input
                    label="Hourly Rate"
                    name="hourlyRate"
                    type="number"
                    defaultValue={
                      hourlyRate
                    }
                    variant="bordered"
                    required
                  />

                  <TextArea
                    label="Description"
                    name="description"
                    defaultValue={
                      description
                    }
                    variant="bordered"
                    rows={5}
                    className="md:col-span-2"
                    required
                  />

                  {/* AMENITIES */}
                  <div className="md:col-span-2 rounded-2xl border border-white/10 p-5">
                    <h3 className="mb-4 text-lg font-bold text-white">
                      Amenities
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {amenityOptions.map(
                        (
                          option
                        ) => (
                          <label
                            key={
                              option
                            }
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white"
                          >
                            <input
                              type="checkbox"
                              checked={selectedAmenities.includes(
                                option
                              )}
                              onChange={() =>
                                toggleAmenity(
                                  option
                                )
                              }
                            />

                            {option}
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 px-6 py-4 font-bold text-white transition hover:scale-[1.01]"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}