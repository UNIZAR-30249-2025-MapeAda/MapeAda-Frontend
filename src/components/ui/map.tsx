import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { Feature, FeatureCollection } from "geojson";
import { CAMPUS_COORDS, CATEGORY_COLORS } from "../../config/constants";

interface MapProps {
  spaces: FeatureCollection;
  floor: number;
  selectedSpaces?: string[];
  onFeatureClick?: (feature: Feature) => void;
}

export const Map: React.FC<MapProps> = ({
  spaces,
  floor,
  selectedSpaces = [],
  onFeatureClick,
}) => {
  function getStyle(feature?: Feature): L.PathOptions {
    const props = feature!.properties;
    const catIndex: number = props!.categoria;
    const isReservable: boolean = props!.reservable;
    const isSelected: boolean = selectedSpaces.includes(String(feature!.id));
    const fillColor = CATEGORY_COLORS[catIndex] ?? '#cccccc';
  
    return {
      fillColor,
      fillOpacity: isReservable ? (isSelected ? 1 : 0.5) : 0.2,
      color: fillColor,
      weight: isSelected ? 3 : 1,
      dashArray: isReservable ? undefined : "4",
    };
  }

  return (
    <MapContainer
      center={CAMPUS_COORDS}
      zoom={19}
      dragging={false} // arrastre
      scrollWheelZoom={false} // rueda del ratón
      doubleClickZoom={false} // doble clic
      touchZoom={false} // gestos táctiles
      boxZoom={false} // zoom por recuadro
      keyboard={false} // flechas y +/-
      zoomControl={false} // controla el + / – UI
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        key={floor}
        data={spaces}
        style={getStyle}
        onEachFeature={(feature, layer) => {
          layer.on("click", () => {
            if (onFeatureClick) {
              onFeatureClick(feature as Feature);
            }
          });
        }}
      />
    </MapContainer>
  );
};
