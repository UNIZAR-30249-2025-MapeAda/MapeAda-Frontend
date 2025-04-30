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

const DateStep: React.FC<DateStepProps> = ({
  fecha,
  setFecha,
  building,
}) => {
  const filterDate = (date: Date) => {
    const iso = format(date, "yyyy-MM-dd");
    const jsDay = date.getDay(); // 0=Sunday ... 6=Saturday
    const isoWeekDay = jsDay === 0 ? 6 : jsDay - 1; // 0=Monday ... 6=Sunday

    if (!building.defaultCalendar.week[isoWeekDay]) {
      return false;
    }

    const restriction = building.calendarRestrictions.find(
      (r) => format(new Date(r.date), "yyyy-MM-dd") === iso
    );
    if (restriction?.isHoliday) {
      return false;
    }

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
      maxDate={addYears(new Date(), 1)}
      filterDate={filterDate}
    />
  );
};

export default DateStep;
