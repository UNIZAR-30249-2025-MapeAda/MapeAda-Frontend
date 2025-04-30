import { Role } from "../config/constants";

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

interface Intervalo {
  startTime: string;
  endTime: string;
}

export type GetAllBookingsResponse = {
  id: number;
  userNip: string;
  spaces: string[];
  date: Date;
  schedule: Intervalo;
  assistants: number;
  usage: number;
  details?: string;
  valid: boolean;
};

export type GetBookingsByUserResponse = {
  id: number;
  userNip: string;
  spaces: string[];
  date: Date;
  schedule: Intervalo;
  assistants: number;
  usage: number;
  details?: string;
  valid: boolean;
};

export type GetBookingsBySpaceResponse = {
  id: number;
  userNip: string;
  spaces: string[];
  date: Date;
  schedule: Intervalo;
  assistants: number;
  usage: number;
  details?: string;
  valid: boolean;
};

export type PatchBookingRequest = {
  valid: boolean;
};

interface Schedule {
  date: Date;
  isHoliday: boolean;
  schedule?: Intervalo;
}

interface DefaultCalendar {
  week: boolean[]; // 0=Monday ... 6=Sunday
  schedule: Intervalo;
}

interface Porcentaje {
  value: number;
}

interface Calendar {
  default: DefaultCalendar;
  restrictions: Schedule[];
}

export interface GetBuildingResponse {
  maxUse: Porcentaje;
  calendar: Calendar;
}
