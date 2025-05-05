import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Booking } from "../../../features/bookings/types/models";
import { Column, Table } from "../../../components/ui/table";
import { LoadingIndicator } from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";
import { useDeleteBooking } from "../../../features/bookings/api/delete-booking";
import { useGetAllBookings } from "../../../features/bookings/api/get-all-bookings";
import { usePatchBooking } from "../../../features/bookings/api/patch-booking";
import { Select } from "../../../components/ui/select";
import { Link } from "react-router";
import { paths } from "../../../config/paths";
import {
  BookingUsage,
  bookingUsages,
} from "../../../features/bookings/types/enums";
import { format } from "date-fns";
import { showApiError } from "../../../utils/error";

const AllBookings = () => {
  const { data = [], isLoading, error } = useGetAllBookings();
  const bookings = data.filter((b) => b.deletedAt == null);
  const patchBookingMutation = usePatchBooking();
  const deleteBookingMutation = useDeleteBooking();
  const [originalValid, setOriginalValid] = useState<boolean[]>([]);
  const [currentValid, setCurrentValid] = useState<boolean[]>([]);

  const validOptions = [
    { value: "true", label: "Válida" },
    { value: "false", label: "Potencialmente inválida" },
  ];

  const usageStyles: Record<
    BookingUsage,
    { text: string; bg: string; border: string }
  > = {
    Docencia: {
      text: "text-primary",
      bg: "bg-primary bg-opacity-10",
      border: "border-primary border-opacity-10",
    },
    Investigación: {
      text: "text-success",
      bg: "bg-success bg-opacity-10",
      border: "border-success border-opacity-10",
    },
    Gestión: {
      text: "text-warning",
      bg: "bg-warning bg-opacity-10",
      border: "border-warning border-opacity-10",
    },
    Otros: {
      text: "text-secondary",
      bg: "bg-secondary bg-opacity-10",
      border: "border-secondary border-opacity-10",
    },
  };

  const tableColumns: Column<Booking>[] = [
    { header: "ID", accessor: "id" },
    { header: "Usuario", accessor: "usuario" },
    {
      header: "Espacios",
      accessor: "espacios",
      render: (row) => row.espacios.join(", "),
    },
    {
      header: "Fecha",
      accessor: "periodo.inicio",
      render: (row) => format(new Date(row.periodo.inicio), "dd/MM/yyyy"),
    },
    {
      header: "Duración",
      accessor: "",
      render: (row) => {
        const inicio = new Date(row.periodo.inicio);
        const fin = new Date(row.periodo.fin);

        const horaInicio = format(inicio, "HH:mm");
        const horaFin = format(fin, "HH:mm");
        return `${horaInicio} - ${horaFin}`;
      },
    },
    { header: "Asistentes", accessor: "asistentes" },
    {
      header: "Uso",
      accessor: "uso",
      render: (row) => {
        const bookingUsage = bookingUsages[Number(row.uso)];
        const styles = usageStyles[bookingUsage] ?? {
          text: "text-dark",
          bg: "bg-light",
          border: "border-dark border-opacity-10",
        };

        return (
          <small
            className={`
            px-2 py-1 fw-semibold
            rounded
            ${styles.text}
            ${styles.bg}
            ${styles.border}
          `}
          >
            {bookingUsage}
          </small>
        );
      },
    },
    {
      header: "Detalles",
      accessor: "observaciones",
      render: (row) => row.observaciones || "-",
    },
    {
      header: "Validez",
      accessor: "valida",
      render: (_, index) => {
        return (
          <Select
            options={validOptions}
            initialValue={currentValid[index] ? "true" : "false"}
            onChange={(newValue) => handleValidChange(index, newValue)}
          />
        );
      },
    },
    {
      header: "",
      accessor: "",
      render: (row) => (
        <button
          className="btn btn-danger shadow"
          onClick={() => deleteBooking(row.id)}
        >
          <FontAwesomeIcon icon={faTrash} color="white" />
        </button>
      ),
    },
  ];

  useEffect(() => {
    if (bookings.length > 0 && currentValid.length === 0) {
      const valids = bookings.map((b) => b.valida);
      setOriginalValid(valids);
      setCurrentValid(valids);
    }
  }, [bookings, currentValid.length]);

  const handleValidChange = (index: number, newValue: string) => {
    const updated = [...currentValid];
    updated[index] = newValue === "true";
    setCurrentValid(updated);
  };

  const saveChanges = async () => {
    const changes = bookings
      .map((booking, index) => ({
        id: booking.id,
        old: originalValid[index],
        current: currentValid[index],
      }))
      .filter(({ old, current }) => old !== current)
      .map(({ id, current }) => ({ id, valid: current }));

    if (changes.length === 0) return;

    try {
      for (const change of changes) {
        await patchBookingMutation.mutateAsync({
          id: change.id,
          data: [{ op: "replace", path: "/valida", value: change.valid }],
        });
      }
      setOriginalValid([...currentValid]);
      Swal.fire("¡Guardados!", "Los cambios se han guardado.", "success");
    } catch (err) {
      showApiError(err);
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
        deleteBookingMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire("¡Eliminada!", "La reserva fue eliminada.", "success");
          },
          onError: (err) => {
            showApiError(err);
          },
        });
      }
    });
  };

  const hasChanges =
    JSON.stringify(originalValid) !== JSON.stringify(currentValid);

  if (
    isLoading ||
    (bookings.length > 0 && currentValid.length !== bookings.length)
  ) {
    return <LoadingIndicator message="Cargando reservas..." />;
  }

  if (error) {
    return <ErrorMessage message="Error al cargar las reservas." />;
  }

  return (
    <div className="p-5">
      <div className="d-flex justify-content-between mb-4">
        <div className="d-flex align-items-center gap-5">
          <Link to={paths.app.dashboard.getHref()} className="btn">
            <FontAwesomeIcon icon={faArrowLeft} size="xl" />
          </Link>
          <h1>Reservas vivas</h1>
        </div>
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

export default AllBookings;
