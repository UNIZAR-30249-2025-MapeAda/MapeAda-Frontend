import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { BuildingSchedule } from "../types/models";
import { GetBuildingScheduleByDateResponse } from "../../../types/api";

const mockSchedule: BuildingSchedule = {
  isHoliday: false,
  schedule: {
    startTime: "8:00",
    endTime: "22:00",
  },
};

const getBuildingScheduleByDate = async (): Promise<BuildingSchedule> => {
  // const schedule: GetBuildingScheduleByDateResponse = await api.get("/api/building/schedule");
  const schedule = await new Promise<GetBuildingScheduleByDateResponse>(
    (resolve) => setTimeout(() => resolve(mockSchedule), 500)
  );

  return schedule;
};

export const useGetBuildingScheduleByDate = (
  options?: UseQueryOptions<BuildingSchedule, Error>
) => {
  return useQuery<BuildingSchedule, Error>({
    queryKey: ["building", "scheduleByDate"],
    queryFn: getBuildingScheduleByDate,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
