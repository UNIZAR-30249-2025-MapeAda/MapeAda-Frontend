import { SpaceCategory } from "./enums";

export interface Space {
  id: string;
  name: string;
  dimension: DoubleRange;
  type: SpaceCategory;
  category: SpaceCategory;
  floor: number;
  capacity: number;
  reservable: boolean;
  startTime: string;
  endTime: string;
  ownerType: number;
  ownerId: string;
}
