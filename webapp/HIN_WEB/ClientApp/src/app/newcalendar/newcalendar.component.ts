import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { endOfDay, endOfMonth, endOfWeek, isSameDay, isSameMonth, startOfDay, startOfMonth, startOfWeek } from 'date-fns';
import format from 'date-fns/format/index.js';
import { Time } from 'ngx-bootstrap/timepicker/timepicker.models';
import RRule from 'rrule';
import { Subject } from 'rxjs';
import { NotyHelper } from '../helper/NotyHelper';
import { ModalService } from '../loader.service';
import { EventRequestDto, EventResponseDto } from '../model/AppointmentRecurrence';
import { EventType, SfCalendarEvent } from '../model/pipeline';
import { GraphService } from '../officeauth/graph.service';
import { NewcalendarService } from './newcalendar.service';
import * as moment from 'moment';
import { Datashared } from '../helper/datashared';
interface RecurringEvent {
  title: string;
  color: any;
  start: Date;
  end: Date;
  timestart: Time;
  timeend: Time;
  rrule?: {
    freq: any;
    byday?: any;
    bymonth?: number;
    bymonthday?: number;
    byweekday?: any;
    interval?: number;
    count?: number;
  };
}

@Component({
  selector: 'app-newcalendar',
  templateUrl: './newcalendar.component.html',
  styleUrls: ['./newcalendar.component.css']
})

export class NewcalendarComponent implements OnInit {
  public filterByDate: EventRequestDto = new EventRequestDto();
  public allEvents: Array<EventResponseDto> = [];
  public view: CalendarView = CalendarView.Week;
  public viewDate: Date = new Date();
  public events: SfCalendarEvent[] = [];
  recurringEvents: RecurringEvent[] = [];
  refresh = new Subject<void>();
  public activeDayIsOpen: boolean = false;
  public officeToggle: boolean = false;
  public isOffice365Connected: boolean = false;
  public showOfficeData: boolean = false;
  public officeInfo: any;
  public calendars: any;
  public clientTimeZone: any;
  public modalEmpty: boolean = true;
  public addEventDate: Date;
  public menuTopLeftPosition = { x: '0', y: '0' }
  public chooseStartDate: Date;
  public chooseEndDate: Date;
  //addEvent: boolean = false;

  constructor(private newCalendarService: NewcalendarService, private router: Router, public dataHelper: Datashared, private graphService: GraphService, private notification: NotyHelper, private modalService: ModalService,) {
    this.clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  ngOnInit() {
    this.refreshCalendar();
  }

  enumToString(enumeration: any, value: any): string {
    for (var k in enumeration)
      if (enumeration[k] == value)
        return <string>k;
    return null;
  }
  refreshCalendar() {
    this.getCalendarEventsByRange();
    this.getRecurrenceEvents();
  }
  async getCalendarEventsByRange() {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];
    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];
    this.filterByDate.StartDate = new Date(format(getStart(this.viewDate), 'yyyy-MM-dd'));
    this.filterByDate.EndDate = new Date(format(getEnd(this.viewDate), 'yyyy-MM-dd'));
    this.newCalendarService.getAllEventsByRange(this.filterByDate).subscribe(_data => {
      if (_data) {
        this.allEvents = _data;
        let arrEvents = Array<SfCalendarEvent>();
        this.allEvents.forEach(_event => {
          if (_event) {
            arrEvents.push({
              id: _event.Id,
              actionType: this.enumToString(EventType, _event.EventType),
              start: new Date(_event.StartDate),
              end: new Date(_event.EndDate),
              title: this.enumToString(EventType, _event.EventType) + " : " + (_event.EventName ? (_event.EventName) : ("") + (_event.Description ? (_event.Description) : (""))),
              color: {
                primary: (_event.Color ? _event.Color : '#e797ad'),
                secondary: (_event.Color ? _event.Color : '#f7dce4')
              },
              //cssClass: 'w3-secondary w3-round-large w3-text-white',
              draggable: false,
              officeData: null,
              resizable: {
                beforeStart: true, // this allows you to configure the sides the event is resizable from
                afterEnd: true,
              }
            });
          }
        });
        this.events = arrEvents;
        this.recurringEvents.forEach((event) => {
          let startHour = parseInt(event.timestart.hour.toString());
          let startMinutes = parseInt(event.timestart.minute.toString());
          let startSeconds = parseInt(event.timestart.seconds.toString());
          let endHour = parseInt(event.timeend.hour.toString());
          let endMinutes = parseInt(event.timeend.minute.toString());
          let endSeconds = parseInt(event.timestart.seconds.toString());
          let startDate = new Date(new Date(event.start).setHours(startHour, startMinutes, startSeconds));
          let endDate = new Date(new Date(event.end).setHours(endHour, endMinutes, endSeconds));
          const rule: RRule = new RRule({
            ...event.rrule,
            dtstart: startDate,
            interval: event.rrule.interval,
            until: endDate,
            freq: event.rrule.freq,
            bynweekday: event.rrule.byweekday,
            bymonthday: event.rrule.bymonthday,
            bymonth: event.rrule.bymonth
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
    }, _err => { }, () => { });
    if (this.isOffice365Connected && this.showOfficeData) {
      this.notification.ShowNoty("Loading office 365 data...");
      this.calendars = await this.graphService.getCalendarEventsByRange(this.filterByDate.StartDate.toISOString(), this.filterByDate.EndDate.toISOString(), this.clientTimeZone);
      if (this.calendars && this.calendars.value && this.calendars.value.length > 0) {
        this.calendars.value.forEach(async x => {
          this.addOffice365CalendarEvent(x.start.dateTime, x.end.dateTime, x.id, "Office365", x.subject, x);
        });
      }
      this.notification.ShowNoty("Office 365 data loaded successfully.");
    }
  }

  getRecurrenceEvents() {
    this.newCalendarService.getServiceRecurrenceEvents().subscribe(data => {
      if (data.Item1) {
        data.Item1.forEach(recurrence => {
          let strStartTime = JSON.parse(JSON.stringify(recurrence.RecurrenceStartTime));
          let recurrenceDays = [];
          let startDateClone = new Date(recurrence.RecurrenceStartDate);
          if (recurrence.RecurrenceEndType == 1) {
            recurrence.RecurrenceEndDate = new Date(startDateClone);
            recurrence.RecurrenceEndDate.setFullYear(startDateClone.getFullYear() + recurrence.RecurrenceEndInterval);
          }
          else if (recurrence.RecurrenceEndType == 2) {
            recurrence.RecurrenceEndDate = new Date(startDateClone);
            switch (recurrence.RecurrenceTypeId) {
              case 1:
                recurrence.RecurrenceEndDate.setDate(startDateClone.getDate() + recurrence.RecurrenceEndInterval);
                break;
              case 2:
                recurrence.RecurrenceEndDate.setDate(startDateClone.getDate() + (7 * recurrence.RecurrenceEndInterval));
                break;
              case 3:
                recurrence.RecurrenceEndDate.setMonth(startDateClone.getMonth() + recurrence.RecurrenceEndInterval);
                break;
              case 4:
                recurrence.RecurrenceEndDate.setFullYear(startDateClone.getFullYear() + recurrence.RecurrenceEndInterval);
                break;
            }
          }
          else {
            /*recurrence.RecurrenceEndDate = new Date(startDateClone);*/
          }
          if (data.Item2)
            recurrenceDays = data.Item2.filter(x => x.RecurrenceId == recurrence.RecurrenceId);
          let weekDays = (recurrenceDays && recurrenceDays.length > 0) ? recurrenceDays.map(x => x.DayId) : [];
          recurrence.RecurrenceStartTime =
          {
            hour: parseInt(strStartTime.split(':')[0]),
            minute: parseInt(strStartTime.split(':')[1]),
            seconds: 0
          }
          recurrence.RecurrenceEndTime =
          {
            hour: (recurrence.RecurrenceIntervalHour) ? (parseInt(strStartTime.split(':')[0]) + recurrence.RecurrenceIntervalHour + ((parseInt(strStartTime.split(':')[1]) + recurrence.RecurrenceIntervalMinutes) == 60 ? 1 : 0)) : (strStartTime.split(':')[0]),
            minute: (recurrence.RecurrenceIntervalMinutes) ? ((parseInt(strStartTime.split(':')[1]) + recurrence.RecurrenceIntervalMinutes) == 60 ? 0 : (parseInt(strStartTime.split(':')[1]) + recurrence.RecurrenceIntervalMinutes)) : (strStartTime.split(':')[1]),
            seconds: 0
          }
          switch (recurrence.RecurrenceTypeId) {
            case 1:
              this.recurringEvents.push({
                color: recurrence.EventColor,
                title: recurrence.EventName,
                start: recurrence.RecurrenceStartDate,
                end: recurrence.RecurrenceEndDate,
                timestart: recurrence.RecurrenceStartTime,
                timeend: recurrence.RecurrenceEndTime,
                rrule: {
                  freq: RRule.DAILY,
                  interval: recurrence.RecurrenceInterval
                }
              });
              break;
            case 2:
              this.recurringEvents.push({
                color: recurrence.EventColor,
                title: recurrence.EventName,
                start: recurrence.RecurrenceStartDate,
                end: recurrence.RecurrenceEndDate,
                timestart: recurrence.RecurrenceStartTime,
                timeend: recurrence.RecurrenceEndTime,
                rrule: {
                  freq: RRule.WEEKLY,
                  byweekday: weekDays.map(x => {
                    switch (x) {
                      case 1:
                        return 'SU';
                      case 2:
                        return 'MO';
                      case 3:
                        return 'TU';
                      case 4:
                        return 'WE';
                      case 5:
                        return 'TH';
                      case 6:
                        return 'FR';
                      case 7:
                        return 'SA';
                    }
                  }),
                  interval: recurrence.RecurrenceInterval
                }
              });
              break;
            case 3:
              this.recurringEvents.push({
                color: recurrence.EventColor,
                title: recurrence.EventName,
                start: recurrence.RecurrenceStartDate,
                end: recurrence.RecurrenceEndDate,
                timestart: recurrence.RecurrenceStartTime,
                timeend: recurrence.RecurrenceEndTime,
                rrule: {
                  freq: RRule.MONTHLY,
                  bymonthday: recurrence.RecurrenceIntervalDay,
                  interval: recurrence.RecurrenceInterval
                }
              });
              break;
            case 4:
              this.recurringEvents.push({
                color: recurrence.EventColor,
                title: recurrence.EventName,
                start: recurrence.RecurrenceStartDate,
                end: recurrence.RecurrenceEndDate,
                timestart: recurrence.RecurrenceStartTime,
                timeend: recurrence.RecurrenceEndTime,
                rrule: {
                  freq: RRule.YEARLY,
                  bymonthday: recurrence.RecurrenceIntervalDay,
                  bymonth: recurrence.RecurrenceIntervalMonth,
                  interval: recurrence.RecurrenceInterval
                }
              });
              break;
          }
        });
      }
    });
  }

  addOffice365CalendarEvent(start, end, id, type, title, officeData) {
    this.events.push({
      id: id,
      actionType: type,
      start: new Date(start),
      end: new Date(end),
      title: "Office365: " + title,
      color: {
        primary: '#CCCCCC',
        secondary: '#FAE3E3'
      },
      draggable: false,
      officeData: officeData
    });
    this.refresh.next();
  }

  closeOfficeToggle() {
    this.officeToggle = false;
  }

  statusEmitter(value) {
    this.isOffice365Connected = value;
    this.getCalendarEventsByRange();
  }

  hourSegmentClicked(evt) {

  }

  handleEvent(action: string, event: SfCalendarEvent): void {
    if (event.actionType == "Todo") {
      this.newCalendarService.getTodoById(event.id).subscribe(data => {
        if (data) {
          let todoInfo = data;
          this.dataHelper.setValue(todoInfo);
          //this.dataHelper.setPermissionBaseValue("6.4");
          this.router.navigate(['/todo']);
        }
      }, err => { }, () => { });
    }
    else if (event.actionType == "Office365") {
      this.officeInfo = event.officeData;
      this.officeToggle = true;
    }
    else if (event.actionType == "Service") {
      if (event.id) {
        this.newCalendarService.getServiceById(event.id).subscribe(data => {
          if (data) {
            let serviceInfo = data;
            this.dataHelper.setValue(serviceInfo);
            this.router.navigate(['/editservice']);
          }
        }, err => { }, () => { });
      }
    }
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
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  closeEventAdd() {
    //this.addEvent = false;
  }

  addTodo(date: Date): void {
    this.dataHelper.resetSession();
    this.dataHelper.setDateValue(date);
    this.navigate('todomodal', true);
  }

  addService(date: Date): void {
    this.dataHelper.resetSession();
    this.dataHelper.setDateValue(date);
    this.navigate('addservicemodal', true);
  }

  navigate(path, ismodel) {
    if (ismodel) {
      this.modalService.show(null);
      this.router.navigate([{ outlets: { modal: [path] } }]);
    }
    else {
      this.router.navigate(['/' + path]);
    }
  }

  addNewService() {
    this.dataHelper.resetSession();
    this.navigate('addservicemodal', true);
  }

  addNewTodo() {
    this.dataHelper.resetSession();
    this.navigate('todomodal', true);
  }

}
