import { useQuery } from "@tanstack/react-query";
import { GetBookingsByUserResponse as GetBookingsBySpaceResponse } from "../../../types/api";
import { Booking } from "../types/models";
import { mapGetBookingsBySpaceResponseToBooking } from "../utils/mappers";
import { api } from "../../../lib/api-client";

const getBookingsBySpace = async (id: string): Promise<Booking[]> => {
  const bookings: GetBookingsBySpaceResponse = await api.get(`/api/bookings/space/${id}`);

  return bookings.map(mapGetBookingsBySpaceResponseToBooking);
};

export const getBookingsBySpaceQuery = (id: string) => ({
  queryKey: ["bookings", "space", id],
  queryFn: () => getBookingsBySpace(id),
  staleTime: 0,
});

export const useGetBookingsBySpace = (id: string) =>
  useQuery<Booking[], Error>(getBookingsBySpaceQuery(id));
