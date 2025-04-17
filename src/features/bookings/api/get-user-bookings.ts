import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { QueryConfig } from "../../../lib/react-query";
import { UserBookingResponseDto } from "../../../types/api";
import { UserBooking } from "../types/booking";
import { mapUserBookingResponseDtoToUserBooking } from "../utils/mappers";

const mockBookings: UserBookingResponseDto[] = [
  {
    id: 1,
    userNip: "840091",
    places: ["L0.01", "A.02"],
    date: "13/05/2025",
    startTime: "10:00",
    endTime: "11:00",
    assistants: 13,
    usage: 0,
    details: "",
    status: 0,
  },
  {
    id: 2,
    userNip: "840092",
    places: ["L1.03"],
    date: "14/05/2025",
    startTime: "09:00",
    endTime: "10:30",
    assistants: 6,
    usage: 2,
    details: "Con portátil",
    status: 0,
  },
];

export const getUserBookings = async (): Promise<UserBooking[]> => {
  // const bookings: UserBookingResponseDto[] = await api.get("/bookings/user");
  const bookings = await new Promise<UserBookingResponseDto[]>((resolve) =>
    setTimeout(() => resolve(mockBookings), 500)
  );

  return bookings.map(mapUserBookingResponseDtoToUserBooking);
};

export const getUserBookingsQueryOptions = () =>
  queryOptions({
    queryKey: ["bookings", "user"],
    queryFn: getUserBookings,
  });

type UseUserBookingsOptions = {
  queryConfig?: QueryConfig<typeof getUserBookingsQueryOptions>;
};

export const useAliveBookings = ({
  queryConfig,
}: UseUserBookingsOptions = {}) => {
  return useQuery({
    ...getUserBookingsQueryOptions(),
    ...queryConfig,
  });
};
