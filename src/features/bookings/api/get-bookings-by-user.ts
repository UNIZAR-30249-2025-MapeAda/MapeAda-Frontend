import { useQuery } from "@tanstack/react-query";
import { GetBookingsByUserResponse } from "../../../types/api";
import { Booking } from "../types/models";
import { api } from "../../../lib/api-client";

const getBookingsByUser = async (nip: string): Promise<Booking[]> => {
  const bookings: GetBookingsByUserResponse = await api.get(`/api/bookings/user/${nip}`);

  return bookings;
};

export const useGetBookingsByUser = (nip: string) => {
  return useQuery<Booking[], Error>({
    queryKey: ["bookings", "user", nip],
    queryFn: () => getBookingsByUser(nip),
    staleTime: 0,
  });
};
