import { BookingUsage } from "./enums";

export type Booking = {
  id: number;
  userNip: string;
  spaces: string[];
  date: Date;
  startTime: string;
  endTime: string;
  assistants: number;
  usage: BookingUsage;
  details?: string;
  valid: boolean;
};
