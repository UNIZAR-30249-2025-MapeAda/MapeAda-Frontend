import { useQuery } from "@tanstack/react-query";
import { UserBooking } from "../types/models";
import { getUserBookings } from "../api/get-user-bookings";

export const useGetUserBookings = () => {
  return useQuery<UserBooking[], Error>({
    queryKey: ["bookings", "user"],
    queryFn: getUserBookings,
    staleTime: 1000 * 60 * 5,
  });
};
