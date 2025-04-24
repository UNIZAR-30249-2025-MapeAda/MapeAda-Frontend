import type { FeatureCollection } from "geojson";
import { apiPygeoapi } from "../../../lib/api-client";

export const getSpacesByFloor = async (
  floor: number
): Promise<FeatureCollection> => {
  const params = {
    f: "json",
    "filter-lang": "cql-text",
    filter: `altura = '${floor}'`,
  };

  const data = await apiPygeoapi.get<FeatureCollection, FeatureCollection>(
    "/collections/espacios/items",
    { params }
  );
  return data;
};
