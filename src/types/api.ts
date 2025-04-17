export type AliveBookingResponseDto = {
  id: number;
  userNip: string;
  places: string[];
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
  places: string[];
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
