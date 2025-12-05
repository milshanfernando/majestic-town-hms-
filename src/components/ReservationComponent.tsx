import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Papa from "papaparse";
import Button from "./Button";
import { useHotelStore } from "../utility/store";
import type { AllocatedRoom } from "../utility/types";

type GuestForm = {
  name: string;
  propertyId: number;
  type: string;
  checkIn: string;
  checkOut: string;
};

const ReservationComponent: React.FC = () => {
  const setAllocatedRoom = useHotelStore((state) => state.addRoom);
  const setAllocatedRooms = useHotelStore((state) => state.addRooms);
  const formik = useFormik<GuestForm>({
    initialValues: {
      name: "",
      propertyId: 1,
      type: "Single",
      checkIn: "",
      checkOut: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      propertyId: Yup.number().required("Required"),
      type: Yup.string().required("Required"),
      checkIn: Yup.string().required("Required"),
      checkOut: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const guestId = Math.random().toString(36).substring(2, 8).toUpperCase();

      const basePrice =
        values.type === "Single" ? 100 : values.type === "Double" ? 150 : 200;

      const newReservation: AllocatedRoom = {
        propertyId: values.propertyId,
        room: null,
        type: values.type,
        guestName: values.name,
        guestId,
        checkIn: values.checkIn,
        checkOut: values.checkOut,
        dueAmount: basePrice, // you can calculate nights later
        status: "notCheckedIn",
      };

      //   setAllocatedRooms([...allocatedRooms, newReservation]);
      setAllocatedRoom(newReservation);
      resetForm();
    },
  });

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as [];
        const importedReservations: AllocatedRoom[] = data.map((row) => ({
          propertyId: Number(row["PropertyId"] || 1),
          room: null,
          type: row["Type"] || "Single",
          guestName: row["Name"] || "Unknown",
          guestId: Math.random().toString(36).substring(2, 8).toUpperCase(),
          checkIn: row["CheckIn"] || "",
          checkOut: row["CheckOut"] || "",
          dueAmount: 100,
          status: "notCheckedIn",
        }));
        setAllocatedRooms(importedReservations);
        // setAllocatedRooms([...allocatedRooms, ...importedReservations]);
      },
    });
  };

  return (
    <div className="p-4">
      {/* <h2 className="text-xl font-bold mb-4">Reservation</h2> */}

      {/* Manual Form */}
      <form
        onSubmit={formik.handleSubmit}
        className="mb-4 grid grid-cols-2 gap-2"
      >
        {/* PROPERTY SELECT */}
        <div className="mb-2 col-span-2">
          <label className="block mb-1">Select Property</label>
          <select
            name="propertyId"
            onChange={formik.handleChange}
            value={formik.values.propertyId}
            className="bg-white p-1 px-3 rounded-[10px] w-full"
          >
            <option value={1}>Majestic Town</option>
            <option value={2}>DSV Property</option>
            <option value={3}>Vogue Inn</option>
          </select>
        </div>

        {/* Guest Name */}
        <div className="mb-2">
          <label className="block mb-1">Guest Name</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="bg-white p-1 px-3 rounded-[10px] w-full"
          />
        </div>

        {/* ROOM TYPE */}
        <div className="mb-2">
          <label className="block mb-1">Room Type</label>
          <select
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
            className="bg-white p-1 px-3 rounded-[10px] w-full"
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
          </select>
        </div>

        {/* Check-in */}
        <div className="mb-2">
          <label className="block mb-1">Check-In</label>
          <input
            type="date"
            name="checkIn"
            onChange={formik.handleChange}
            value={formik.values.checkIn}
            className="bg-white p-1 px-3 rounded-[10px] w-full"
          />
        </div>

        {/* Check-out */}
        <div className="mb-2">
          <label className="block mb-1">Check-Out</label>
          <input
            type="date"
            name="checkOut"
            onChange={formik.handleChange}
            value={formik.values.checkOut}
            className="bg-white p-1 px-3 rounded-[10px] w-full"
          />
        </div>

        <Button
          type="submit"
          style={"bg-blue-500 text-white px-4 py-2 rounded"}
          name={"Add Reservation"}
        />
      </form>

      {/* CSV IMPORT */}
      <div className="mb-4">
        <label className="block mb-1">Import CSV</label>
        <input type="file" accept=".csv" onChange={handleCSVUpload} />
        <p className="text-sm text-gray-500 mt-1">
          CSV format: Name, Type, CheckIn, CheckOut, PropertyId
        </p>
      </div>

      {/* Allocated Rooms */}
      {/* <div>
        <h3 className="font-semibold mb-2">
          Allocated / Upcoming Reservations
        </h3>
        <ul className="border rounded p-2">
          {allocatedRooms.map((room, idx) => (
            <li key={idx}>
              <b>
                {room.propertyId === 1
                  ? "Majestic Town"
                  : room.propertyId === 2
                  ? "DSV Property"
                  : "Vogue Inn"}
              </b>{" "}
              - {room.guestName} - {room.type} - CheckIn: {room.checkIn} -
              CheckOut: {room.checkOut} - Due: ${room.dueAmount}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default ReservationComponent;
