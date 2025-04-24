import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { Feature, FeatureCollection } from "geojson";
import { PathOptions } from "leaflet";
import { SpaceCategory } from "../../features/spaces/types/enums";

const CAMPUS_COORDS: [number, number] = [41.6834, -0.8885];

interface MapProps {
  spaces: FeatureCollection;
  floor: number;
  selectedSpaces?: string[];
  onFeatureClick?: (feature: Feature) => void;
}

const categoryColors: Record<SpaceCategory, string> = {
  Laboratorio:    "#FF6666",
  Despacho:       "#FFB266",
  Aula:           "#66CCFF",
  Seminario:      "#CC66FF",
  "Sala común":   "#66FF66",
  "Salón de actos":"#FF66CC",
  "Sala de reunión":"#66FFFF",
  "Sala informática":"#FFFF66",
};

export const Map: React.FC<MapProps> = ({
  spaces,
  floor,
  selectedSpaces = [],
  onFeatureClick,
}) => {
  const styleFeature = (feature: Feature): PathOptions => {
    const props = feature.properties as any;
    const uso = props.uso as SpaceCategory | undefined;
    const name = props.nombre as string | undefined;

    const fillColor = uso && categoryColors[uso]
      ? categoryColors[uso]
      : "#CCCCCC";

    const isSelected = name ? selectedSpaces.includes(name) : false;

    return {
      fillColor,
      fillOpacity: isSelected ? 0.75 : 0.4,
      color: isSelected ? "#000000" : "#444444",
      weight: isSelected ? 3 : 1,
    };
  };

  return (
    <MapContainer
      center={CAMPUS_COORDS}
      zoom={19}
      dragging={false} // desactiva el arrastre
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
        style={styleFeature}
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
