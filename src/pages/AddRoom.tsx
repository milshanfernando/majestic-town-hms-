import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { rooms as initialRooms } from "../utility/data";

type Room = {
  roomNumber: number;
  type: string;
  status: "Available" | "Occupied" | string;
  price: number;
  cleaningStatus: "Clean" | "Dirty" | string;
  allocatedGuest: string | null;
  guestId: string | null;
  bookFrom: string | null;
  fromDate: string | null;
  toDate: string | null;
};

const AddRoomFormik: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);

  const formik = useFormik({
    initialValues: {
      roomNumber: "",
      type: "Single",
      status: "Available",
      price: "",
      cleaningStatus: "Clean",
    },
    validationSchema: Yup.object({
      roomNumber: Yup.number()
        .required("Room number is required")
        .integer("Must be an integer")
        .positive("Must be positive"),
      type: Yup.string()
        .oneOf(["Single", "Double"])
        .required("Room type required"),
      status: Yup.string()
        .oneOf(["Available", "Occupied"])
        .required("Status required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      cleaningStatus: Yup.string()
        .oneOf(["Clean", "Dirty"])
        .required("Cleaning status required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const newRoom: Room = {
        roomNumber: parseInt(values.roomNumber),
        type: values.type,
        status: values.status as "Available" | "Occupied",
        price: parseFloat(values.price),
        cleaningStatus: values.cleaningStatus as "Clean" | "Dirty",
        allocatedGuest: null,
        guestId: null,
        bookFrom: null,
        fromDate: null,
        toDate: null,
      };
      setRooms((prev) => [...prev, newRoom]);
      resetForm();
    },
  });

  return (
    <div className="p-4 w-[400px] mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Add New Room</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Room Number</label>
          <input
            type="number"
            name="roomNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.roomNumber}
            className="w-full border rounded px-2 py-1"
          />
          {formik.touched.roomNumber && formik.errors.roomNumber && (
            <div className="text-red-500 text-sm">
              {formik.errors.roomNumber}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1">Type</label>
          <select
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded px-2 py-1"
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
          </select>
          {formik.touched.type && formik.errors.type && (
            <div className="text-red-500 text-sm">{formik.errors.type}</div>
          )}
        </div>

        <div>
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded px-2 py-1"
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>
          {formik.touched.status && formik.errors.status && (
            <div className="text-red-500 text-sm">{formik.errors.status}</div>
          )}
        </div>

        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            className="w-full border rounded px-2 py-1"
          />
          {formik.touched.price && formik.errors.price && (
            <div className="text-red-500 text-sm">{formik.errors.price}</div>
          )}
        </div>

        <div>
          <label className="block mb-1">Cleaning Status</label>
          <select
            name="cleaningStatus"
            value={formik.values.cleaningStatus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded px-2 py-1"
          >
            <option value="Clean">Clean</option>
            <option value="Dirty">Dirty</option>
          </select>
          {formik.touched.cleaningStatus && formik.errors.cleaningStatus && (
            <div className="text-red-500 text-sm">
              {formik.errors.cleaningStatus}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Room
        </button>
      </form>

      {/* <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">All Rooms</h3>
        <ul className="space-y-2">
          {rooms.map((room) => (
            <li key={room.roomNumber} className="border p-2 rounded">
              Room {room.roomNumber} - {room.type} - ${room.price} -{" "}
              {room.status} - {room.cleaningStatus}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default AddRoomFormik;
