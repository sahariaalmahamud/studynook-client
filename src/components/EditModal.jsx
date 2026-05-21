"use client";

import { useState } from "react";
import { Input, Label, Modal, Surface, TextArea, TextField } from "@heroui/react";
import { Edit3 } from "lucide-react";
import toast from "react-hot-toast";

export function EditModal({ room }) {

    const { _id, amenities, capacity, description, floor, hourlyRate, image, roomName } = room;
    const [selectedAmenities, setSelectedAmenities] = useState(Array.isArray(amenities) ? amenities : []);

    const amenityOptions = [
        "Whiteboard",
        "Projector",
        "Wi-Fi",
        "Power Outlets",
        "Quiet Zone",
        "Air Conditioning",
    ];

    const toggleAmenity = (value) => {
        setSelectedAmenities((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const formData = new FormData(form);
        formData.append("amenities", JSON.stringify(selectedAmenities));

        const data = Object.fromEntries(formData.entries());
        data.amenities = JSON.parse(data.amenities);
        console.log(data);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          toast.success("Room updated successfully!");
          form.reset();
          setSelectedAmenities([]);
        } else {
          toast.error("Failed to update room. Please try again.");
        }

    };

    return (
        <Modal>
            <Modal.Trigger>
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-6 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20"
                    aria-label="Edit room"
                >
                    <Edit3 className="h-4 w-4" />
                    Edit
                </button>
            </Modal.Trigger>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            {/* <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <Envelope className="size-5" />
                            </Modal.Icon> */}
                            <Modal.Heading>Edit Room</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
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
                                        defaultValue={roomName ?? ""}
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
                                        defaultValue={floor ?? ""}
                                        className="md:col-span-1"
                                    />

                                    {/* Image URL */}
                                    <Input
                                        label="Image URL"
                                        name="image"
                                        type="url"
                                        variant="bordered"
                                        placeholder="https://example.com/room.jpg"
                                        defaultValue={image ?? ""}
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
                                        defaultValue={capacity ?? ""}
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
                                        defaultValue={hourlyRate ?? ""}
                                        min={1}
                                        required
                                    />

                                    {/* Description */}
                                    <TextArea
                                        label="Description"
                                        name="description"
                                        variant="bordered"
                                        placeholder="Write room details..."
                                        defaultValue={description ?? ""}
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
                                                            checked={selectedAmenities.includes(option)}
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
                                    <div className=" pt-2">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700/70 bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                                        >
                                            Save
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