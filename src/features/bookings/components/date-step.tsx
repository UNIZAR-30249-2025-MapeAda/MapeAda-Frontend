import { es } from "date-fns/locale";
import React from "react";
import DatePicker from "react-datepicker";
import { addYears, format } from "date-fns";
import { Building } from "../../building/types/models";

interface DateStepProps {
  fecha: string;
  setFecha: (value: string) => void;
  building: Building;
}

const DateStep: React.FC<DateStepProps> = ({ fecha, setFecha, building }) => {
  const filterDate = (date: Date) => {
    const dayOfWeek = (date.getDay() + 6) % 7; // 0 = Monday ... 6 = Sunday

    const { diasPorDefecto, horariosApertura } = building!.calendarioApertura;

    const mask = 1 << dayOfWeek;
    const isDefaultWorkday = (diasPorDefecto & mask) !== 0;

    const override = horariosApertura.find(
      (r) => new Date(r.date).toDateString() === date.toDateString()
    );

    if (override) {
      if (override.isHoliday) {
        return false;
      }
      if (override.schedule) {
        return true;
      }
    }

    if (!isDefaultWorkday) {
      return false;
    }

    return true;
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFecha(format(date, "dd/MM/yyyy"));
    }
  };

  return (
    <DatePicker
      locale={es}
      selected={fecha ? new Date(fecha) : new Date()}
      onChange={handleDateChange}
      inline
      minDate={new Date()}
      maxDate={addYears(new Date(), 1)}
      filterDate={filterDate}
    />
  );
};

export default DateStep;
