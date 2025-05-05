type Intervalo = {
  inicio: string;
  fin: string;
};

type Schedule = {
  date: Date;
  isHoliday: boolean;
  schedule?: Intervalo;
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
