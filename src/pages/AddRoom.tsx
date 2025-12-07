import React, { useState } from "react";
import { useHotelStore } from "../utility/store";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function RoomAddModal({ isOpen, onClose }: Props) {
  const addRoom = useHotelStore((state) => state.addARoom);

  const [form, setForm] = useState({
    roomNumber: "",
    type: "",
    status: "Available",
    price: "",
    cleaningStatus: "Clean",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.roomNumber || !form.type || !form.price) return;

    addRoom({
      roomNumber: Number(form.roomNumber),
      type: form.type,
      status: form.status,
      price: Number(form.price),
      cleaningStatus: form.cleaningStatus,
      allocatedGuest: null,
      guestId: null,
      bookFrom: null,
      fromDate: null,
      toDate: null,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Add New Room
        </h2>

        <div className="space-y-3">
          <input
            name="roomNumber"
            type="number"
            placeholder="Room Number"
            value={form.roomNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />

          <input
            name="type"
            type="text"
            placeholder="Room Type (Single, Double...)"
            value={form.type}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>

          <select
            name="cleaningStatus"
            value={form.cleaningStatus}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          >
            <option value="Clean">Clean</option>
            <option value="Dirty">Dirty</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}
