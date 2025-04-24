import { useQuery } from "@tanstack/react-query";
import { AliveBooking } from "../types/models";
import { getAliveBookings } from "../api/get-alive-bookings";

export const useGetAliveBookings = () => {
  return useQuery<AliveBooking[], Error>({
    queryKey: ["bookings", "alive"],
    queryFn: getAliveBookings,
    staleTime: 1000 * 60 * 5,
  });
};
