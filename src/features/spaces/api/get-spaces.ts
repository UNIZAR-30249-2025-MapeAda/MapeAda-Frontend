import type { FeatureCollection } from "geojson";
import { apiPygeoapi } from "../../../lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { GetSpacesByFiltersParams } from "../../../types/api";

const getSpaces = async (
  filters: GetSpacesByFiltersParams
): Promise<FeatureCollection> => {
  const conditions = [`planta = '${filters.planta}'`];

  if (filters.nombre) {
    conditions.push(`nombre ILIKE '%${filters.nombre}%'`);
  }

  if (filters.categoria !== undefined) {
    conditions.push(`categoria = ${filters.categoria}`);
  }

  if (filters.capacidadMaxima !== undefined) {
    conditions.push(`capacidad >= ${filters.capacidadMaxima}`);
  }

  const params = {
    f: "json",
    "filter-lang": "cql-text",
    filter: conditions.join(" AND "),
  };

  const spaces = await apiPygeoapi.get<FeatureCollection, FeatureCollection>(
    "/collections/espacios/items",
    { params }
  );
  return spaces;
};

export const useGetSpaces = (filters: GetSpacesByFiltersParams) => {
  return useQuery<FeatureCollection, Error>({
    queryKey: [
      "spaces",
      filters.planta,
      filters.nombre ?? "",
      filters.categoria ?? "none",
      filters.capacidadMaxima ?? "none",
    ],
    queryFn: () => getSpaces(filters),
    enabled:
      Number.parseInt(filters.planta) >= 0 &&
      Number.parseInt(filters.planta) <= 4,
    staleTime: 0,
  });
};
