import { useQuery } from "@tanstack/react-query";
import { Space } from "../types/models";
import { api } from "../../../lib/api-client";
import { GetSpaceByIdResponse } from "../../../types/api";

const getSpaceById = async (id: string): Promise<Space> => {
  const space: GetSpaceByIdResponse = await api.get(`/api/spaces/${id}`);

  return space;
};

export const useGetSpaceById = (id: string) => {
  return useQuery<Space, Error>({
    queryKey: ["space", id],
    queryFn: () => getSpaceById(id),
    staleTime: 0,
  });
};