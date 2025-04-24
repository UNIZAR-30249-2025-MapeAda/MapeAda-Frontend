export const bookingStatuses = ["Válida", "Potencialmente inválida"] as const;
export type BookingStatus = (typeof bookingStatuses)[number];

export const bookingUsages = [
  "Docencia",
  "Investigación",
  "Gestión",
  "Otros",
] as const;
export type BookingUsage = (typeof bookingUsages)[number];
