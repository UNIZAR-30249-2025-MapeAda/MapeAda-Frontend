import { es } from "date-fns/locale";
import React from "react";
import DatePicker from "react-datepicker";

interface DateStepProps {
  fecha: string;
  setFecha: (value: string) => void;
}

const DateStep: React.FC<DateStepProps> = ({ fecha, setFecha }) => {
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const isoDate = date.toISOString().split("T")[0];
      setFecha(isoDate);
    }
  };

  return (
    <DatePicker
      locale={es}
      selected={fecha ? new Date(fecha) : new Date()}
      onChange={handleDateChange}
      inline
      minDate={new Date()}
    />
  );
};

export default DateStep;
