import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../api/roomApi";

export const useRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const res = await getRooms();
      return res.data;
    },
  });
};
