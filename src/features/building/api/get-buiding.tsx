import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Building } from "../types/models";
import { GetBuildingResponse } from "../../../types/api";
import { api } from "../../../lib/api-client";

const getBuilding = async (): Promise<Building> => {
  const calendar: GetBuildingResponse = await api.get("/api/building");

  return calendar;
};

export const useGetBuilding = (options?: UseQueryOptions<Building, Error>) => {
  return useQuery<Building, Error>({
    queryKey: ["building"],
    queryFn: getBuilding,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
