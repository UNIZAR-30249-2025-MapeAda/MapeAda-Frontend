import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Building } from "../types/models";
import { GetBuildingResponse } from "../../../types/api";

const mockSchedule: Building = {
  maxUse: 90,
  defaultCalendar: {
    week: [true, true, true, true, true, false, false],
    schedule: {
      startTime: "8:00",
      endTime: "22:00",
    },
  },
  calendarRestrictions: [
    {
      date: new Date(),
      isHoliday: false,
      schedule: {
        startTime: "8:00",
        endTime: "18:00",
      },
    },
    {
      date: new Date(2025, 4, 12),
      isHoliday: true,
    },
  ],
};

const getBuilding = async (): Promise<Building> => {
  // const calendar: GetBuildingResponse = await api.get("/api/building");
  const calendar = await new Promise<GetBuildingResponse>((resolve) =>
    setTimeout(() => resolve(mockSchedule), 500)
  );

  return calendar;
};

export const useGetBuilding = (
  options?: UseQueryOptions<Building, Error>
) => {
  return useQuery<Building, Error>({
    queryKey: ["building"],
    queryFn: getBuilding,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
