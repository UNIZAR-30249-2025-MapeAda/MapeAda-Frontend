import {
  AliveBookingResponseDto,
  UserBookingResponseDto,
} from "../../../types/api";
import { bookingUsages, bookingStatuses } from "../types/enums";
import { AliveBooking, UserBooking } from "../types/models";

export const mapAliveBookingResponseDtoToAliveBooking = (
  dto: AliveBookingResponseDto
): AliveBooking => ({
  ...dto,
  usage: bookingUsages[dto.usage],
  status: bookingStatuses[dto.status],
});

export const mapUserBookingResponseDtoToUserBooking = (
  dto: UserBookingResponseDto
): UserBooking => ({
  ...dto,
  usage: bookingUsages[dto.usage],
  status: bookingStatuses[dto.status],
});
