import React, { useEffect, useState } from "react";
import { parseMinutes, formatMinutes } from "../../../utils/format";
import { Building } from "../../building/types/models";
import { Booking } from "../types/models";
import { ErrorMessage } from "../../../components/errors/error-message";
import { Space } from "../../spaces/types/models";

interface DurationStepProps {
  fecha: string;
  duracion: string;
  setDuracion: (value: string) => void;
  spaces: Space[];
  bookings: Booking[];
  building: Building;
}

const DurationStep: React.FC<DurationStepProps> = ({
  fecha,
  duracion,
  setDuracion,
  spaces,
  bookings,
  building,
}) => {
  const [slots, setSlots] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>(
    duracion ? duracion.split(",") : []
  );

  useEffect(() => {
    let startMin: number, endMin: number;
    const rangedSpaces = spaces.filter((s) => s.startTime && s.endTime);

    if (rangedSpaces.length > 0) {
      const starts = rangedSpaces.map((s) => parseMinutes(s.startTime!));
      const ends = rangedSpaces.map((s) => parseMinutes(s.endTime!));
      startMin = Math.max(...starts);
      endMin = Math.min(...ends);
    } else {
      // horario por defecto del edificio
      startMin = parseMinutes(building.calendar.default.schedule.startTime);
      endMin = parseMinutes(building.calendar.default.schedule.endTime);
    }

    const generated: string[] = [];
    for (let t = startMin; t + 60 <= endMin; t += 60) {
      generated.push(formatMinutes(t));
    }
    setSlots(generated);

    const bookingRanges = bookings
      .filter((b) => b.startTime)
      .map((b) => ({
        start: parseMinutes(b.startTime),
        end: parseMinutes(b.endTime),
      }));

    const filtered = selected.filter((h) => {
      const m = parseMinutes(h);
      return (
        generated.includes(h) &&
        !bookingRanges.some((r) => m >= r.start && m < r.end)
      );
    });
    setSelected(filtered);
    setDuracion(filtered.join(","));
  }, [fecha, bookings, spaces, building, setDuracion]);

  const toggle = (hour: string) => {
    const bookingRanges = bookings
      .filter((b) => b.startTime)
      .map((b) => ({
        start: parseMinutes(b.startTime),
        end: parseMinutes(b.endTime),
      }));
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

  if (slots.length === 0) {
    return (
      <ErrorMessage message="No hay franjas horarias disponibles para los espacios seleccionados." />
    );
  }

  const columns = 3;
  const rows: string[][] = [];
  for (let i = 0; i < slots.length; i += columns) {
    rows.push(slots.slice(i, i + columns));
  }

  const bookingRanges = bookings
    .filter((b) => b.startTime)
    .map((b) => ({
      start: parseMinutes(b.startTime),
      end: parseMinutes(b.endTime),
    }));

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
