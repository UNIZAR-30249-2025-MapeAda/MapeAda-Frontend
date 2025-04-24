import { SpaceFeatureResponseDto } from "../../../types/api";
import { Space } from "../types/models";

export const mapSpaceResponseDtoToSpace = (
  dto: SpaceFeatureResponseDto
): Space => ({
  id: dto.id,
  properties: dto.properties,
  geometry: dto.geometry,
});
