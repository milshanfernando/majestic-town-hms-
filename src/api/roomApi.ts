import type { Room } from "../utility/types";
import { axiosInstance } from "./axiosInstance";

export const getRooms = () => axiosInstance.get("/rooms");
export const addRoom = (data: Room) => axiosInstance.post("/rooms", data);
