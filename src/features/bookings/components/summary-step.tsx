import React from "react";

interface SummaryStepProps {
  fecha: string;
  duracion: string;
  uso: string;
  asistentes: number;
  detallesAdicionales: string;
  confirm: () => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({
  fecha,
  duracion,
  uso,
  asistentes,
  detallesAdicionales,
}) => {
  const formatDate = (fechaISO: string) => {
    if (!fechaISO) return "No seleccionada";
    const [year, month, day] = fechaISO.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatDuration = (duracionRaw: string) => {
    if (!duracionRaw) return "No especificada";

    const horas = duracionRaw.split(",").sort();

    const getSiguienteHora = (hora: string) => {
      const [h, m] = hora.split(":").map(Number);
      return `${String(h + 1).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    };

    if (horas.length === 1) {
      return `${horas[0]} a ${getSiguienteHora(horas[0])}`;
    }

    return `${horas[0]} a ${getSiguienteHora(horas[horas.length - 1])}`;
  };

  return (
    <div className="d-flex">
      <div className="col-4"></div>
      <div className="col text-start">
        <p>
          <strong>Espacios reservados:</strong> Nombres de los espacios
        </p>
        <p>
          <strong>Fecha:</strong> {formatDate(fecha) || "No seleccionada"}
        </p>
        <p>
          <strong>Duración:</strong>{" "}
          {formatDuration(duracion) || "No especificada"}
        </p>
        <p>
          <strong>Tipo de uso:</strong> {uso || "No ingresados"}
        </p>
        <p>
          <strong>Número de asistentes:</strong> {asistentes || "No ingresados"}
        </p>
        <p>
          <strong>Detalles adicionales:</strong> {detallesAdicionales || "-"}
        </p>
      </div>
      <div className="col-4"></div>
    </div>
  );
};

export default SummaryStep;
