import { api } from "../../../lib/api-client";
import { SpaceScheduleAndBookingsResponseDto } from "../../../types/api";

export const getSpaceScheduleAndBookings = async (
  spaceIds: string[]
): Promise<SpaceScheduleAndBookingsResponseDto> => {
  const { data } = await api.get<SpaceScheduleAndBookingsResponseDto>("/spaces/schedule", { params: { ids: spaceIds } });

  return data;
};
