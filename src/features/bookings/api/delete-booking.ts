import { useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";

const deleteBooking = async (id: number) => {
  await api.delete(`/api/bookings/${id}`);
};

export const useDeleteBooking = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteBooking,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings", "all"] });
      qc.invalidateQueries({ queryKey: ["bookings", "user"] });
      qc.invalidateQueries({ queryKey: ["bookings", "space"] });
    },
  });
};
