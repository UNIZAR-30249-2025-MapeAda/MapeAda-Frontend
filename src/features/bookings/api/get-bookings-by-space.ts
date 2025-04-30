import { useQuery } from "@tanstack/react-query";
import { GetBookingsByUserResponse as GetBookingsBySpaceResponse } from "../../../types/api";
import { Booking } from "../types/models";
import { mapGetBookingsBySpaceResponseToBooking } from "../utils/mappers";

const mockBookings: GetBookingsBySpaceResponse[] = [
  {
    id: 1,
    userNip: "840091",
    spaces: ["CRE.1200.00.090", "CRE.1200.00.250"],
    date: new Date(2025, 4, 14),
    schedule: {
      startTime: "10:00",
      endTime: "11:00",
    },
    assistants: 13,
    usage: 0,
    details: "",
    valid: true,
  },
  {
    id: 2,
    userNip: "840092",
    spaces: ["CRE.1200.00.090"],
    date: new Date(2025, 4, 14),
    schedule: {
      startTime: "9:00",
      endTime: "10:00",
    },
    assistants: 6,
    usage: 2,
    details: "Con portátil",
    valid: false,
  },
];

const getBookingsBySpace = async (id: string): Promise<Booking[]> => {
  // const bookings: GetBookingsBySpaceResponse[] = await api.get(`/api/bookings/space/{id}`);
  const bookings = await new Promise<GetBookingsBySpaceResponse[]>((resolve) =>
    setTimeout(() => resolve(mockBookings), 500)
  );

  return bookings.map(mapGetBookingsBySpaceResponseToBooking);
};

export const getBookingsBySpaceQuery = (id: string) => ({
  queryKey: ["bookings", "space", id],
  queryFn: () => getBookingsBySpace(id),
  staleTime: 1000 * 60 * 5,
});

export const useGetBookingsBySpace = (id: string) =>
  useQuery<Booking[], Error>(getBookingsBySpaceQuery(id));
