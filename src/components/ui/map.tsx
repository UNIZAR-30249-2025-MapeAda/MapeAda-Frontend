import { FC } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const CAMPUS_COORDS: [number, number] = [41.6834, -0.8885];

export const Map: FC = () => {
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
    </MapContainer>
  );
};
