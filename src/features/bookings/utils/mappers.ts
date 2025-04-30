import {
  GetAllBookingsResponse,
  GetBookingsBySpaceResponse,
  GetBookingsByUserResponse,
} from "../../../types/api";
import { bookingUsages } from "../types/enums";
import { Booking } from "../types/models";

export const mapGetAllBookingsResponseToBooking = (
  dto: GetAllBookingsResponse
): Booking => ({
  ...dto,
  startTime: dto.schedule.startTime,
  endTime: dto.schedule.endTime,
  usage: bookingUsages[dto.usage],
});

export const mapGetBookingsByUserResponseToBooking = (
  dto: GetBookingsByUserResponse
): Booking => ({
  ...dto,
  startTime: dto.schedule.startTime,
  endTime: dto.schedule.endTime,
  usage: bookingUsages[dto.usage],
});

export const mapGetBookingsBySpaceResponseToBooking = (
  dto: GetBookingsBySpaceResponse
): Booking => ({
  ...dto,
  startTime: dto.schedule.startTime,
  endTime: dto.schedule.endTime,
  usage: bookingUsages[dto.usage],
});
