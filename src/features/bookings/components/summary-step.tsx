import React from "react";
import { formatDate, formatDuration } from "../../../utils/format";

interface SummaryStepProps {
  espacios: string[];
  fecha: string;
  duracion: string;
  uso: string;
  asistentes: number;
  detallesAdicionales: string;
  confirm: () => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({
  espacios,
  fecha,
  duracion,
  uso,
  asistentes,
  detallesAdicionales,
}) => {
  return (
    <div className="d-flex">
      <div className="col-4"></div>
      <div className="col text-start">
        <p>
          <strong>Espacios reservados:</strong> {espacios.join(", ")}
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
