export const formatDate = (fechaISO: string) => {
  if (!fechaISO) return "No seleccionada";
  const [year, month, day] = fechaISO.split("-");
  return `${day}/${month}/${year}`;
};

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