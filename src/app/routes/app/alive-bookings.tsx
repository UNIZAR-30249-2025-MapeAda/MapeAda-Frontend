import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "../../../components/ui/select";
import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  BookingStatus,
  bookingStatuses,
} from "../../../features/bookings/types/enums";
import { AliveBooking } from "../../../features/bookings/types/models";
import { Column, Table } from "../../../components/ui/table";
import { useGetAliveBookings } from "../../../features/bookings/hooks/use-get-alive-bookings";
import { useValidateBookings } from "../../../features/bookings/hooks/use-validate-bookings";
import { useDeleteBooking } from "../../../features/bookings/hooks/use-delete-booking";

const AliveBookings = () => {
  const { data: bookings = [], isLoading, error } = useGetAliveBookings();
  const validateBookingsMutation = useValidateBookings();
  const deleteBookingMutation = useDeleteBooking();

  const [originalStatus, setOriginalStatus] = useState<BookingStatus[]>([]);
  const [currentStatus, setCurrentStatus] = useState<BookingStatus[]>([]);

  const tableColumns: Column<AliveBooking>[] = [
    { header: "ID", accessor: "id" },
    { header: "Usuario", accessor: "userNip" },
    {
      header: "Espacios",
      accessor: "spaces",
      render: (row) => row.spaces.join(", "),
    },
    { header: "Fecha", accessor: "date" },
    {
      header: "Duración",
      accessor: "",
      render: (row) => `${row.startTime} - ${row.endTime}`,
    },
    { header: "Asistentes", accessor: "assistants" },
    { header: "Uso", accessor: "usage" },
    {
      header: "Detalles",
      accessor: "details",
      render: (row) => row.details || "-",
    },
    {
      header: "Estado",
      accessor: "status",
      render: (_, index) => (
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
      ),
    },
    {
      header: "",
      accessor: "",
      render: (row) => (
        <button
          className="btn bg-danger shadow"
          onClick={() => deleteBooking(row.id)}
        >
          <FontAwesomeIcon icon={faTrash} color="white" />
        </button>
      ),
    },
  ];

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
    const changes = bookings
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

    if (changes.length === 0) return;

    validateBookingsMutation.mutate(changes, {
      onSuccess: () => {
        setOriginalStatus([...currentStatus]);
        Swal.fire("¡Guardados!", "Los cambios se han guardado.", "success");
      },
      onError: (err) => {
        console.error("Error al guardar los cambios", err);
        Swal.fire("Error", "No se han podido guardar los cambios.", "error");
      },
    });
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
        deleteBookingMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire("¡Eliminada!", "La reserva fue eliminada.", "success");
          },
          onError: (err) => {
            console.error("Error al eliminar la reserva", err);
            Swal.fire("Error", "No se pudo eliminar la reserva.", "error");
          },
        });
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
      <Table data={bookings} columns={tableColumns} keyField="id" />
    </div>
  );
};

export default AliveBookings;
