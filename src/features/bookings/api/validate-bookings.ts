import { api } from "../../../lib/api-client";
import { ValidateBookingDto } from "../../../types/api";

export const validateBookings = async (updates: ValidateBookingDto[]) => {
  await api.post("/bookings/alive/update-status", updates);
};
