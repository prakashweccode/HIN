import { Component, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

export class EventData {
  start?: Date;
  end?: Date;
  title?: string;
  isAllday?: boolean;
}
export class CalendarDate {
  mDate!: moment.Moment;
  selected?: boolean;
  today?: boolean;
  w3theme?: boolean;
}

@Component({
  selector: 'app-newdatepicker',
  templateUrl: './newdatepicker.component.html',
  styleUrls: ['./newdatepicker.component.css']
})
export class NewdatepickerComponent implements OnInit {
  public enableCalendar: boolean = false;
  currentDate = moment();
  dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  @Input() fromDate: Date = new Date();
  @Input() disablePastDate: Date | undefined;
  @Input() disabledFutureDate: Date | undefined;
 
  selectedDates: CalendarDate[] = [];
  dateSelected: string = "";
  @Output() selecteddate = new EventEmitter();
  public calendar: CalendarDate = new CalendarDate();
  public isValidate: boolean = true;
  public isSelectValidate: boolean = true;
  differ: KeyValueDiffer<string, any>;
  isHide: boolean = false;
  

  constructor(private differs: KeyValueDiffers, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.isHide) {
        this.enableCalendar = false;
      }
      this.isHide = false;
    });
    this.differ = this.differs.find({}).create();
  }

  ngOnInit(): void {
    if (this.fromDate) {
      this.dateSelected = moment(this.fromDate).format("MM/DD/YYYY");
      this.calendar.mDate = moment(this.fromDate);
      this.currentDate = moment(this.fromDate);
      this.selectedDates.push(this.calendar);
     
    }
    this.generateCalendar();
   
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fromDate'] || changes['disablePastDate']) {
      if (this.fromDate) {
        this.dateSelected = moment(this.fromDate).format("MM/DD/YYYY");
        this.calendar.mDate = moment(this.fromDate);
        this.currentDate = moment(this.fromDate);
        this.selectedDates.push(this.calendar);
        this.generateCalendar();
      }
    }
  }


  preventCloseOnClick() {
    this.isHide = true;
  }

  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
    this.isHide = true;
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
    this.isHide = true;
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.generateCalendar();
    this.isHide = true;
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.generateCalendar();
    this.isHide = true;
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.generateCalendar();
    this.isHide = true;
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.generateCalendar();
    this.isHide = true;
  }

  // generate the calendar grid

  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  selectDate(date: CalendarDate): void {
    this.dateSelected = date.mDate.format("MM/DD/YYYY");
    this.dateValidation(date);
    this.enableCalendar = false;
  }
  checkValidDate(evt: any) {
    if (this.disabledFutureDate && this.dateSelected) {
      var momentDate = moment(this.dateSelected, "MM/DD/YYYY");
      var selectedDate = new Date(momentDate.toDate());
      if (selectedDate <= this.disabledFutureDate) {
        this.isSelectValidate = true;
      }
      else {
        this.isSelectValidate = false;
      }
    }
    
  }

  dateValidate(evt: any) {
    this.isSelectValidate = true;
    if (evt.target.value.length == 2 || evt.target.value.length == 5) {
      this.dateSelected = this.dateSelected + "/";
    }
    let regex = /^(1[0-2]|0[1-9])\/(3[01]|[12][0-9]|0[1-9])\/[0-9]{4}$/;

    //let regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/;
   
    if (regex.test(this.dateSelected)) {
    
      this.isValidate = true;
      var dateMomentObject = moment(this.dateSelected, "MM/DD/YYYY");
      var date = this.changeFormatDate(dateMomentObject.toDate());
      this.calendar.mDate = moment(date);
      this.currentDate = moment(date);
      this.selectedDates.push(this.calendar);
      this.generateCalendar();
      this.selecteddate.emit(date);
    }
    else {
      this.isValidate = false;
      this.selecteddate.emit();
    }
  }

  dateValidation(data: CalendarDate) {
    let regex = /^(1[0-2]|0[1-9])\/(3[01]|[12][0-9]|0[1-9])\/[0-9]{4}$/;
    /*let regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/;*/
    if (regex.test(this.dateSelected)) {
      this.isSelectValidate = true;
      this.isValidate = true;
      var date = this.changeFormatDate(data.mDate);
      this.calendar.mDate = moment(date);
      this.currentDate = moment(date);
      this.selectedDates.push(this.calendar);
      this.generateCalendar();
      this.selecteddate.emit(date);
    }
    else {
      this.isValidate = false;
      this.selecteddate.emit();
    }
  }

  changeFormatDate(date: any) {
    if (date) {
      if (Object.prototype.toString.call(date) === "[object Date]")
        return date.getFullYear() + '-' + (date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? ('0' + (date.getDate())) : (date.getDate()));
      else {
        let clonedDate = new Date(date);
        return clonedDate.getFullYear() + '-' + (clonedDate.getMonth() < 9 ? ('0' + (clonedDate.getMonth() + 1)) : clonedDate.getMonth() + 1) + '-' + (clonedDate.getDate() < 10 ? ('0' + (clonedDate.getDate())) : (clonedDate.getDate()));
      }
    }
    else {
      return date;
    }
  }

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate: { mDate: moment.MomentInput; }) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    }) > -1;
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }
  disablePreviousDate(date: moment.Moment): boolean {
    if (this.disablePastDate) {
      let newDate = moment(this.disablePastDate);
      return moment(date).isBefore(newDate, 'date');
    }
    if (this.disabledFutureDate) {
      let newDate = moment(this.disabledFutureDate);
      return moment(date).isAfter(newDate, 'date');
    }
    
    else {
      return false;
    }
  }
  
  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').add(1, 'days').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42)
      .map((date: number): CalendarDate => {
        const d = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(d),
          selected: this.isSelected(d),
          mDate: d,
        };
      });
  }

  today() {
    var todayDate = moment();
    this.dateSelected = todayDate.format("MM/DD/YYYY");
    var date = this.changeFormatDate(todayDate);
    this.calendar.mDate = moment(date);
    this.currentDate = moment(date);
    this.selectedDates.push(this.calendar);
    this.generateCalendar();
    this.enableCalendar = false;
    this.selecteddate.emit(date);
  }

  clear() {
    this.dateSelected = "";
    this.selecteddate.emit();
    this.enableCalendar = false;
  }
}
