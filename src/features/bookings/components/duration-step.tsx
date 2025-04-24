import React, { useEffect, useState } from "react";
import {
  DailyScheduleResponseDto,
  ScheduleRestrictionResponseDto,
  SpaceBookingsResponseDto,
} from "../../../types/api";
import { parseMinutes, formatMinutes } from "../../../utils/format";

interface DurationStepProps {
  fecha: string;
  duracion: string;
  setDuracion: (value: string) => void;
  defaultSchedule: DailyScheduleResponseDto[];
  restrictions: ScheduleRestrictionResponseDto[];
  bookings: SpaceBookingsResponseDto[];
}

const DurationStep: React.FC<DurationStepProps> = ({
  fecha,
  duracion,
  setDuracion,
  defaultSchedule,
  restrictions,
  bookings,
}) => {
  const [slots, setSlots] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>(
    duracion ? duracion.split(",") : []
  );

  const bookingRanges = bookings.map((b) => ({
    start: parseMinutes(b.startTime),
    end: parseMinutes(b.endTime),
  }));

  useEffect(() => {
    if (!fecha) {
      setSlots([]);
      return;
    }
    const date = new Date(fecha);
    const dow = date.getDay();
    const rest = restrictions.find((r) => r.date === fecha);

    let startMin: number, endMin: number;
    if (rest && !rest.isHoliday && rest.startTime && rest.endTime) {
      startMin = parseMinutes(rest.startTime);
      endMin = parseMinutes(rest.endTime);
    } else {
      const daily = defaultSchedule.find((ds) => ds.dayOfWeek === dow);
      startMin = daily ? parseMinutes(daily.startTime) : 0;
      endMin = daily ? parseMinutes(daily.endTime) : 0;
    }

    if (rest?.isHoliday) {
      setSlots([]);
      return;
    }

    const generated: string[] = [];
    for (let t = startMin; t + 60 <= endMin; t += 60) {
      generated.push(formatMinutes(t));
    }

    setSlots(generated);

    const filtered = selected.filter((h) => {
      const m = parseMinutes(h);
      if (!generated.includes(h)) return false;
      return !bookingRanges.some((r) => m >= r.start && m < r.end);
    });

    setSelected(filtered);
    setDuracion(filtered.join(","));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fecha, defaultSchedule, restrictions, bookings]);

  const toggle = (hour: string) => {
    const m = parseMinutes(hour);
    if (bookingRanges.some((r) => m >= r.start && m < r.end)) return;

    let next: string[];
    if (selected.includes(hour)) {
      next = selected.filter((h) => h !== hour);
    } else {
      if (selected.length === 0) {
        next = [hour];
      } else {
        const indices = selected.map((h) => slots.indexOf(h));
        const idx = slots.indexOf(hour);
        if (indices.some((i) => i === idx - 1 || i === idx + 1)) {
          next = [...selected, hour].sort(
            (a, b) => slots.indexOf(a) - slots.indexOf(b)
          );
        } else {
          return;
        }
      }
    }
    setSelected(next);
    setDuracion(next.join(","));
  };

  if (!fecha) {
    return <p className="text-muted">Seleccione una fecha primero.</p>;
  }

  if (slots.length === 0) {
    return <p className="text-danger">No hay franjas disponibles.</p>;
  }

  const columns = 3;
  const rows: string[][] = [];
  for (let i = 0; i < slots.length; i += columns) {
    rows.push(slots.slice(i, i + columns));
  }
  return (
    <table className="table table-bordered">
      <tbody>
        {rows.map((rowSlots, rowIndex) => (
          <tr key={rowIndex}>
            {rowSlots.map((hour) => {
              const m = parseMinutes(hour);
              const isBooked = bookingRanges.some(
                (r) => m >= r.start && m < r.end
              );
              const isSelected = selected.includes(hour);

              let className = "";
              const style: React.CSSProperties = {};

              if (isBooked) {
                className = "bg-light text-muted";
                style.cursor = "not-allowed";
              } else if (isSelected) {
                className = "bg-success text-white";
                style.cursor = "pointer";
              } else {
                style.cursor = "pointer";
              }

              return (
                <td
                  key={hour}
                  className={className}
                  style={style}
                  onClick={() => toggle(hour)}
                >
                  {hour}
                </td>
              );
            })}
            {rowSlots.length < columns &&
              Array(columns - rowSlots.length)
                .fill(null)
                .map((_, idx) => <td key={`empty-${idx}`} />)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DurationStep;
