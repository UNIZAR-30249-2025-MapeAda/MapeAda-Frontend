interface Intervalo {
  startTime: string;
  endTime: string;
}

export interface BuildingSchedule {
  isHoliday: boolean;
  schedule: Intervalo;
}

interface Horario {
  date: Date;
  isHoliday: boolean;
  schedule?: Intervalo;
}

interface DefaultCalendar {
  week: boolean[]; // 0=Monday ... 6=Sunday
  schedule: Intervalo;
}

export interface Building {
  maxUse: number;
  defaultCalendar: DefaultCalendar;
  calendarRestrictions: Horario[];
}
