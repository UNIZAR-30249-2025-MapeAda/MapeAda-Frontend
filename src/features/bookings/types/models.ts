import { BookingUsage, BookingStatus } from "./enums";

export type AliveBooking = {
  id: number;
  userNip: string;
  spaces: string[];
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
  spaces: string[];
  date: string;
  startTime: string;
  endTime: string;
  assistants: number;
  usage: BookingUsage;
  details?: string;
  status: BookingStatus;
};
