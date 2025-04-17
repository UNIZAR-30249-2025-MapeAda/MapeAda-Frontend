import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "../../components/ui/select";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const AliveBookings = () => {
  const reservasIniciales = [
    { id: 1, estado: "valida" },
    { id: 2, estado: "valida" },
    { id: 3, estado: "valida" },
  ];

  const [estadoOriginal, setEstadoOriginal] = useState(
    reservasIniciales.map((r) => r.estado)
  );
  const [estadoActual, setEstadoActual] = useState(
    reservasIniciales.map((r) => r.estado)
  );

  const handleEstadoChange = (index: number, nuevoValor: string) => {
    const nuevosEstados = [...estadoActual];
    nuevosEstados[index] = nuevoValor;
    setEstadoActual(nuevosEstados);
  };

  const guardarCambios = () => {
    setEstadoOriginal([...estadoActual]);
    Swal.fire({
      title: "¡Guardado!",
      text: "Los cambios se han guardado con éxito.",
      icon: "success",
    });
  };

  const hayCambios =
    JSON.stringify(estadoOriginal) !== JSON.stringify(estadoActual);

  return (
    <div className="p-5">
      <div className="d-flex justify-content-between mb-4">
        <h1>Reservas vivas</h1>
        <div className="d-flex align-items-center">
          {hayCambios && (
            <Button
              variant="warning"
              className="shadow rounded-pill"
              onClick={guardarCambios}
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
          {reservasIniciales.map((reserva, index) => (
            <tr key={reserva.id} className="align-middle">
              <th scope="row">{reserva.id}</th>
              <td>840091</td>
              <td>L0.01, A.02</td>
              <td>13/05/2025</td>
              <td>10:00 - 11:00</td>
              <td>13</td>
              <td>Investigación</td>
              <td>-</td>
              <td>
                <Select
                  options={[
                    { value: "valida", label: "Válida" },
                    {
                      value: "potencialmenteInvalida",
                      label: "Potencialmente inválida",
                    },
                  ]}
                  initialValue={estadoActual[index]}
                  onChange={(newValue) => handleEstadoChange(index, newValue)}
                />
              </td>
              <td>
                <FontAwesomeIcon icon={faTrash} color="red" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AliveBookings;
