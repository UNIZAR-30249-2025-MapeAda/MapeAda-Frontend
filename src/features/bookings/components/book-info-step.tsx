import React, { ChangeEvent } from "react";
import { Select } from "../../../components/ui/select";
import { bookingUsages } from "../types/enums";

interface BookInfoStepProps {
  uso: string;
  asistentes: number;
  detallesAdicionales: string;
  setUso: (value: string) => void;
  setAsistentes: (value: number) => void;
  setDetallesAdicionales: (value: string) => void;
  maxAsistentes: number;
}

const BookInfoStep: React.FC<BookInfoStepProps> = ({
  uso,
  asistentes,
  detallesAdicionales,
  setUso,
  setAsistentes,
  setDetallesAdicionales,
  maxAsistentes,
}) => {
  const handleAssistantsInput = (
    raw: string,
    max: number,
    setValue: (value: number) => void
  ) => {
    if (raw === "") {
      setValue(0);
      return;
    }

    const num = Number(raw);
    if (isNaN(num)) return;

    if (num > max) {
      setValue(max);
    } else if (num < 1) {
      setValue(1);
    } else {
      setValue(num);
    }
  };

  return (
    <div className="d-flex">
      <div className="col-4"></div>
      <div className="d-flex flex-column text-start gap-3 col">
        <span>Tipo de uso</span>
        <Select
          options={bookingUsages.map((usage) => ({
            value: usage,
            label: usage,
          }))}
          placeholder="Tipo de uso"
          initialValue={uso}
          onChange={(newValue) => setUso(newValue)}
        />
        <span>Número de asistentes (máximo {maxAsistentes})</span>
        <input
          type="number"
          className="form-control"
          placeholder="1"
          value={asistentes ? asistentes : ""}
          min={1}
          max={maxAsistentes}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleAssistantsInput(e.target.value, maxAsistentes, setAsistentes)
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
