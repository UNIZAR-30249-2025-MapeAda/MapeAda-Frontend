type Intervalo = {
  inicio: string;
  fin: string;
};

type Schedule = {
  fecha: Date;
  intervalo?: Intervalo;
};

type Porcentaje = {
  valor: number;
};

type Calendar = {
  horariosApertura: Schedule[];
  intervaloPorDefecto: Intervalo;
  diasPorDefecto: number;
};

export type Building = {
  porcentajeUsoMaximo: Porcentaje;
  calendarioApertura: Calendar;
};
