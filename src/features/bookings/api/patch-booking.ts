import { useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { PatchBookingRequest } from "../../../types/api";

const patchBooking = async ({
  id,
  data,
}: {
  id: number;
  data: PatchBookingRequest;
}) => {
  await api.patch(`/api/bookings/${id}`, data);
};

export const usePatchBooking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: patchBooking,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};
