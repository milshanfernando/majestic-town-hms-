import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { guests as initialGuests } from "../utility/data";
import { useHotelStore } from "../utility/store";
import { getNames } from "country-list";

type Guest = {
  name: string;
  id: string;
  email: string;
  phone: string;
  nationality: string;
  proof?: string[];
};

const CheckIn = () => {
  const { allocatedRooms, rooms, updateRoom, updateRoomStatus } =
    useHotelStore();

  const notCheckedIn = allocatedRooms.filter(
    (r) => r.status === "notCheckedIn"
  );

  // NEW: only available rooms
  const availableRooms = rooms.filter((r) => r.status === "Available");

  const [guestList, setGuestList] = useState<Guest[]>(initialGuests);
  const countryList = getNames();

  const formik = useFormik({
    initialValues: {
      reservationGuestId: "",
      name: "",
      id: "",
      email: "",
      phone: "",
      nationality: "",
      room: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      id: Yup.string().required("Required"),
      room: Yup.string().required("Select a room"),
    }),

    onSubmit: (values) => {
      const reservation = notCheckedIn.find(
        (r) => r.guestId === values.reservationGuestId
      );

      if (!reservation) return;

      const exists = guestList.some((g) => g.id === values.id);
      if (!exists) {
        setGuestList((prev) => [{ ...values, proof: [] }, ...prev]);
      }

      updateRoom(values.reservationGuestId, {
        room: Number(values.room),
        status: "checkedIn",
        guestName: values.name,
        guestId: values.id,
      });

      updateRoomStatus(Number(values.room), {
        status: "Occupied",
        allocatedGuest: values.name,
        guestId: values.id,
        cleaningStatus: "Clean",
        bookFrom: "Walk-In/App",
        fromDate: reservation.checkIn,
        toDate: reservation.checkOut,
      });

      alert("Guest checked in successfully!");
      formik.resetForm();
    },
  });

  const handleReservationSelect = (guestId: string) => {
    formik.setFieldValue("reservationGuestId", guestId);

    const reservation = notCheckedIn.find((r) => r.guestId === guestId);

    const guest = guestList.find((g) => g.id === reservation?.guestId);

    if (guest) {
      formik.setValues({
        reservationGuestId: guestId,
        name: guest.name,
        id: guest.id,
        email: guest.email,
        phone: guest.phone,
        nationality: guest.nationality,
        room: "",
      });
    } else {
      formik.setValues({
        reservationGuestId: guestId,
        name: reservation?.guestName || "",
        id: reservation?.guestId || "",
        email: "",
        phone: "",
        nationality: "",
        room: "",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* <h2 className="text-2xl font-bold text-gray-700 mb-4">Guest Check-In</h2> */}

      {/* Reservation Selector */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <label className="block text-sm font-semibold mb-2">
          Select Reservation
        </label>

        <select
          className="w-full p-2 border rounded-lg"
          value={formik.values.reservationGuestId}
          onChange={(e) => handleReservationSelect(e.target.value)}
        >
          <option value="">Choose reservation to check in...</option>
          {notCheckedIn.map((r) => (
            <option key={r.guestId} value={r.guestId}>
              {r.guestName} — {r.checkIn} → {r.checkOut}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-4 ">
        {/* Full Name */}
        <div className="col-span-1 flex flex-col">
          <label className="text-sm font-semibold">Full Name</label>
          <input
            name="name"
            className="bg-white p-1 px-3 rounded-[10px] focus:outline-none focus:ring-0"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>

        {/* ID */}
        <div className="col-span-1 flex flex-col">
          <label className="text-sm font-semibold">ID / Passport</label>
          <input
            name="id"
            className="bg-white p-1 px-3 rounded-[10px] focus:outline-none focus:ring-0"
            value={formik.values.id}
            onChange={formik.handleChange}
          />
        </div>

        {/* Phone */}
        <div className="col-span-1 flex flex-col">
          <label className="text-sm font-semibold">Phone</label>
          <input
            name="phone"
            className="bg-white p-1 px-3 rounded-[10px] focus:outline-none focus:ring-0"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
        </div>

        {/* Email */}
        <div className="col-span-1 flex flex-col">
          <label className="text-sm font-semibold">Email</label>
          <input
            name="email"
            className="bg-white p-1 px-3 rounded-[10px] focus:outline-none focus:ring-0"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>

        {/* Nationality */}
        <div className="col-span-1 flex flex-col">
          <label className="text-sm font-semibold">Nationality</label>
          <select
            name="nationality"
            className="bg-white p-1 px-3 rounded-[10px] focus:outline-none focus:ring-0"
            value={formik.values.nationality}
            onChange={formik.handleChange}
          >
            <option value="">Select Country</option>
            {countryList.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* UPDATED ROOM DROPDOWN */}
        <div className="col-span-1 flex flex-col">
          <label className="text-sm font-semibold">Assign Room</label>
          <select
            name="room"
            className="bg-white p-1 px-3 rounded-[10px] focus:outline-none focus:ring-0"
            value={formik.values.room}
            onChange={formik.handleChange}
          >
            <option value="">Select Available Room</option>
            {availableRooms.map((r) => (
              <option key={r.roomNumber} value={r.roomNumber}>
                Room {r.roomNumber} — {r.type} ({r.cleaningStatus})
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-blue-700 transition-all"
          >
            Check In Guest
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckIn;
