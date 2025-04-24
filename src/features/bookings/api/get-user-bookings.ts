import { UserBookingResponseDto } from "../../../types/api";
import { UserBooking } from "../types/models";
import { mapUserBookingResponseDtoToUserBooking } from "../utils/mappers";

const mockBookings: UserBookingResponseDto[] = [
  {
    id: 1,
    userNip: "840091",
    spaces: ["L0.01", "A.02"],
    date: "13/05/2025",
    startTime: "10:00",
    endTime: "11:00",
    assistants: 13,
    usage: 0,
    details: "",
    status: 0,
  },
  {
    id: 2,
    userNip: "840092",
    spaces: ["L1.03"],
    date: "14/05/2025",
    startTime: "09:00",
    endTime: "10:30",
    assistants: 6,
    usage: 2,
    details: "Con portátil",
    status: 0,
  },
];

export const getUserBookings = async (): Promise<UserBooking[]> => {
  // const bookings: UserBookingResponseDto[] = await api.get("/bookings/user");
  const bookings = await new Promise<UserBookingResponseDto[]>((resolve) =>
    setTimeout(() => resolve(mockBookings), 500)
  );

  return bookings.map(mapUserBookingResponseDtoToUserBooking);
};
