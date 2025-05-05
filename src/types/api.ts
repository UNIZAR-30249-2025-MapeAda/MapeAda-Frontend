/* eslint-disable @typescript-eslint/no-explicit-any */
import { Role } from "../config/constants";
import { BookingUsage } from "../features/bookings/types/enums";
import { SpaceCategory } from "../features/spaces/types/enums";

export type LoginResponse = {
  user: { nip: string; username: string; email: string; role: Role };
  token: string;
};

export type MeResponse = {
  nip: string;
  username: string;
  email: string;
  role: Role;
};

type Intervalo = {
  inicio: string;
  fin: string;
};

export type BookingResponse = {
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
};

export type GetAllBookingsResponse = BookingResponse[];

export type GetBookingsByUserResponse = BookingResponse[];

export type GetBookingsBySpaceResponse = BookingResponse[];

type JsonPatchOp =
  | { op: "add" | "remove" | "replace"; path: string; value?: any }
  | { op: "copy" | "move" | "test"; from: string; path: string; value?: any };

export type PatchBookingRequest = JsonPatchOp[];

export type PostBookingRequest = {
  nip: string;
  espacios: string[];
  uso: number;
  asistentes: number;
  periodo: Intervalo;
  observaciones?: string;
};

type Schedule = {
  date: Date;
  isHoliday: boolean;
  schedule?: Intervalo;
};

type Porcentaje = {
  valor: number;
};

type Calendar = {
  horariosApertura: Schedule[];
  intervaloPorDefecto: Intervalo;
  diasPorDefecto: number;
};

export type GetBuildingResponse = {
  porcentajeUsoMaximo: Porcentaje;
  calendarioApertura: Calendar;
};

type Propietarios = {
  tipo: number;
  id: string;
};

type SpaceResponse = {
  id: string;
  tamanyo: DoubleRange;
  nombre: string;
  tipo: SpaceCategory;
  capacidad: number;
  planta: number;
  reservable: boolean;
  categoria: SpaceCategory;
  horario: Intervalo;
  propietarios: Propietarios[];
};

export type GetSpaceByIdResponse = SpaceResponse;

export type GetSpacesByFiltersParams = {
  nombre?: string;
  categoria?: number;
  capacidadMaxima?: number;
  planta: string;
};

export type PatchSpaceRequest = JsonPatchOp[];
