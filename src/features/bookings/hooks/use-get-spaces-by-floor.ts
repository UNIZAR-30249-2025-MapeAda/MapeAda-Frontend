import { useQuery } from "@tanstack/react-query";
import { getSpacesByFloor } from "../api/get-spaces-by-floor";
import type { FeatureCollection } from "geojson";

export const useGetSpacesByFloor = (floor: number) => {
  return useQuery<FeatureCollection, Error>({
    queryKey: ["spaces", floor],
    queryFn: () => getSpacesByFloor(floor),
    enabled: floor >= 0,
    staleTime: 1000 * 60 * 5,
    placeholderData: { type: "FeatureCollection", features: [] },
  });
};
