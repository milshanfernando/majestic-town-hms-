import { create } from "zustand";
import type { AllocatedRoom, Guest, Room } from "./types";
import {
  allocatedRooms as initialAllocatedRooms,
  rooms as initialRooms,
  guests as initialGuests,
} from "./data";

interface AllocatedRoomState {
  rooms: Room[];
  allocatedRooms: AllocatedRoom[];
  guests: Guest[];

  // actions
  addRoom: (room: AllocatedRoom) => void;
  addRooms: (rooms: AllocatedRoom[]) => void;
  updateRoom: (guestId: string, updatedData: Partial<AllocatedRoom>) => void;
  removeRoom: (guestId: string) => void;
  resetRooms: () => void;

  addARoom: (room: Room) => void;
  updateRealRoom: (guestId: string, data: Partial<Room>) => void;
  updateRoomStatus: (roomNumber: number, data: Partial<Room>) => void;
}

export const useHotelStore = create<AllocatedRoomState>((set) => ({
  rooms: initialRooms,
  allocatedRooms: initialAllocatedRooms,
  guests: initialGuests,

  addRoom: (room) =>
    set((state) => ({
      allocatedRooms: [...state.allocatedRooms, room],
    })),
  addARoom: (room) =>
    set((state) => ({
      rooms: [...state.rooms, room],
    })),

  addRooms: (rooms) =>
    set((state) => ({
      allocatedRooms: [...state.allocatedRooms, ...rooms],
    })),

  updateRoom: (guestId, updatedData) =>
    set((state) => ({
      allocatedRooms: state.allocatedRooms.map((r) =>
        r.guestId === guestId ? { ...r, ...updatedData } : r
      ),
    })),

  removeRoom: (guestId) =>
    set((state) => ({
      allocatedRooms: state.allocatedRooms.filter((r) => r.guestId !== guestId),
    })),

  resetRooms: () => set({ allocatedRooms: initialAllocatedRooms }),

  updateRealRoom: (guestId, data) =>
    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.guestId === guestId ? { ...r, ...data } : r
      ),
    })),

  updateRoomStatus: (roomNumber, data) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.roomNumber === roomNumber ? { ...room, ...data } : room
      ),
    })),
}));
