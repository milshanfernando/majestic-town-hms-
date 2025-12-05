import React from "react";
import { useHotelStore } from "../utility/store";

const Reservations: React.FC = () => {
  const allocatedRooms = useHotelStore((state) => state.allocatedRooms);
  const rooms = useHotelStore((state) => state.rooms);

  const updateRoomStatus = useHotelStore((state) => state.updateRoomStatus);
  const updateRoom = useHotelStore((state) => state.updateRoom);

  // Remove guest from room
  const removeGuest = (roomNumber: number, guestId: string | null) => {
    if (!guestId) return;

    // Update allocatedRooms: set room to null if checked in
    const reservation = allocatedRooms.find((r) => r.guestId === guestId);
    if (reservation && reservation.status === "notCheckedIn") {
      updateRoom(guestId, { room: null, status: "notCheckedIn" });
      updateRoomStatus(roomNumber, {
        status: "Reserved",
        allocatedGuest: null,
        guestId: null,
        bookFrom: null,
        fromDate: null,
        toDate: null,
      });
    }

    // Update rooms array: make room available
    updateRoomStatus(roomNumber, {
      status: "Available",
      allocatedGuest: null,
      guestId: null,
      bookFrom: null,
      fromDate: null,
      toDate: null,
    });
  };

  // Assign guest to room
  const assignGuest = (roomNumber: number, value: string) => {
    const [guestName, guestId] = value.split("|");
    const reservation = allocatedRooms.find((r) => r.guestId === guestId);
    if (reservation && reservation.status === "notCheckedIn") {
      // Update allocatedRooms
      updateRoom(guestId, {
        room: roomNumber,
        status: "notCheckedIn",
        guestName,
        guestId,
      });
      updateRoomStatus(roomNumber, {
        status: "Reserved",
        allocatedGuest: guestName,
        guestId,
        cleaningStatus: "Clean",
        bookFrom: "Walk-in",
        fromDate: new Date().toISOString().split("T")[0],
        toDate: new Date(new Date().setDate(new Date().getDate() + 2))
          .toISOString()
          .split("T")[0],
      });
    }

    if (reservation && reservation.status === "checkedIn") {
      // Update allocatedRooms
      // Update room
      updateRoom(guestId, {
        room: roomNumber,
        status: "checkedIn",
        guestName,
        guestId,
      });
      updateRoomStatus(roomNumber, {
        status: "Occupied",
        allocatedGuest: guestName,
        guestId,
        cleaningStatus: "Clean",
        bookFrom: "Walk-in",
        fromDate: new Date().toISOString().split("T")[0],
        toDate: new Date(new Date().setDate(new Date().getDate() + 2))
          .toISOString()
          .split("T")[0],
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Hotel Room Status</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <div
            key={room.roomNumber}
            className={`p-4 rounded-xl shadow-lg transition hover:shadow-2xl ${
              room.status === "Available"
                ? "bg-green-50"
                : room.status === "Reserved"
                ? "bg-yellow-50"
                : "bg-red-50"
            }`}
          >
            <h2 className="text-xl font-semibold">Room {room.roomNumber}</h2>
            <p className="text-gray-600">{room.type}</p>
            <p className="mt-2">
              Status:{" "}
              <span
                className={`font-bold ${
                  room.status === "Available"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {room.status}
              </span>
            </p>
            {room.allocatedGuest && (
              <p className="mt-1 text-gray-700">
                Guest: {room.allocatedGuest} ({room.guestId})
              </p>
            )}
            <p className="mt-1 text-gray-500">
              Cleaning: {room.cleaningStatus}
            </p>

            {/* Remove Guest button */}
            {(room.status === "Occupied" || room.status === "Reserved") &&
              room.guestId && (
                <div className="mt-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => removeGuest(room.roomNumber, room.guestId)}
                  >
                    Remove Guest
                  </button>
                </div>
              )}

            {/* Assign Guest dropdown */}
            {room.status === "Available" && (
              <div className="mt-3">
                <select
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                  defaultValue=""
                  onChange={(e) => assignGuest(room.roomNumber, e.target.value)}
                >
                  <option value="" disabled>
                    Assign Guest
                  </option>

                  {allocatedRooms
                    .filter(
                      (g) =>
                        !rooms.some(
                          (r) =>
                            r.guestId === g.guestId && r.status === "Occupied"
                        )
                    )
                    .map((g) => (
                      <option
                        key={g.guestId}
                        value={`${g.guestName}|${g.guestId}|${g.type}`}
                      >
                        {g.guestName} ({g.guestId}) — Requested: {g.type}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
