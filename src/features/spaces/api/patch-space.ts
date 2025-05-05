import { useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { PatchSpaceRequest } from "../../../types/api";

const patchSpace = async ({
  id,
  data,
}: {
  id: string;
  data: PatchSpaceRequest;
}) => {
  await api.patch(`/api/spaces/${id}`, data, );
};

export const usePatchSpace = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: patchSpace,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["space"] });
      qc.invalidateQueries({ queryKey: ["spaces", "filters"] });
    },
  });
};
