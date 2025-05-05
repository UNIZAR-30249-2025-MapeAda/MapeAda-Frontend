import { BookingResponse } from "../../../types/api";
import { Booking } from "../types/models";

export const mapGetAllBookingsResponseToBooking = (
  res: BookingResponse
): Booking => ({
  id: res.id,
  espacios: res.espacios,
  usuario: res.usuario,
  uso: res.uso,
  asistentes: res.asistentes,
  periodo: {
    inicio: res.periodo.inicio,
    fin: res.periodo.fin,
  },
  observaciones: res.observaciones,
  valida: res.valida,
  invalidSince: res.invalidSince,
  deletedAt: res.deletedAt,
});

export const mapGetBookingsByUserResponseToBooking = (
  res: BookingResponse
): Booking => ({
  id: res.id,
  espacios: res.espacios,
  usuario: res.usuario,
  uso: res.uso,
  asistentes: res.asistentes,
  periodo: {
    inicio: res.periodo.inicio,
    fin: res.periodo.fin,
  },
  observaciones: res.observaciones,
  valida: res.valida,
  invalidSince: res.invalidSince,
  deletedAt: res.deletedAt,
});

export const mapGetBookingsBySpaceResponseToBooking = (
  res: BookingResponse
): Booking => ({
  id: res.id,
  espacios: res.espacios,
  usuario: res.usuario,
  uso: res.uso,
  asistentes: res.asistentes,
  periodo: {
    inicio: res.periodo.inicio,
    fin: res.periodo.fin,
  },
  observaciones: res.observaciones,
  valida: res.valida,
  invalidSince: res.invalidSince,
  deletedAt: res.deletedAt,
});
