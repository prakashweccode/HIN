import { Time } from "ngx-bootstrap/timepicker/timepicker.models";

export class Days {
  public Id: number;
  public DayName: string;
  public DisplayOrder: number;
}
export class Recurrence {
  public Id: number;
  public StartDate: Date;
  public StartTime: string;
  public EndDate: Date;
  public EndTime: string;
  public Duration: number;
  public RecurrenceTypeId: number;
  public RecursOn: Date;
  public RecurrenceInterval: number;
  public RecurrenceIntervalDay: number;
  public RecurrenceIntervalMonth: number;
  public RecurrenceEndType: number;
  public RecurrenceEndInterval: number;
  public RecurrenceIntervalHour: number;
  public RecurrenceIntervalMinutes: number;
}
export class RecurrenceDays {
  public Id: number;
  public DayId: number;
  public RecurrenceId: number;
}
export class RecurrenceType {
  public Id: number;
  public RecurrenceType1: string;
}
export class RecurrenceTuple {
  public Item1: Recurrence;
  public Item2: Array<RecurrenceDays>;
}
export class EventRecurrenceDto {
  public Id: number;
  public RecurrenceId: number;
  public EventColor: string;
  public EventName: string;
  public EventNumber: string;
  public EventStartDate: Date;
  public RecurrenceStartDate: Date;
  public RecurrenceStartTime: Time;
  public EventEndDate: Date;
  public RecurrenceEndDate: Date;
  public RecurrenceEndTime: Time;
  public RecursOn: Date;
  public RecurrenceIntervalHour: number;
  public RecurrenceEndInterval: number;
  public RecurrenceEndType: number;
  public RecurrenceInterval: number;
  public RecurrenceIntervalDay: number;
  public RecurrenceIntervalMonth: number;
  public RecurrenceIntervalMinutes: number;
  public RecurrenceTypeId: number;
  public RecurrenceType: string;
  public IsRecurrence: boolean;
  public rrule?: {
    freq: any;
    bymonth?: number;
    bymonthday?: number;
    byweekday?: any;
  };
}
export class EventResponseDto {
  public Id: number;
  public EventType: number;
  public EventName: string;
  public Description: string;
  public StartDate: Date;
  public EndDate: Date;
  public Color: string;
  public IdentNumber: string;
  public IsRecurrence: boolean;
  public RecurrenceId: number;
}
export class EventRequestDto {
  public StartDate: Date;
  public EndDate: Date;
}
