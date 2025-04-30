import type { FeatureCollection } from "geojson";
import { apiPygeoapi } from "../../../lib/api-client";
import { useQuery } from "@tanstack/react-query";

const getSpacesByFloor = async (floor: number): Promise<FeatureCollection> => {
  const params = {
    f: "json",
    "filter-lang": "cql-text",
    filter: `planta = '${floor}'`,
  };

  const spaces = await apiPygeoapi.get<FeatureCollection, FeatureCollection>(
    "/collections/espacios/items",
    { params }
  );
  return spaces;
};

export const useGetSpacesByFloor = (floor: number) => {
  return useQuery<FeatureCollection, Error>({
    queryKey: ["spaces", "floor", floor],
    queryFn: () => getSpacesByFloor(floor),
    enabled: floor >= 0 && floor <= 4,
    staleTime: 1000 * 60 * 5,
  });
};
