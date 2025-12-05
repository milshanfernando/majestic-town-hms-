import type { AllocatedRoom, Room } from "./types";

export const getTodayStays = (rooms: AllocatedRoom[], dateStr: string) => {
  const today = new Date(dateStr);
  today.setHours(0, 0, 0, 0); // normalize to local midnight

  return rooms.filter((r) => {
    if (!r.checkIn || !r.checkOut) return false;

    const checkIn = new Date(r.checkIn);
    const checkOut = new Date(r.checkOut);

    checkIn.setHours(0, 0, 0, 0);
    checkOut.setHours(0, 0, 0, 0);

    console.log(checkIn, today, checkOut);

    return checkIn <= today && checkOut >= today;
  });
};

export const getTodayStaysCount = (rooms: Room[]) => {
  return rooms.filter((room) => room.status === "Occupied").length;
};

export const getTodayCheckedIn = (rooms: AllocatedRoom[]) => {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
  return rooms.filter(
    (room) => room.status === "checkedIn" && room.checkIn === today
  ).length;
};

export const getTodayReservedRooms = (rooms: AllocatedRoom[]) => {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
  return rooms.filter(
    (room) => room.status === "notCheckedIn" && room.checkIn === today
  ).length;
};

export const getTodayAvailableCountWithoutReservation = (rooms: Room[]) => {
  return rooms.filter((room) => room.status === "Available").length;
};

export const haveToCheckOut = (status: string, checkOut: string | null) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  return status === "checkedIn" && checkOut === today;
};

export const haveToCheckIn = (status: string, checkOut: string | null) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  return status === "notCheckedIn" && checkOut === today;
};

export const haveToCheckOutCount = (rooms: AllocatedRoom[]) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  return rooms.filter(
    (room) => room.status === "checkedIn" && room.checkOut === today
  ).length;
};
