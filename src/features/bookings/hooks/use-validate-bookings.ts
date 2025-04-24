import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ValidateBookingDto } from "../../../types/api";
import { validateBookings } from "../api/validate-bookings";

export const useValidateBookings = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, ValidateBookingDto[]>({
    mutationFn: validateBookings,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings", "alive"] });
    },
  });
};
