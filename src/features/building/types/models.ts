interface Intervalo {
  startTime: string;
  endTime: string;
}

interface Schedule {
  date: Date;
  isHoliday: boolean;
  schedule?: Intervalo;
}

interface DefaultCalendar {
  week: boolean[]; // 0=Monday ... 6=Sunday
  schedule: Intervalo;
}

interface Porcentaje {
  value: number;
}

interface Calendar {
  default: DefaultCalendar;
  restrictions: Schedule[];
}

export interface Building {
  maxUse: Porcentaje;
  calendar: Calendar;
}
