import { useState } from "react";
import { Spinner } from "react-bootstrap";
import BookModal from "../../../features/bookings/components/book-modal";
import { Map } from "../../../components/ui/map";
import { Navbar } from "../../../components/ui/navbar";
import { useGetSpacesByFloor } from "../../../features/bookings/hooks/use-get-spaces-by-floor";
import { FloorSelector } from "../../../components/ui/floor-selector";
import SpaceDetailsModal from "../../../features/spaces/components/space-details-modal";
import { Space } from "../../../features/spaces/types/models";
import type { Feature } from "geojson";
import { BookingList } from "../../../features/bookings/components/booking-list";

function Landing() {
  const [floor, setFloor] = useState(1);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showBookingList, setShowBookingList] = useState(false);
  const [currentSpace, setCurrentSpace] = useState<Space | null>(null);
  const [showSpaceDetailsModal, setShowSpaceDetailsModal] = useState(false);
  const { data: spaces, isLoading, error } = useGetSpacesByFloor(floor);
  const [selectedSpaces, setSelectedSpaces] = useState([]);

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
      if (prev.includes(space.name)) return prev;
      return [...prev, space.name];
    });
    setShowBookingList(true);
    setShowSpaceDetailsModal(false);
  };

  const handleFeatureClick = (feature: Feature) => {
    const props = feature.properties;
    setCurrentSpace({
      // TODO: cambiar según como metan los datos en la BD
      // TODO: añadir si es reservable o no y desactivar el boton de reservar si no lo es
      id: props!.id,
      name: props!.nombre,
      category: props!.uso,
      floor: props!.altura,
      capacity: props!.capacity,
      startTime: props!.startTime,
      endTime: props!.endTime,
    });
    setShowSpaceDetailsModal(true);
  };

  if (isLoading) {
    return (
      <div className="p-5 text-center">
        <Spinner animation="border" /> Cargando espacios...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 text-danger">
        Error al cargar espacios de la planta {floor}.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <FloorSelector floor={floor} setFloor={setFloor} />
      <BookingList
        spaces={selectedSpaces}
        show={showBookingList}
        onRemove={removeSpaceFromBookingList}
        onBook={() => setShowBookModal(true)}
      />
      <Map
        spaces={spaces}
        floor={floor}
        selectedSpaces={selectedSpaces}
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
