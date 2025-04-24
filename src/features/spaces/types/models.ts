import { SpaceCategory } from "./enums";

export interface Space {
  id: string;
  name: string;
  category: SpaceCategory;
  floor: number;
  capacity: number;
  startTime: string;
  endTime: string;
}
