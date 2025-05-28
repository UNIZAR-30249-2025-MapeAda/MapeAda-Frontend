import { es } from "date-fns/locale";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { addYears, format } from "date-fns";
import { Building } from "../../building/types/models";

interface DateStepProps {
  fecha: string;
  setFecha: (value: string) => void;
  building: Building;
}

const DateStep: React.FC<DateStepProps> = ({ fecha, setFecha, building }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(fecha ? new Date(fecha) : new Date());

  const filterDate = (date: Date) => {
    const dayOfWeek = (date.getDay() + 6) % 7; // 0 = Monday ... 6 = Sunday

    const { diasPorDefecto, horariosApertura } = building!.calendarioApertura;

    const mask = 1 << dayOfWeek;
    const isDefaultWorkday = (diasPorDefecto & mask) !== 0;

    const override = horariosApertura.find(
      (r) => new Date(r.fecha).toDateString() === date.toDateString()
    );

    if (override) {
      return override.intervalo ? true : false;
    }

    if (!isDefaultWorkday) {
      return false;
    }

    return true;
  };

  const handleDateChange = (date: Date | null) => {
    setFechaSeleccionada(date);
    if (date) {
      setFecha(format(date, "dd/MM/yyyy"));
    }
  };

  return (
    <DatePicker
      locale={es}
      selected={fechaSeleccionada}
      onChange={handleDateChange}
      inline
      minDate={new Date()}
      maxDate={addYears(new Date(), 1)}
      filterDate={filterDate}
    />
  );
};

export default DateStep;
