import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { FeatureCollection } from "geojson";

const CAMPUS_COORDS: [number, number] = [41.6834, -0.8885];

interface MapProps {
  spaces: FeatureCollection;
}

export const Map: React.FC<MapProps> = ({
  spaces,
}) => {
  return (
    <MapContainer
      center={CAMPUS_COORDS}
      zoom={19}
      zoomControl={false}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={spaces}
        onEachFeature={(feature, layer) => {
          layer.bindPopup(feature.properties?.id || 'Sin nombre');
        }}
      />
    </MapContainer>
  );
};
