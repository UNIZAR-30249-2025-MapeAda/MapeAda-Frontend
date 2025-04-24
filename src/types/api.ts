import { Role } from "../config/constants";

export type LoginResponseDto = {
  user: { nip: string; username: string; email: string; role: Role };
  token: string;
};

export type MeResponseDto = {
  nip: string;
  username: string;
  email: string;
  role: Role;
};

export type AliveBookingResponseDto = {
  id: number;
  userNip: string;
  spaces: string[];
  date: string;
  startTime: string;
  endTime: string;
  assistants: number;
  usage: number;
  details?: string;
  status: number;
};

export type UserBookingResponseDto = {
  id: number;
  userNip: string;
  spaces: string[];
  date: string;
  startTime: string;
  endTime: string;
  assistants: number;
  usage: number;
  details?: string;
  status: number;
};

export type ValidateBookingDto = {
  id: number;
  status: number;
};

export interface DailyScheduleResponseDto {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 1 = Monday, … 6 = Saturday
  startTime: string;
  endTime: string;
}

export interface ScheduleRestrictionResponseDto {
  date: string;
  startTime: string;
  endTime: string;
  isHoliday: boolean;
}

export interface SpaceBookingsResponseDto {
  date: string;
  startTime: string;
  endTime: string;
}

export interface SpaceScheduleAndBookingsResponseDto {
  defaultSchedule: DailyScheduleResponseDto[];
  restrictions: ScheduleRestrictionResponseDto[];
  bookings: SpaceBookingsResponseDto[];
}

export interface SpaceFeatureResponseDto {
  id: string;
  properties: {
    id: string;
    name: string;
    floor: number;
    category: string;
  };
  geometry: GeoJSON.Geometry;
}

export interface GeoJsonCollectionResponseDto {
  type: "FeatureCollection";
  features: SpaceFeatureResponseDto[];
}
