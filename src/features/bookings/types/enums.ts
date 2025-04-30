export const bookingUsages = [
  "Docencia",
  "Investigación",
  "Gestión",
  "Otros",
] as const;
export type BookingUsage = (typeof bookingUsages)[number];

export const bookingStatuses = ["Potencialmente inválida", "Válida"] as const;
export type BookingStatus = (typeof bookingStatuses)[number];
