import { SpaceType } from "./enums";

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
  tipo: SpaceType;
  categoria: SpaceType;
  planta: number;
  capacidad: number;
  reservable: boolean;
  horario: Intervalo;
  propietarios: Propietarios[];
}
