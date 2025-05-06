import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { Feature, FeatureCollection } from "geojson";
import { CAMPUS_COORDS, SPACE_TYPE_COLORS } from "../../config/constants";
import { useRef, useEffect } from "react";

interface MapProps {
  spaces: FeatureCollection;
  selectedSpaces?: string[];
  onFeatureClick?: (feature: Feature) => void;
}

export const Map: React.FC<MapProps> = ({
  spaces,
  selectedSpaces = [],
  onFeatureClick,
}) => {
  const geoJsonRef = useRef<L.GeoJSON>(null);

  useEffect(() => {
    const layer = geoJsonRef.current;
    if (!layer) return;
    layer.clearLayers();
    layer.addData(spaces);
  }, [spaces]);

  function getStyle(feature?: Feature): L.PathOptions {
    const props = feature!.properties;
    const catIndex: number = props!.tipo;
    const isReservable: boolean = props!.reservable;
    const isSelected: boolean = selectedSpaces.includes(String(feature!.id));
    const fillColor = SPACE_TYPE_COLORS[catIndex] ?? "#cccccc";

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
        ref={geoJsonRef}
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
