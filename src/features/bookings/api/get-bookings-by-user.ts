import { useQuery } from "@tanstack/react-query";
import { GetBookingsByUserResponse } from "../../../types/api";
import { Booking } from "../types/models";
import { mapGetBookingsByUserResponseToBooking } from "../utils/mappers";

const mockBookings: GetBookingsByUserResponse[] = [
  {
    id: 1,
    userNip: "840091",
    spaces: ["CRE.1200.00.090", "CRE.1200.00.250"],
    date: new Date(2025, 4, 12),
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

const getBookingsByUser = async (nip: string): Promise<Booking[]> => {
  // const bookings: GetBookingsByUserResponse[] = await api.get(`/api/bookings/user/{nip}`);
  const bookings = await new Promise<GetBookingsByUserResponse[]>((resolve) =>
    setTimeout(() => resolve(mockBookings), 500)
  );

  return bookings.map(mapGetBookingsByUserResponseToBooking);
};

export const useGetBookingsByUser = (nip: string) => {
  return useQuery<Booking[], Error>({
    queryKey: ["bookings", "user", nip],
    queryFn: () => getBookingsByUser(nip),
    staleTime: 1000 * 60 * 5,
  });
};
