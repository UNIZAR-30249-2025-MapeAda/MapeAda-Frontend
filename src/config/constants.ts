export const USER_ROLE = "usuario" as const;
export const ADMIN_ROLE = "admin" as const;
export type Role = typeof USER_ROLE | typeof ADMIN_ROLE;
export const ALL_ROLES: Role[] = [USER_ROLE, ADMIN_ROLE];

export const CAMPUS_COORDS: [number, number] = [41.6834, -0.8885];

export const CATEGORY_COLORS: Record<number, string> = {
  0: "#e41a1c", // Laboratorio: rojo
  1: "#377eb8", // Despacho: azul
  2: "#4daf4a", // Aula: verde
  3: "#984ea3", // Seminario: morado
  4: "#ff7f00", // Sala común: naranja
  5: "#ffff33", // Salón de actos: amarillo
  6: "#a65628", // Sala de reunión: marrón
  7: "#f781bf", // Sala informática: rosa
};