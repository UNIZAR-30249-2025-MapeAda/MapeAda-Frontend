import React, { ChangeEvent } from "react";
import { Select } from "../../../components/ui/select";

interface BookInfoStepProps {
  uso: string;
  asistentes: number;
  detallesAdicionales: string;
  setUso: (value: string) => void;
  setAsistentes: (value: number) => void;
  setDetallesAdicionales: (value: string) => void;
}

const BookInfoStep: React.FC<BookInfoStepProps> = ({
  uso,
  asistentes,
  detallesAdicionales,
  setUso,
  setAsistentes,
  setDetallesAdicionales,
}) => {
  return (
    <div className="d-flex">
      <div className="col-4"></div>
      <div className="d-flex flex-column text-start gap-3 col">
        <span>Tipo de uso</span>
        <Select
          options={[
            { value: "docencia", label: "Docencia" },
            { value: "investigacion", label: "Investigación" },
            { value: "gestion", label: "Gestión" },
            { value: "otros", label: "Otros" },
          ]}
          placeholder="Tipo de uso"
          initialValue={uso}
          onChange={(newValue) => setUso(newValue)}
        />
        <span>Número de asistentes</span>
        <input
          type="number"
          className="form-control"
          placeholder="0"
          value={asistentes ? asistentes : ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAsistentes(Number(e.target.value))
          }
        />
        <span>Detalles adicionales (opcional)</span>
        <textarea
          className="form-control"
          value={detallesAdicionales}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDetallesAdicionales(e.target.value)
          }
        ></textarea>
      </div>
      <div className="col-4"></div>
    </div>
  );
};

export default BookInfoStep;
