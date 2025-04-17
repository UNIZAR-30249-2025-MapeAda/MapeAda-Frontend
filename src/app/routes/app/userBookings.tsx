import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { getUserBookingsQueryOptions } from "../../../features/bookings/api/get-user-bookings";

const UserBookings = () => {
  const {
    data: bookings = [],
    isLoading,
    error,
    refetch,
  } = useQuery(getUserBookingsQueryOptions());

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
              <td>{booking.status}</td>
              <td>
                <button className="btn bg-transparent" onClick={() => deleteBooking(index)}>
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

export default UserBookings;
