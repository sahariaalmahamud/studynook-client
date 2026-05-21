"use client";

import { useState } from "react";
import BookModal from "./BookModal";

const RoomBookingSection = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BookModal
        room={room}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default RoomBookingSection;