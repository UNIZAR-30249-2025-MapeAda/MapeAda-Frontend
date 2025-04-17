import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "../../../components/ui/select";
import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { getAliveBookingsQueryOptions } from "../../../features/bookings/api/get-alive-bookings";
import {
  BookingStatus,
  bookingStatuses,
} from "../../../features/bookings/types/booking";
import { validateBookings } from "../../../features/bookings/api/validate-booking";

const AliveBookings = () => {
  const {
    data: bookings = [],
    isLoading,
    error,
    refetch,
  } = useQuery(getAliveBookingsQueryOptions());

  const [originalStatus, setOriginalStatus] = useState<BookingStatus[]>([]);
  const [currentStatus, setCurrentStatus] = useState<BookingStatus[]>([]);

  useEffect(() => {
    if (bookings.length) {
      const statuses = bookings.map((b) => b.status);
      setOriginalStatus(statuses);
      setCurrentStatus(statuses);
    }
  }, [bookings]);

  const handleStatusChange = (index: number, newStatus: BookingStatus) => {
    const updated = [...currentStatus];
    updated[index] = newStatus;
    setCurrentStatus(updated);
  };

  const saveChanges = async () => {
    const changed = bookings
      .map((booking, index) => ({
        id: booking.id,
        oldStatus: originalStatus[index],
        newStatus: currentStatus[index],
      }))
      .filter(({ oldStatus, newStatus }) => oldStatus !== newStatus)
      .map(({ id, newStatus }) => ({
        id,
        status: bookingStatuses.indexOf(newStatus),
      }));

    try {
      if (changed.length > 0) {
        await validateBookings(changed);
        setOriginalStatus([...currentStatus]);
        Swal.fire({
          title: "Guardado",
          text: "Los cambios fueron guardados exitosamente.",
          icon: "success",
        });
      }
    } catch (err) {
      console.error("Error al guardar los cambios", err);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al guardar los cambios.",
        icon: "error",
      });
    }
  };

  const deleteBooking = async (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger ms-2",
        cancelButton: "btn btn-secondary",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBooking(id);
          await refetch();
          Swal.fire("¡Eliminada!", "La reserva fue eliminada.", "success");
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "No se pudo eliminar la reserva.", "error");
        }
      }
    });
  };

  const hasChanges =
    JSON.stringify(originalStatus) !== JSON.stringify(currentStatus);

  if (isLoading)
    return (
      <div className="p-5">
        <Spinner animation="border" /> Loading...
      </div>
    );

  if (error)
    return (
      <div className="p-5 text-danger">Error while loading alive bookings.</div>
    );

  return (
    <div className="p-5">
      <div className="d-flex justify-content-between mb-4">
        <h1>Reservas vivas</h1>
        <div className="d-flex align-items-center">
          {hasChanges && (
            <Button
              variant="warning"
              className="shadow rounded-pill"
              onClick={saveChanges}
            >
              Guardar cambios
            </Button>
          )}
        </div>
      </div>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr className="align-middle">
            <th scope="col">ID</th>
            <th scope="col">Usuario</th>
            <th scope="col">Espacios</th>
            <th scope="col">Fecha</th>
            <th scope="col">Duración</th>
            <th scope="col">Asistentes</th>
            <th scope="col">Uso</th>
            <th scope="col">Detalles</th>
            <th scope="col">Estado</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking.id} className="align-middle">
              <th scope="row">{booking.id}</th>
              <td>{booking.userNip}</td>
              <td>{booking.places.join(", ")}</td>
              <td>{booking.date}</td>
              <td>{`${booking.startTime} - ${booking.endTime}`}</td>
              <td>{booking.assistants}</td>
              <td>{booking.usage}</td>
              <td>{booking.details || "-"}</td>
              <td>
                <Select
                  options={bookingStatuses.map((status) => ({
                    value: status,
                    label: status,
                  }))}
                  initialValue={currentStatus[index]}
                  onChange={(newValue) =>
                    handleStatusChange(index, newValue as BookingStatus)
                  }
                />
              </td>
              <td>
                <button
                  className="btn bg-transparent"
                  onClick={() => deleteBooking(index)}
                >
                  <FontAwesomeIcon icon={faTrash} color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AliveBookings;
