import React, { useState } from "react";

interface DurationStepProps {
  duracion: string;
  setDuracion: (value: string) => void;
}

const horas = [
  ["8:00", "9:00", "10:00"],
  ["11:00", "12:00", "13:00"],
  ["14:00", "15:00", "16:00"],
  ["17:00", "18:00", "19:00"],
  ["20:00", "21:00", ""],
];
const horasPlanas = horas.flat().filter(Boolean);

const horasNoDisponibles = ["9:00", "15:00", "19:00"];

const DurationStep: React.FC<DurationStepProps> = ({
  duracion,
  setDuracion,
}) => {
  const [seleccionadas, setSeleccionadas] = useState<string[]>(
    duracion ? duracion.split(",") : []
  );

  const toggleHora = (hora: string) => {
    if (!hora || horasNoDisponibles.includes(hora)) return;

    if (seleccionadas.includes(hora)) {
      const nuevas = seleccionadas.filter((h) => h !== hora);
      setSeleccionadas(nuevas);
      setDuracion(nuevas.join(","));
      return;
    }

    if (seleccionadas.length === 0) {
      setSeleccionadas([hora]);
      setDuracion(hora);
      return;
    }

    const indexHora = horasPlanas.indexOf(hora);
    const indicesSeleccionadas = seleccionadas.map((h) =>
      horasPlanas.indexOf(h)
    );

    const esAdyacente = indicesSeleccionadas.some(
      (i) => i === indexHora - 1 || i === indexHora + 1
    );

    if (esAdyacente) {
      const nuevas = [...seleccionadas, hora].sort(
        (a, b) => horasPlanas.indexOf(a) - horasPlanas.indexOf(b)
      );
      setSeleccionadas(nuevas);
      setDuracion(nuevas.join(","));
    }
  };

  return (
    <table className="table table-bordered">
      <tbody>
        {horas.map((fila, i) => (
          <tr key={i}>
            {fila.map((hora, j) => (
              <td
                key={j}
                className={
                  horasNoDisponibles.includes(hora)
                    ? "bg-light text-muted"
                    : seleccionadas.includes(hora)
                    ? "bg-success text-white cursor-pointer"
                    : "bg-transparent cursor-pointer"
                }
                style={{
                  cursor:
                    horasNoDisponibles.includes(hora) || !hora
                      ? "default"
                      : "pointer",
                }}
                onClick={() => toggleHora(hora)}
              >
                {hora}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DurationStep;
