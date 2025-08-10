export interface CalendarData {
  month: string,
  day: number, 
  day_code: number, 
  day_weather: string,
  night_weather: string,
  special_day_weather: string | null,
  special_night_weather: string | null,
  city: string | null,
  confidant_events: string | null,
  events: string | null,
  events_spoiler: string | null,
  day_activities: string,
  night_activities: string,
}

export interface CsvData {
  data: CalendarData[];
}

export interface CalendarDataObject {
  data: Array<CalendarData>;
}

export interface CalendarDays {
  days: Array<number>;
}