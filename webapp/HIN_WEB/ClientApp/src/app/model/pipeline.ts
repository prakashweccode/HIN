import { CalendarEvent } from "angular-calendar";
import { EventColor } from "calendar-utils";

export class Pipeline {
  public PipelineId: number;
  public Name: string;
  public Probablity: number;
  public IsRotting: boolean;
  public RottingDays: number;
  public DisplayOrder: number;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
}

export class PipelineGroup {
  public Name: string;
  public PipelineGroupId: number;
  public PipelineGroupType: number;
  public IsDefault: boolean;
  public Pipelines: Array<Pipeline>;
}

export class PipelineGroupType {
  public Id: number;
  public Name: string;
}

export class SfCalendarEvent implements CalendarEvent {
  id?: string | number;
  start: Date;
  end?: Date;
  title: string;
  color?: EventColor;
  actions?: import("calendar-utils").EventAction[];
  allDay?: boolean;
  cssClass?: string;
  actionType?: string;
  resizable?: { beforeStart?: boolean; afterEnd?: boolean; };
  draggable?: boolean;
  meta?: any;
  officeData: any;
}

export class EventSchedule {
  start: string;
  end: string;
}

export enum EventType {
  Todo = 1,
  Appointment = 3
}
