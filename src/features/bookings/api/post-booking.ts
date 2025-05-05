import { useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { PostBookingRequest } from "../../../types/api";

const postBooking = async ({ data }: { data: PostBookingRequest }) => {
  await api.post("/api/bookings", data);
};

export const usePostBooking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: postBooking,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};
