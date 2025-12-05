import React from "react";
import { useHotelStore } from "../utility/store";

type Room = {
  roomNumber: number;
  type: string;
  status: "Available" | "Occupied" | string;
  price: number;
  cleaningStatus: string;
  allocatedGuest: string | null;
  guestId: string | null;
  bookFrom: string | null;
  fromDate: string | null;
  toDate: string | null;
};

const RoomsGrid = () => {
  const rooms = useHotelStore((state) => state.rooms);
  const today = new Date();

  const getGuestStatus = (room: Room) => {
    if (!room.allocatedGuest) return "No guest allocated";

    if (room.fromDate && room.toDate) {
      const from = new Date(room.fromDate);
      const to = new Date(room.toDate);

      if (today >= from && today <= to) return "In House";
      if (today < from) return "has reservation (upcoming)";
    }

    return "In House";
  };

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Rooms Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {rooms.map((room) => (
          <div
            key={room.roomNumber}
            className="
              bg-white/70 backdrop-blur-lg 
              shadow-xl rounded-2xl 
              p-5 border border-gray-200 
              hover:shadow-2xl hover:scale-[1.02] 
              transition-all duration-300
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                {room.roomNumber}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  room.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {room.status}
              </span>
            </div>

            {/* Room Type */}
            <div className="mb-3">
              <p className="text-sm text-gray-500">Type</p>
              <p className="text-base font-medium text-gray-700">{room.type}</p>
            </div>

            {/* Cleaning Status */}
            <div className="mb-3">
              <p className="text-sm text-gray-500">Cleaning Status</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  room.cleaningStatus === "Clean"
                    ? "bg-blue-100 text-blue-700"
                    : room.cleaningStatus === "Dirty"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {room.cleaningStatus}
              </span>
            </div>

            {/* Guest Info */}
            {room.allocatedGuest ? (
              <div className="mt-4 p-3 bg-gray-100 rounded-xl">
                <p className="text-sm text-gray-500">Guest</p>
                <p className="font-medium text-gray-700">
                  {room.allocatedGuest}
                </p>
                <p className="text-xs text-gray-500 mt-1">ID: {room.guestId}</p>

                {room.bookFrom && (
                  <p className="text-xs mt-1">
                    Booked via:{" "}
                    <span className="font-medium text-gray-700">
                      {room.bookFrom}
                    </span>
                  </p>
                )}

                {room.fromDate && room.toDate && (
                  <>
                    <p className="text-xs mt-1">
                      From:{" "}
                      <span className="font-medium text-gray-700">
                        {room.fromDate}
                      </span>
                    </p>
                    <p className="text-xs">
                      To:{" "}
                      <span className="font-medium text-gray-700">
                        {room.toDate}
                      </span>
                    </p>
                  </>
                )}

                <p className="text-sm mt-2 font-medium text-indigo-700">
                  {getGuestStatus(room)}
                </p>
              </div>
            ) : (
              <p className="mt-4 text-gray-400 text-sm italic">
                No guest allocated
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsGrid;
