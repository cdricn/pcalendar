export interface ScheduleData {
  month: string,
  monthCode: number, 
  day: number, 
  day_code: number, 
  day_weather: string | null,
  night_weather: string | null,
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
  data: ScheduleData[];
}

export interface ScheduleDataObject {
  data: ScheduleData;
}

export interface CalendarData {
  [month: string]: ScheduleData[];
}

export interface CalendarDays {
  data: ScheduleData[];
  onSelect: (data: number) => void
}