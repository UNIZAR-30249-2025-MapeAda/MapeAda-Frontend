import { Booking } from "../types/models";
import { GetAllBookingsResponse } from "../../../types/api";
import { mapGetAllBookingsResponseToBooking } from "../utils/mappers";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";

const getAllBookings = async (): Promise<Booking[]> => {
  const bookings: GetAllBookingsResponse = await api.get("/api/bookings");

  return bookings.map(mapGetAllBookingsResponseToBooking);
};

export const useGetAllBookings = () => {
  return useQuery<Booking[], Error>({
    queryKey: ["bookings", "all"],
    queryFn: getAllBookings,
    staleTime: 1000 * 60 * 5,
  });
};
