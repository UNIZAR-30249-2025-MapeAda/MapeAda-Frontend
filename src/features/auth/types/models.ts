import { Departamento, Rol } from "./enums";

export type User = {
  nombre: string; 
  apellidos: string; 
  telefono: string; 
  nip: string; 
  email: string; 
  role: Rol;
  departamento: Departamento | null;
};
