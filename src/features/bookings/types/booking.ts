export const bookingStatuses = [
  "Válida",
  "Potencialmente inválida",
] as const;
export type BookingStatus = typeof bookingStatuses[number];

export const bookingUsages = [
  "Docencia",
  "Investigación",
  "Gestión",
  "Otros",
] as const;
export type BookingUsage = typeof bookingUsages[number];

export type AliveBooking = {
  id: number;
  userNip: string;
  places: string[];
  date: string;
  startTime: string;
  endTime: string;
  assistants: number;
  usage: BookingUsage;
  details?: string;
  status: BookingStatus;
};

export type UserBooking = {
  id: number;
  userNip: string;
  places: string[];
  date: string;
  startTime: string;
  endTime: string;
  assistants: number;
  usage: BookingUsage;
  details?: string;
  status: BookingStatus;
};
