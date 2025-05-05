import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { Column, Table } from "../../../components/ui/table";
import { LoadingIndicator } from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";
import { useDeleteBooking } from "../../../features/bookings/api/delete-booking";
import { Booking } from "../../../features/bookings/types/models";
import { useGetBookingsByUser } from "../../../features/bookings/api/get-bookings-by-user";
import { useUser } from "../../../lib/auth";
import { Link } from "react-router";
import { paths } from "../../../config/paths";
import {
  bookingStatuses,
  BookingUsage,
  bookingUsages,
} from "../../../features/bookings/types/enums";
import { format } from "date-fns";

const BookingsByUser = () => {
  const user = useUser();
  const { data = [], isLoading, error } = useGetBookingsByUser(user.data!.nip);
  const bookings = data.filter((b) => b.deletedAt == null);
  const deleteBookingMutation = useDeleteBooking();

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
      accessor: "spaces",
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
      render: (row) => {
        const valueStr =
          row.valida !== undefined
            ? bookingStatuses[Number(row.valida)]
            : undefined;
        return (
          <small
            className={`px-2 py-1 fw-semibold bg-opacity-10 border border-opacity-10 rounded ${
              row.valida
                ? "text-success bg-success border-success"
                : "text-warning bg-warning border-warning"
            }`}
          >
            {valueStr}
          </small>
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

  if (isLoading) {
    return <LoadingIndicator message="Cargando reservas..." />;
  }

  if (error) {
    return <ErrorMessage message="Error al cargar las reservas." />;
  }

  return (
    <div className="p-5">
      <div className="d-flex align-items-center gap-5 mb-4">
        <Link to={paths.app.dashboard.getHref()} className="btn">
          <FontAwesomeIcon icon={faArrowLeft} size="xl" />
        </Link>
        <h1>Mis reservas</h1>
      </div>
      <Table data={bookings} columns={tableColumns} keyField="id" />
    </div>
  );
};

export default BookingsByUser;
