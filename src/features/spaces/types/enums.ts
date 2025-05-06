export const spaceTypes = [
  "Laboratorio",
  "Despacho",
  "Aula",
  "Seminario",
  "Sala común",
  "Salón de actos",
  "Sala de reunión",
  "Sala informática",
] as const;
export type SpaceType = (typeof spaceTypes)[number];
