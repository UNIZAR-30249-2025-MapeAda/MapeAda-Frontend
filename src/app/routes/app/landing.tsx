import { useMemo, useState } from "react";
import BookModal from "../../../features/bookings/components/book-modal";
import { Map } from "../../../components/ui/map";
import { Navbar } from "../../../components/ui/navbar";
import { FloorSelector } from "../../../components/ui/floor-selector";
import SpaceDetailsModal from "../../../features/spaces/components/space-details-modal";
import { Space } from "../../../features/spaces/types/models";
import type { Feature } from "geojson";
import { BookingList } from "../../../features/bookings/components/booking-list";
import { LoadingIndicator } from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";
import { useGetSpacesByFloor } from "../../../features/spaces/api/get-spaces-by-floor";
import SpaceLegend from "../../../features/spaces/components/space-leyend";

function Landing() {
  const [floor, setFloor] = useState(0);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showBookingList, setShowBookingList] = useState(false);
  const [currentSpace, setCurrentSpace] = useState<Space | null>(null);
  const [showSpaceDetailsModal, setShowSpaceDetailsModal] = useState(false);
  const { data: spaces, isLoading, error } = useGetSpacesByFloor(floor);
  const [selectedSpaces, setSelectedSpaces] = useState<Space[]>([]);
  const selectedSpaceNames = useMemo(() => selectedSpaces.map((s) => s.name), [selectedSpaces]);

  const removeSpaceFromBookingList = (index: number) => {
    setSelectedSpaces((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (updated.length === 0) {
        setShowBookingList(false);
      }
      return updated;
    });
  };

  const addSpaceToBookingList = (space: Space) => {
    setSelectedSpaces((prev) => {
      if (prev.some((s) => s.id === space.id)) return prev;
      return [...prev, space];
    });
    setShowBookingList(true);
    setShowSpaceDetailsModal(false);
  };

  const handleFeatureClick = (feature: Feature) => {
    const props = feature.properties;
    const space: Space = {
      id: String(feature.id),
      name: props!.nombre,
      dimension: props!.tamanyo,
      type: props!.tipo,
      category: props!.categoria,
      floor: props!.planta,
      capacity: props!.capacidad,
      reservable: props!.reservable,
      startTime: props!.hora_inicio,
      endTime: props!.hora_fin,
      ownerType: props!.tipo_propietario,
      ownerId: props!.propietario_id,
    };
    setCurrentSpace(space);
    setShowSpaceDetailsModal(true);
  };

  if (isLoading) {
    return <LoadingIndicator message="Cargando espacios..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={`Error al cargar espacios de la planta ${floor}.`}
      />
    );
  }

  return (
    <>
      <Navbar />
      <FloorSelector floor={floor} setFloor={setFloor} />
      <SpaceLegend />
      <BookingList
        spaces={selectedSpaceNames}
        show={showBookingList}
        onRemove={removeSpaceFromBookingList}
        onBook={() => setShowBookModal(true)}
      />
      <Map
        spaces={spaces!}
        floor={floor}
        selectedSpaces={selectedSpaces.map((s) => s.id)}
        onFeatureClick={handleFeatureClick}
      />
      <BookModal
        spaces={selectedSpaces}
        show={showBookModal}
        handleClose={() => {
          setShowBookModal(false);
        }}
      />
      {currentSpace && (
        <SpaceDetailsModal
          space={currentSpace}
          show={showSpaceDetailsModal}
          handleClose={() => setShowSpaceDetailsModal(false)}
          handleBookSpace={() => {
            addSpaceToBookingList(currentSpace);
          }}
        />
      )}
    </>
  );
}

export default Landing;
