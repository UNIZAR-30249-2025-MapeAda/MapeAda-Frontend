import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../api/delete-booking";

export const useDeleteBooking = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteBooking,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings", "alive"] });
    },
  });
};
