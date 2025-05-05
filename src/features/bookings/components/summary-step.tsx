import React from "react";
import { formatDuration } from "../../../utils/format";

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
          <strong>Fecha:</strong> {fecha}
        </p>
        <p>
          <strong>Duración:</strong>{" "}
          {formatDuration(duracion)}
        </p>
        <p>
          <strong>Tipo de uso:</strong> {uso}
        </p>
        <p>
          <strong>Número de asistentes:</strong> {asistentes}
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
