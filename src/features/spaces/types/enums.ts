export const spaceCategories = [
  "Laboratorio",
  "Despacho",
  "Aula",
  "Seminario",
  "Sala común",
  "Salón de actos",
  "Sala de reunión",
  "Sala informática",
] as const;
export type SpaceCategory = (typeof spaceCategories)[number];
