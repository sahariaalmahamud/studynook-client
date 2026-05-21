"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  Input,
  TextArea,
  Button,
} from "@heroui/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function AddRoomPage() {
  const [amenities, setAmenities] = useState([]);

  const amenityOptions = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  const toggleAmenity = (value) => {
    setAmenities((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);
    formData.append("amenities", JSON.stringify(amenities));

    const data = Object.fromEntries(formData.entries());
    data.amenities = JSON.parse(data.amenities);
    console.log(data);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Room added successfully!");
      form.reset();
      setAmenities([]);
      redirect("/my-listings");
    } else {
      toast.error("Failed to add room. Please try again.");
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl border border-default-100 rounded-3xl">
          <CardHeader className="p-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Add New Room
            </h1>
          </CardHeader>

          <hr className="border-t border-default-200 mx-8" />

          <div className="p-8">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Room Name */}
              <Input
                label="Room Name"
                name="roomName"
                type="text"
                variant="bordered"
                placeholder="Enter room name"
                required
                className="md:col-span-1"
              />

              {/* Floor */}
              <Input
                label="Floor"
                name="floor"
                type="text"
                variant="bordered"
                placeholder="e.g. 3rd Floor"
                className="md:col-span-1"
              />

              {/* Image URL */}
              <Input
                label="Image URL"
                name="image"
                type="url"
                variant="bordered"
                placeholder="https://example.com/room.jpg"
                required
                className="md:col-span-2"
              />

              {/* Capacity */}
              <Input
                label="Capacity"
                name="capacity"
                type="number"
                variant="bordered"
                placeholder="Enter room capacity"
                min={1}
                required
              />

              {/* Hourly Rate */}
              <Input
                label="Hourly Rate ($)"
                name="hourlyRate"
                type="number"
                variant="bordered"
                placeholder="Enter hourly rate"
                min={1}
                required
              />

              {/* Description */}
              <TextArea
                label="Description"
                name="description"
                variant="bordered"
                placeholder="Write room details..."
                rows={5}
                required
                className="md:col-span-2"
              />

              {/* Amenities */}
              <div className="md:col-span-2 rounded-2xl border border-default-200 p-5">
                <h3 className="text-lg font-semibold mb-4">
                  Room Amenities
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {amenityOptions.map((option) => {
                    const id = `amenity-${option.replace(/\s+/g, "-").toLowerCase()}`;
                    return (
                      <label
                        key={option}
                        htmlFor={id}
                        className="flex items-center gap-3 rounded-xl border border-default-200 px-4 py-3 cursor-pointer transition hover:border-primary"
                      >
                        <input
                          id={id}
                          name="amenities"
                          type="checkbox"
                          value={option}
                          checked={amenities.includes(option)}
                          onChange={() => toggleAmenity(option)}
                          className="h-4 w-4 rounded border-default-300 text-primary focus:ring-primary"
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 flex justify-end pt-2">
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  radius="full"
                  className="px-10 font-semibold"
                >
                  Add Room
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}