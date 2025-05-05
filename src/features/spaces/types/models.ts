import { SpaceCategory } from "./enums";

export type Intervalo = {
  inicio: string;
  fin: string;
};

export type Propietarios = {
  tipo: number;
  id: string;
};

export type Space = {
  id: string;
  nombre: string;
  tamanyo: DoubleRange;
  tipo: SpaceCategory;
  categoria: SpaceCategory;
  planta: number;
  capacidad: number;
  reservable: boolean;
  horario: Intervalo;
  propietarios: Propietarios[];
}
