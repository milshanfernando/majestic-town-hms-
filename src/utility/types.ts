// types.ts
export type Guest = {
  name: string;
  id: string;
  nationality: string;
  email: string;
  phone: string;
  proof: string[];
};

export type Room = {
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

export type AllocatedRoom = {
  propertyId: number;
  room: number | null;
  type: string;
  guestName: string;
  guestId: string;
  checkIn: string | null;
  checkOut: string | null;
  dueAmount: number;
  status: string;
};
