export const formatDuration = (duracionRaw: string) => {
  if (!duracionRaw) return "No especificada";

  const horas = duracionRaw.split(",").sort();

  const getSiguienteHora = (hora: string) => {
    const [h, m] = hora.split(":").map(Number);
    return `${String(h + 1).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  if (horas.length === 1) {
    return `${horas[0]} a ${getSiguienteHora(horas[0])}`;
  }

  return `${horas[0]} a ${getSiguienteHora(horas[horas.length - 1])}`;
};

export const parseMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const formatMinutes = (total: number) => {
  const h = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const m = (total % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
};

export const formatHM = (time: string) => time.slice(0, 5);
