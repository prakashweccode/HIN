import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dealgetreport',
  templateUrl: './dealgetreport.component.html',
  styleUrls: ['./dealgetreport.component.css']
})
export class DealgetreportComponent implements OnInit {
  @Input() rangeType: number;
  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() handleFrequencyChange = new EventEmitter();
  @Output() dateChanged = new EventEmitter();
  @Output() fromDateChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  handleFrequencyChangeEvent(evt) {
    this.handleFrequencyChange.emit(evt);
  }
  dateChangeEvent(evt) {
    this.dateChanged.emit(evt);
  }
  fromDateChangeEvent(evt) {
    this.fromDateChange.emit(evt);
  }
  changeFormatDate(date) {
    if (date) {
      if (Object.prototype.toString.call(date) === "[object Date]")
        return date.getFullYear() + '-' + (date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? ('0' + (date.getDate())) : (date.getDate()));
      else {
        let clonedDate = new Date(date);
        return clonedDate.getFullYear() + '-' + (clonedDate.getMonth() < 10 ? ('0' + (clonedDate.getMonth() + 1)) : clonedDate.getMonth() + 1) + '-' + (clonedDate.getDate() < 10 ? ('0' + (clonedDate.getDate())) : (clonedDate.getDate()));
      }
    }
  }

}
