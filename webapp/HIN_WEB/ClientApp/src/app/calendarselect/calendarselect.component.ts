import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { DealContact } from '../contactinformation/contactinformation';
import { CalendarView, CalendarEventTimesChangedEvent, CalendarMonthViewBeforeRenderEvent, CalendarWeekViewBeforeRenderEvent, CalendarDayViewBeforeRenderEvent } from 'angular-calendar';
import { SfCalendarEvent, EventSchedule } from '../model/pipeline';
import { Subject, fromEvent } from 'rxjs';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  endOfWeek,
  addMinutes,
} from 'date-fns';
interface RecurringEvent {
  title: string;
  color: any;
  start: Date;
  end: Date;
  timestart: Time;
  timeend: Time;
  rrule?: {
    freq: any;
    bymonth?: number;
    bymonthday?: number;
    byweekday?: any;
  };
}
import { SfcalendarService } from '../sfcalendar/sfcalendar.service';
import { WeekViewHourSegment, ViewPeriod } from 'calendar-utils';
import { finalize, takeUntil } from 'rxjs/operators';
import * as moment from 'moment-timezone';
import { Todo } from '../todo/todo';
import { Time } from "ngx-bootstrap/timepicker/timepicker.models";
import { Customdropdown } from '../customdropdown/customdropdown';
moment.tz.setDefault('Utc');
import RRule from 'rrule';
import { AuthService } from '../officeauth/auth.service';
import { GraphService } from '../officeauth/graph.service';

@Component({
  selector: 'app-calendarselect',
  templateUrl: './calendarselect.component.html',
  styleUrls: ['./calendarselect.component.css']
})
export class CalendarselectComponent implements OnInit {

  @Input() calendarToggle: boolean = false;
  public calendarFor: string;
  selectedDealContact = new DealContact();
  chooseStartDate: Date;
  chooseEndDate: Date;
  public nextStepDealContact: DealContact = new DealContact();
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  viewPeriod: ViewPeriod;
  events: SfCalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = false;
  addEventDate: Date;
  dragToCreateActive = false;
  weekStartsOn: 0 = 0;
  public todoList: Array<Todo> = [];
  public listDealContactEvents: Array<DealContact> = [];
  stepTypes: Array<Customdropdown> = [];
  recurringEvents: RecurringEvent[] = [];
  timeArr: Array<string>;
  @Input() entityType: any;
  @Input() entityId: number;
  @Output() close = new EventEmitter();
  @Output() selectStartDate = new EventEmitter
  @Output() selectEndDate = new EventEmitter();


  constructor(private calendarService: SfcalendarService, private cdr: ChangeDetectorRef, private officeService: AuthService, private graphService: GraphService) { }

  ngOnInit() {
    let clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.getRecurrenceEvents();
    this.generateHours();
    this.getStepTypesData();
  }

  closeCalendar() {
    this.close.emit(false);
  }

  changeFormatDate(date) {
    if (date) {
      if (Object.prototype.toString.call(date) === "[object Date]")
        return date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? ('0' + (date.getDate())) : (date.getDate())) + 'T' + (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
      else {
        let clonedDate = new Date(date);
        return clonedDate.getFullYear() + '-' + ((clonedDate.getMonth() + 1) < 10 ? ('0' + (clonedDate.getMonth() + 1)) : clonedDate.getMonth() + 1) + '-' + (clonedDate.getDate() < 10 ? ('0' + (clonedDate.getDate())) : (clonedDate.getDate())) + 'T' + (clonedDate.getHours() < 10 ? ('0' + clonedDate.getHours()) : clonedDate.getHours()) + ':' + (clonedDate.getMinutes() < 10 ? ('0' + clonedDate.getMinutes()) : clonedDate.getMinutes());
      }
    }
  }


  chooseDate() {
    this.selectStartDate.emit(this.chooseStartDate);
    this.selectEndDate.emit(this.chooseEndDate);
    this.closeCalendar();
  }

  dayClicked({ date, events }: { date: Date; events: SfCalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      let endDate = this.viewDate;
      let endDateCloned = new Date(endDate);
      endDateCloned.setHours(23);
      endDateCloned.setMinutes(59);
      this.chooseEndDate = endDateCloned;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    //switch (event.actionType) {
    //  case 'deal':
    //    let dealSchedule = new EventSchedule();
    //    dealSchedule.start = newStart.toLocaleString();
    //    dealSchedule.end = newEnd.toLocaleString();
    //    this.UpdateOppStepsSchedule(event.id, dealSchedule);
    //    break;
    //  case 'todo':
    //    let todoSchedule = new EventSchedule();
    //    todoSchedule.start = newStart.toLocaleString();
    //    todoSchedule.end = newEnd.toLocaleString();
    //    this.UpdateTodoSchedule(event.id, todoSchedule);
    //    break;
    //  default:
    //    this.chooseStartDate = newStart;
    //    this.chooseEndDate = newEnd;
    //    break;
    //}
    this.refresh.next();
  }

  UpdateTodoSchedule(id, todoSchedule) {
    if (id) {
      this.calendarService.UpdateTodoSchedule(id, todoSchedule).subscribe(data => {
        if (data) {

        }
      }, err => { }, () => { });
    }
  }

  UpdateOppStepsSchedule(id, eventSchedule) {
    if (id) {
      this.calendarService.UpdateOppStepsSchedule(id, eventSchedule).subscribe(data => {
        if (data) {

        }
      }, err => { }, () => { });
    }
  }

  hourSegmentClicked(evt) {
    this.addEventDate = evt.date;
    let endDate = this.addEventDate;
    let endDateCloned = new Date(endDate);
    endDateCloned.setMinutes(endDate.getMinutes() + 30);
    this.chooseEndDate = endDateCloned;
  }


  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {

    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          const dragToSelectEvent: SfCalendarEvent = {
            color: {
              primary: '#CCCCCC',
              secondary: '#82c2cf'
            },
            actionType: "newevent",
            officeData: null,
            id: this.events.length,
            title: 'New',
            start: this.chooseStartDate,
            end: this.chooseEndDate,
            meta: {
              tmpEvent: true,
            },
            draggable: true,
            resizable: {
              beforeStart: true, // this allows you to configure the sides the event is resizable from
              afterEnd: true,
            }
          };
          this.events = [...this.events, dragToSelectEvent];
          let lastId = this.events.reverse().find(f => f.actionType == 'newevent').id
          let newEvent = this.events.filter(item => item.actionType == 'newevent' && item.id == lastId);
          if (newEvent.length > 0) {
            this.events = this.events.filter(item => item.actionType != 'newevent');
            this.events.push(newEvent[0]);
          }

          this.dragToCreateActive = false;
          //this.refresh();
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = this.ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );

        const daysDiff =
          this.floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;
        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          this.chooseStartDate = segment.date;
          this.chooseEndDate = newEnd;
        }
      });
  }

  floorToNearest(amount: number, precision: number) {
    return Math.floor(amount / precision) * precision;
  }
  ceilToNearest(amount: number, precision: number) {
    return Math.ceil(amount / precision) * precision;
  }

  updateCalendarEvents(
    viewRender:
      | CalendarMonthViewBeforeRenderEvent
      | CalendarWeekViewBeforeRenderEvent
      | CalendarDayViewBeforeRenderEvent
  ): void {
    if (
      !this.viewPeriod ||
      !moment(this.viewPeriod.start).isSame(viewRender.period.start) ||
      !moment(this.viewPeriod.end).isSame(viewRender.period.end)
    ) {
      this.viewPeriod = viewRender.period;
      this.events = [];
      this.getTodoEvents();
      this.cdr.detectChanges();
    }
  }


  getTodoEvents() {
    this.calendarService.calendarEvents().subscribe(data => {
      if (data) {
        let arrEvents = Array<SfCalendarEvent>();
        this.todoList = data.Item1;
        for (let i = 0; i < this.todoList.length; i++) {
          arrEvents.push({
            id: this.todoList[i].Id,
            actionType: "todo",
            start: new Date(this.todoList[i].StartDate),
            end: new Date(this.todoList[i].EndDate),
            title: "Todo : " + this.todoList[i].TodoName,
            color: {
              primary: (this.todoList[i].Color ? this.todoList[i].Color : '#e797ad'),
              secondary: (this.todoList[i].Color ? this.todoList[i].Color : '#f7dce4')
            },
            draggable: true,
            officeData: null,
            resizable: {
              beforeStart: true, // this allows you to configure the sides the event is resizable from
              afterEnd: true,
            }
          });
        }
        this.listDealContactEvents = data.Item2;
        for (let i = 0; i < this.listDealContactEvents.length; i++) {
          let stepType = this.stepTypes.find(x => x.DropDownId == this.listDealContactEvents[i].StepTypeId).DropDownName;
          arrEvents.push({
            id: this.listDealContactEvents[i].Id,
            actionType: "deal",
            start: new Date(this.listDealContactEvents[i].StartDate),
            end: new Date(this.listDealContactEvents[i].EndDate),
            title: "Opportunity : " + stepType + " " + (this.listDealContactEvents[i].ContactName ? this.listDealContactEvents[i].ContactName : ''),
            color: {
              primary: (this.listDealContactEvents[i].Color ? this.listDealContactEvents[i].Color : '#e797ad'),
              secondary: (this.listDealContactEvents[i].Color ? this.listDealContactEvents[i].Color : '#f7dce4')
            },
            draggable: true,
            officeData: null,
            resizable: {
              beforeStart: true, // this allows you to configure the sides the event is resizable from
              afterEnd: true,
            }
          });
        }
        this.events = arrEvents;
        this.recurringEvents.forEach((event) => {
          let startHour = parseInt(event.timestart.toString().split(':')[0]);
          let startMinutes = parseInt(event.timestart.toString().split(':')[1]);
          let startSeconds = parseInt(event.timestart.toString().split(':')[2]);
          let endHour = parseInt(event.timeend.toString().split(':')[0]);
          let endMinutes = parseInt(event.timeend.toString().split(':')[1]);
          let endSeconds = parseInt(event.timeend.toString().split(':')[2]);
          let startDate = new Date(new Date(event.start).setUTCHours(startHour, startMinutes, startSeconds));
          let endDate = new Date(new Date(event.end).setUTCHours(endHour, endMinutes, endSeconds));
          //let startHour: number = isNaN(event.timestart.hour) ? parseInt(event.timestart.hour) : event.timestart.hour;
          const rule: RRule = new RRule({
            ...event.rrule,
            dtstart: startDate,
            //interval: 1,
            until: endDate,
          });
          const { title, color } = event;
          rule.all().forEach((date) => {
            this.events.push({
              title,
              color,
              start: moment(date).local(true).toDate(),
              end: moment(date.setUTCHours(date.getUTCHours() + 2)).local(true).toDate(),
              officeData: null
            });
          });
        });
      }
    }, err => { }, () => { });
  }


  getRecurrenceEvents() {
    this.calendarService.getRecurrenceEvents().subscribe(data => {
      if (data) {
        data.forEach(recurrence => {
          switch (recurrence.RecurrenceTypeId) {
            case 1:
              this.recurringEvents.push({
                color: recurrence.EventColor,
                title: recurrence.EventName,
                start: recurrence.EventStartDate,
                end: recurrence.EventEndDate,
                timestart: recurrence.RecurrenceStartTime,
                timeend: recurrence.RecurrenceEndTime,
                rrule: {
                  freq: RRule.DAILY
                }
              });
              break;
            case 2:
              this.recurringEvents.push({
                color: recurrence.EventColor,
                title: recurrence.EventName,
                start: recurrence.EventStartDate,
                end: recurrence.EventEndDate,
                timestart: recurrence.RecurrenceStartTime,
                timeend: recurrence.RecurrenceEndTime,
                rrule: {
                  freq: RRule.WEEKLY,
                  byweekday: [RRule.MO, RRule.WE]
                }
              });
              break;
            case 3:
              this.recurringEvents.push({
                color: recurrence.EventColor,
                title: recurrence.EventName,
                start: recurrence.EventStartDate,
                end: recurrence.EventEndDate,
                timestart: recurrence.RecurrenceStartTime,
                timeend: recurrence.RecurrenceEndTime,
                rrule: {
                  freq: RRule.MONTHLY,
                  bymonthday: new Date(recurrence.RecursOn).getDay()
                }
              });
              break;
            case 4:
              this.recurringEvents.push({
                color: recurrence.EventColor,
                title: recurrence.EventName,
                start: recurrence.EventStartDate,
                end: recurrence.EventEndDate,
                timestart: recurrence.RecurrenceStartTime,
                timeend: recurrence.RecurrenceEndTime,
                rrule: {
                  freq: RRule.YEARLY,
                  bymonth: new Date(recurrence.RecurrenceStartDate).getMonth() + 1,
                  bymonthday: new Date(recurrence.RecurrenceStartDate).getDay()
                }
              });
              break;
          }
        });
      }
    });
  }

  generateHours() {
    var d = new Date(); //get a date object
    d.setHours(0, 0, 0, 0); //reassign it to today's midnight
    var date = d.getDate();
    var timeArr = [];
    while (date == d.getDate()) {
      let hours: any = d.getHours()
      let minute: any = d.getMinutes();
      hours = hours == 0 ? 12 : hours; //if it is 0, then make it 12
      var ampm = "am";
      ampm = hours > 12 ? "pm" : "am";
      hours = hours > 12 ? hours - 12 : hours; //if more than 12, reduce 12 and set am/pm flag
      hours = ("0" + hours).slice(-2); //pad with 0
      minute = ("0" + d.getMinutes()).slice(-2); //pad with 0
      timeArr.push(hours + ":" + minute + " " + ampm);
      d.setMinutes(d.getMinutes() + 120); //increment by 60 minutes
    }
    this.timeArr = timeArr;
  }

  getStepTypesData() {
    this.calendarService.getStepTypesData().subscribe(data => {
      if (data)
        this.stepTypes = data;
      this.getTodoEvents();
    }, err => {

    }, () => {

    });
  }

  async signIn(): Promise<void> {
    if (!this.authenticated)
      await this.officeService.signIn();
    else {
    }
  }
  get authenticated(): boolean {
    return this.officeService.authenticated;
  }
  async signOut(): Promise<void> {
    await this.officeService.signOut();
  }
  async getCalendars(): Promise<void> {
    let calendars = await this.graphService.getCalendars();
  }

}
