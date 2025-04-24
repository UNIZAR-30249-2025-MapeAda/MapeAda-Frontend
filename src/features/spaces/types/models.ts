export interface Space {
  id: string;
  properties: {
    id: string;
    name: string;
    floor: number;
    category: string;
  };
  geometry: GeoJSON.Geometry;
}
