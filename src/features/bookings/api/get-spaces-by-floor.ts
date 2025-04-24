import type { FeatureCollection } from "geojson";
import { apiPygeoapi } from "../../../lib/api-client";

export const getSpacesByFloor = async (
  floor: number
): Promise<FeatureCollection> => {
  const params = {
    f: "json",                   // formato JSON
    "filter-lang": "cql-text",   // lenguaje CQL
    // aquí sí construimos la string correctamente
    filter: `altura = '${floor}'`,
  };

  console.log("Antes");
  // El primer genérico es el tipo de datos bruto, el segundo el de retorno
  const data = await apiPygeoapi.get<FeatureCollection, FeatureCollection>(
    "collections/espacios/items",
    { params }
  );
  console.log("Después");
  return data;
};
