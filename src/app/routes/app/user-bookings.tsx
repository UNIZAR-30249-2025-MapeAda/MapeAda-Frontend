import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { Column, Table } from "../../../components/ui/table";
import { UserBooking } from "../../../features/bookings/types/models";
import { useGetUserBookings } from "../../../features/bookings/hooks/use-get-user-bookings";
import { useDeleteBooking } from "../../../features/bookings/hooks/use-delete-booking";

const UserBookings = () => {
  const { data: bookings = [], isLoading, error } = useGetUserBookings();
  const deleteBookingMutation = useDeleteBooking();

  const tableColumns: Column<UserBooking>[] = [
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
    { header: "Estado", accessor: "status" },
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
            Swal.fire(
              "¡Eliminada!",
              "La reserva ha sido eliminada.",
              "success"
            );
          },
          onError: (err) => {
            console.error(err);
            Swal.fire("Error", "No se ha podido eliminar la reserva.", "error");
          },
        });
      }
    });
  };

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
      <h1 className="mb-4">Mis reservas</h1>
      <Table data={bookings} columns={tableColumns} keyField="id" />
    </div>
  );
};

export default UserBookings;
