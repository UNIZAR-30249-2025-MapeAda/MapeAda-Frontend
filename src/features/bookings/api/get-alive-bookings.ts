import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { QueryConfig } from "../../../lib/react-query";
import { AliveBooking } from "../types/booking";
import { AliveBookingResponseDto } from "../../../types/api";
import { mapAliveBookingResponseDtoToAliveBooking } from "../utils/mappers";

const mockBookings: AliveBookingResponseDto[] = [
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

export const getAliveBookings = async (): Promise<AliveBooking[]> => {
  // const bookings: AliveBookingResponseDto[] = await api.get("/bookings/alive");
  const bookings = await new Promise<AliveBookingResponseDto[]>((resolve) =>
    setTimeout(() => resolve(mockBookings), 500)
  );

  return bookings.map(mapAliveBookingResponseDtoToAliveBooking);
};

export const getAliveBookingsQueryOptions = () =>
  queryOptions({
    queryKey: ["bookings", "alive"],
    queryFn: getAliveBookings,
  });

type UseAliveBookingsOptions = {
  queryConfig?: QueryConfig<typeof getAliveBookingsQueryOptions>;
};

export const useAliveBookings = ({
  queryConfig,
}: UseAliveBookingsOptions = {}) => {
  return useQuery({
    ...getAliveBookingsQueryOptions(),
    ...queryConfig,
  });
};
