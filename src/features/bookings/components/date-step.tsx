import { es } from "date-fns/locale";
import React from "react";
import DatePicker from "react-datepicker";
import {
  DailyScheduleResponseDto,
  ScheduleRestrictionResponseDto,
} from "../../../types/api";
import { format } from "date-fns";

interface DateStepProps {
  fecha: string;
  setFecha: (value: string) => void;
  defaultSchedule: DailyScheduleResponseDto[];
  restrictions: ScheduleRestrictionResponseDto[];
}

const DateStep: React.FC<DateStepProps> = ({
  fecha,
  setFecha,
  defaultSchedule,
  restrictions,
}) => {
  const filterDate = (date: Date) => {
    const iso = format(date, "yyyy-MM-dd");
    const dow = date.getDay(); // 0=sunday … 6=saturday

    const rest = restrictions.find((r) => r.date === iso);
    if (rest?.isHoliday) return false;

    const hasDefault = defaultSchedule.some((ds) => ds.dayOfWeek === dow);
    if (!hasDefault) return false;

    return true;
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const isoDate = format(date, "yyyy-MM-dd");
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
      filterDate={filterDate}
    />
  );
};

export default DateStep;
