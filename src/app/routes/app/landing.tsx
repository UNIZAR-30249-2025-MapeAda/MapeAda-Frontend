import { useEffect, useMemo, useState } from "react";
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
import { useGetSpaces } from "../../../features/spaces/api/get-spaces";
import SpaceLegend from "../../../features/spaces/components/space-leyend";
import {
  spaceCategories,
  SpaceCategory,
} from "../../../features/spaces/types/enums";
import emitter from "../../../utils/emitter";
import { useGetAllBookings } from "../../../features/bookings/api/get-all-bookings";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { paths } from "../../../config/paths";
import { useUser } from "../../../lib/auth";

function Landing() {
  const {
    data: bookings = [],
    isLoading: isLoadingBookings,
    error: errorBookings,
  } = useGetAllBookings();
  const [floor, setFloor] = useState(0);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showBookingList, setShowBookingList] = useState(false);
  const [currentSpace, setCurrentSpace] = useState<Space | null>(null);
  const [showSpaceDetailsModal, setShowSpaceDetailsModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<SpaceCategory | undefined>();
  const [minCapacity, setMinCapacity] = useState<number | undefined>();
  const user = useUser();
  const filters = useMemo(
    () => ({
      planta: floor.toString(),
      nombre: searchText || undefined,
      categoria: category ? spaceCategories.indexOf(category) : undefined,
      capacidadMaxima: minCapacity,
    }),
    [floor, searchText, category, minCapacity]
  );
  const { data: spaces, isLoading, error } = useGetSpaces(filters);
  const [selectedSpaces, setSelectedSpaces] = useState<Space[]>([]);
  const selectedSpaceNames = useMemo(
    () => selectedSpaces.map((s) => s.nombre),
    [selectedSpaces]
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => {
      setSelectedSpaces([]);
      setShowBookingList(false);
    };
    emitter.on("bookingCreated", handler);
    return () => {
      emitter.off("bookingCreated", handler);
    };
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      const deletedAndInvalidBookings = bookings.filter(
        (b) => !b.deletedAt || !b.valida || !b.invalidSince
      );
      if (deletedAndInvalidBookings.length > 0) {
        Swal.fire({
          title: "¡Atención!",
          text: "Tienes reservas potencialmente inválidas y/o eliminadas",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ir a mis reservas",
          cancelButtonText: "Revisar más tarde",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(paths.app.bookings.user.getHref(user.data!.nip));
          }
        });
      }
    }
  }, [bookings]);

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
      nombre: props!.nombre,
      tamanyo: props!.tamanyo,
      tipo: props!.tipo,
      categoria: props!.categoria,
      planta: props!.planta,
      capacidad: props!.capacidad,
      reservable: props!.reservable,
      horario: {
        inicio: props?.hora_inicio,
        fin: props?.hora_fin,
      },
      propietarios: [],
    };
    setCurrentSpace(space);
    setShowSpaceDetailsModal(true);
  };

  if (isLoading || isLoadingBookings) {
    return <LoadingIndicator message="Cargando espacios..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={`Error al cargar espacios de la planta ${floor}.`}
      />
    );
  }

  if (errorBookings) {
    return (
      <ErrorMessage
        message={"Error obteniendo las reservas del usuario."}
      />
    );
  }

  return (
    <>
      <Navbar
        searchText={searchText}
        setSearchText={setSearchText}
        category={category}
        setCategory={setCategory}
        minCapacity={minCapacity}
        setMinCapacity={setMinCapacity}
      />
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
