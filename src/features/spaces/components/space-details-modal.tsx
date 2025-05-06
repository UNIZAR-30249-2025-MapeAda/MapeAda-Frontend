import React from "react";
import { Modal } from "react-bootstrap";
import { Space } from "../types/models";
import { spaceTypes } from "../types/enums";
import { ErrorMessage } from "../../../components/errors/error-message";
import { LoadingIndicator } from "../../../components/ui/loading-indicator";
import { useGetBuilding } from "../../building/api/get-building";
import { Building } from "../../building/types/models";
import { useUser } from "../../../lib/auth";
import { Link } from "react-router";
import { paths } from "../../../config/paths";
import { formatHM } from "../../../utils/format";
import { ADMIN_ROLE } from "../../auth/types/enums";

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
  const user = useUser();
  const shouldFetchSchedule = space.horario.inicio === undefined;
  const {
    data: building,
    isLoading,
    error,
  } = useGetBuilding({
    queryKey: ["shouldFetchSchedule"],
    enabled: shouldFetchSchedule,
  });

  const getBuildingScheduleForToday = (building?: Building): string => {
    const today = new Date();
    const dayOfWeek = (today.getDay() + 6) % 7; // 0 = Monday ... 6 = Sunday

    const { diasPorDefecto, horariosApertura } = building!.calendarioApertura;

    const mask = 1 << dayOfWeek;
    const isDefaultWorkday = (diasPorDefecto & mask) !== 0;

    const override = horariosApertura.find(
      (r) => new Date(r.date).toDateString() === today.toDateString()
    );

    if (override) {
      if (override.isHoliday) {
        return "Día festivo";
      }
      if (override.schedule) {
        const { inicio, fin } = override.schedule;
        return `${formatHM(inicio)} - ${formatHM(fin)}`;
      }
    }

    if (!isDefaultWorkday) {
      return "Día festivo";
    }

    const { inicio: defInicio, fin: defFin } =
      building!.calendarioApertura.intervaloPorDefecto;
    return `${formatHM(defInicio)} - ${formatHM(defFin)}`;
  };

  if (isLoading) {
    return (
      <LoadingIndicator message="Obteniendo el horario del Ada Byron..." />
    );
  }

  if (error || !building) {
    return (
      <ErrorMessage message="Error al obtener el horario del Ada Byron." />
    );
  }

  const scheduleToday = shouldFetchSchedule
    ? getBuildingScheduleForToday(building)
    : `${space.horario.inicio} - ${space.horario.fin}`;

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
        <h1>{space.nombre}</h1>
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
              <span>{spaceTypes[Number(space.tipo)]}</span>
            </div>
            <div>
              <strong>Categoría: </strong>
              <span>{spaceTypes[Number(space.categoria)]}</span>
            </div>
            <div>
              <strong>Planta: </strong>
              <span>{space.planta}</span>
            </div>
            <div>
              <strong>Número máximo de ocupantes: </strong>
              <span>{space.capacidad}</span>
            </div>
            <div>
              <strong>Horario de hoy: </strong>
              <span>{scheduleToday}</span>
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
        {ADMIN_ROLE.includes(user.data!.rol) && (
          <Link
            to={paths.app.spaces.getHref(space.id)}
            className="btn btn-warning px-3"
          >
            <span>Editar</span>
          </Link>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default SpaceDetailsModal;
