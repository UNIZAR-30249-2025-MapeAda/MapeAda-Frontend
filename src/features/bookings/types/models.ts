import { BookingUsage } from "./enums";

type Intervalo = {
  inicio: string;
  fin: string;
}

export type Booking = {
  id: number;
  espacios: string[];
  usuario: string;
  uso: BookingUsage;
  asistentes: number;
  periodo: Intervalo;
  observaciones?: string;
  valida: boolean;
  invalidSince?: string;
  deletedAt?: string;
  deletedBy?: string;
};
