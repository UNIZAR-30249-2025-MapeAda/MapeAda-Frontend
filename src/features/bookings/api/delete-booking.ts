import { api } from "../../../lib/api-client";

export const deleteBooking = async (id: number) => {
  await api.delete(`/bookings/${id}`);
};
