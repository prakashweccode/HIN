import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'calendar-header',
  template: `
    <div class="w3-row">
      <div class="w3-third w3-center">
        <div class="w3-bar w3-margin-top-medium">
          <div
            class="w3-bar-item w3-button w3-secondary w3-border w3-border-white"
            mwlCalendarPreviousView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >
            < Previous
          </div>
          <div
            class="w3-bar-item w3-button w3-secondary w3-border w3-border-white"
            mwlCalendarToday
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >
            Today
          </div>
          <div
            class="w3-bar-item w3-button w3-secondary w3-border w3-border-white"
            mwlCalendarNextView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >
           Next >
          </div>
        </div>
      </div>
      <div class="w3-third w3-center">
        <div class="w3-bar w3-margin-top-medium">
          <div class="w3-bar-item"><strong>
        {{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}</strong>
      </div>
      </div>
      </div>
      <div class="w3-third w3-center">
        <div class="w3-bar w3-margin-top-medium">
          <div
            class="w3-bar-item w3-button w3-white w3-border w3-border-grey"
            (click)="viewChange.emit(CalendarView.Month)"
            [class.w3-secondary.w3-border-secondary]="view === CalendarView.Month"
            [class.w3-border-secondary]="view === CalendarView.Month"
          >
            Month
          </div>
          <div
            class="w3-bar-item w3-button w3-white w3-border w3-border-grey"
            (click)="viewChange.emit(CalendarView.Week)"
            [class.w3-secondary.w3-border-secondary]="view === CalendarView.Week"
            [class.w3-border-secondary]="view === CalendarView.Week"
          >
            Week
          </div>
          <div
            class="w3-bar-item w3-button w3-white w3-border w3-border-grey"
            (click)="viewChange.emit(CalendarView.Day)"
            [class.w3-secondary]="view === CalendarView.Day"
            [class.w3-border-secondary]="view === CalendarView.Day"
          >
            Day
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CalendarHeaderComponent {
  @Input() view: CalendarView;

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}
