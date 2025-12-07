import React from "react";
import { useHotelStore } from "../utility/store";
import type { AllocatedRoom } from "../utility/types";

const GuestHistory: React.FC = () => {
  const today = new Date();
  const allocatedRooms = useHotelStore((state) => state.allocatedRooms);
  // Filter history (guests who have already checked out)
  const history: AllocatedRoom[] = allocatedRooms.filter((room) => {
    const checkOutDate = new Date(room.checkOut || "");
    return room.status === "checkedIn" && checkOutDate < today;
  });

  if (history.length === 0) {
    return (
      <div className="p-6 bg-gray-50 text-gray-600 rounded shadow">
        No guest history available.
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Guest History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Room</th>
              <th className="px-4 py-2 border">Guest Name</th>
              <th className="px-4 py-2 border">Check In</th>
              <th className="px-4 py-2 border">Check Out</th>
              <th className="px-4 py-2 border">Amount Paid</th>
              <th className="px-4 py-2 border">Property ID</th>
            </tr>
          </thead>
          <tbody>
            {history.map((room, index) => (
              <tr key={index} className="text-center hover:bg-gray-50">
                <td className="px-4 py-2 border">{room.room ?? "N/A"}</td>
                <td className="px-4 py-2 border">{room.guestName}</td>
                <td className="px-4 py-2 border">{room.checkIn}</td>
                <td className="px-4 py-2 border">{room.checkOut}</td>
                <td className="px-4 py-2 border">${room.dueAmount}</td>
                <td className="px-4 py-2 border">{room.propertyId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuestHistory;
