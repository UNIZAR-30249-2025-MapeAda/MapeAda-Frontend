import { Booking } from "../types/models";
import { GetAllBookingsResponse } from "../../../types/api";
import { mapGetAllBookingsResponseToBooking } from "../utils/mappers";
import { useQuery } from "@tanstack/react-query";

const mockBookings: GetAllBookingsResponse[] = [
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

const getAllBookings = async (): Promise<Booking[]> => {
  // const bookings: GetAllBookingsResponse[] = await api.get("/api/bookings");
  const bookings = await new Promise<GetAllBookingsResponse[]>((resolve) =>
    setTimeout(() => resolve(mockBookings), 500)
  );

  return bookings.map(mapGetAllBookingsResponseToBooking);
};

export const useGetAllBookings = () => {
  return useQuery<Booking[], Error>({
    queryKey: ["bookings", "all"],
    queryFn: getAllBookings,
    staleTime: 1000 * 60 * 5,
  });
};
