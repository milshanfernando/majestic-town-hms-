import React from "react";
import { useHotelStore } from "../utility/store";

type Props = {
  onSelect: (id: string | null) => void;
};
export default function GuestList({ onSelect }: Props) {
  const guests = useHotelStore((state) => state.guests);

  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-4">Guest List</h2>

      <div className="space-y-2">
        {guests.map((guest) => (
          <button
            key={guest.id}
            onClick={() => onSelect(guest.id)}
            className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded-xl transition"
          >
            <div>
              <p className="font-medium">{guest.name}</p>
              <p className="text-xs text-gray-500">{guest.phone}</p>
            </div>
            <span className="text-gray-400 text-sm">{guest.nationality}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
