import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Building } from "../types/models";
import { GetBuildingResponse } from "../../../types/api";
import { api } from "../../../lib/api-client";

const getBuilding = async (): Promise<Building> => {
  const calendar: GetBuildingResponse = await api.get("/api/building");

  return calendar as unknown as Building;
};

export const useGetBuilding = (options?: UseQueryOptions<Building, Error>) => {
  return useQuery<Building, Error>({
    queryKey: ["building"],
    queryFn: getBuilding,
    staleTime: 0,
    ...options,
  });
};
