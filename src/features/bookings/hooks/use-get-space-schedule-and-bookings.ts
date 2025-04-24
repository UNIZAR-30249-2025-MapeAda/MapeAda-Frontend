import { useQuery } from "@tanstack/react-query";
import { SpaceScheduleAndBookingsResponseDto } from "../../../types/api";
import { getSpaceScheduleAndBookings } from "../api/get-space-schedule-and-bookings";

const mockSchedule: SpaceScheduleAndBookingsResponseDto = {
  defaultSchedule: [
    { dayOfWeek: 1, startTime: "08:00", endTime: "21:00" },
    { dayOfWeek: 2, startTime: "08:00", endTime: "21:00" },
    { dayOfWeek: 3, startTime: "08:00", endTime: "21:00" },
    { dayOfWeek: 4, startTime: "08:00", endTime: "21:00" },
    { dayOfWeek: 5, startTime: "08:00", endTime: "21:00" },
  ],
  restrictions: [
    {
      date: "2025-06-16",
      startTime: "10:00",
      endTime: "18:00",
      isHoliday: false,
    },
    {
      date: "2025-05-30",
      startTime: "08:00",
      endTime: "12:00",
      isHoliday: false,
    },
    { date: "2025-06-20", startTime: "", endTime: "", isHoliday: true },
  ],
  bookings: [
    { date: "2025-04-25", startTime: "10:00", endTime: "11:00" },
    { date: "2025-05-30", startTime: "09:00", endTime: "10:00" },
    { date: "2025-06-16", startTime: "14:00", endTime: "16:00" },
  ],
};

export const useGetSpaceScheduleAndBookings = (spaceIds: string[]) =>
  useQuery<SpaceScheduleAndBookingsResponseDto, Error>({
    queryKey: ["spaceScheduleAndBookings", { spaceIds }],
    //queryFn: () => getSpaceScheduleAndBookings(spaceIds),
    queryFn: () =>
      new Promise<SpaceScheduleAndBookingsResponseDto>((resolve) =>
        setTimeout(() => resolve(mockSchedule), 500)
      ),
    enabled: spaceIds.length > 0,
    staleTime: 1000 * 60 * 5, // cache 5 min
  });
