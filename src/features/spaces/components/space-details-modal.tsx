import React from "react";
import { Modal } from "react-bootstrap";
import { Space } from "../types/models";
import { spaceCategories } from "../types/enums";
import { ErrorMessage } from "../../../components/errors/error-message";
import { LoadingIndicator } from "../../../components/ui/loading-indicator";
import { useGetBuilding } from "../../building/api/get-buiding";

export interface SpaceDetailsModalProps {
  space: Space;
  show: boolean;
  handleClose: () => void;
  handleBookSpace: () => void;
}

const SpaceDetailsModal: React.FC<SpaceDetailsModalProps> = ({
  space,
  show,
  handleClose,
  handleBookSpace,
}) => {
  const shouldFetchSchedule = space.startTime === null;
  const {
    data: building,
    isLoading,
    error,
  } = useGetBuilding({
    queryKey: ["shouldFetchSchedule"],
    enabled: shouldFetchSchedule,
  });

  const getScheduleForToday = (space: Space): string => {
    if (space.startTime) {
      return `${space.startTime} - ${space.endTime}`;
    }

    const today = new Date();
    const dayOfWeek = (today.getDay() + 6) % 7; // Convierte 0=Sunday...6=Saturday a 0=Monday...6=Sunday

    const isHoliday =
      !building?.calendar.default.week[dayOfWeek] ||
      building?.calendar.restrictions.some(
        (r) =>
          new Date(r.date).toDateString() === today.toDateString() &&
          r.isHoliday
      );

    if (isHoliday) {
      return "Día festivo";
    }

    return `${building?.calendar.default.schedule.startTime} - ${building?.calendar.default.schedule.endTime}`;
  };

  if (isLoading) {
    return (
      <LoadingIndicator message="Obteniendo el horario del Ada Byron..." />
    );
  }

  if (error) {
    return (
      <ErrorMessage message="Error al obtener el horario del Ada Byron." />
    );
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="modal-lg"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton />
      <Modal.Body className="text-center mx-4" style={{ height: "500px" }}>
        <h1>{space.name}</h1>
        <div className="d-flex">
          <div className="col-3"></div>
          <div className="d-flex flex-column text-start p-4 gap-3 col">
            <div>
              <strong>ID: </strong>
              <span>{space.id}</span>
            </div>
            <div>
              <strong>Reservable: </strong>
              <span>{space.reservable ? "Sí" : "No"}</span>
            </div>
            <div>
              <strong>Tipo: </strong>
              <span>{spaceCategories[Number(space.type)]}</span>
            </div>
            <div>
              <strong>Categoría: </strong>
              <span>{spaceCategories[Number(space.category)]}</span>
            </div>
            <div>
              <strong>Planta: </strong>
              <span>{space.floor}</span>
            </div>
            <div>
              <strong>Número máximo de ocupantes: </strong>
              <span>{space.capacity}</span>
            </div>
            <div>
              <strong>Propietario: </strong>
              <span>{space.ownerId}</span>
            </div>
            <div>
              <strong>Horario: </strong>
              <span>{getScheduleForToday(space)}</span>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center gap-3">
        <button
          className="btn btn-dark px-3"
          type="button"
          onClick={handleBookSpace}
          disabled={!space.reservable}
        >
          Añadir a la reserva
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default SpaceDetailsModal;
