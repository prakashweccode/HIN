import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RangeselectDate, RangeselectNumber } from './rangeselect';

@Component({
  selector: 'app-rangeselect',
  templateUrl: './rangeselect.component.html',
  styleUrls: ['./rangeselect.component.css']
})
export class RangeselectComponent implements OnInit {
  public rangeSelectDate: RangeselectDate = new RangeselectDate();
  public rangeSelectNumber: RangeselectNumber = new RangeselectNumber();
  toggle: boolean = false;
  numberToggle: boolean = false;
  @Input() SelectType: string;
  @Output() selectDateRange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  fromDateChangeEvent(evt) {
    if (evt) {
      this.rangeSelectDate.From = evt;
    }
  }

  toDateChangeEvent(evt) {
    if (evt) {
      this.rangeSelectDate.To = evt;
    }
  }

  clearDateRangeData() {
    this.rangeSelectDate = new RangeselectDate();
    this.toggle = false;
    this.selectDateRange.emit(this.rangeSelectDate);

  }

  clearNumberRangeData() {
    this.rangeSelectNumber = new RangeselectNumber();
    this.numberToggle = false;
    this.selectDateRange.emit(this.rangeSelectNumber);
  }

  openModal() {
    this.toggle = true;
  }

  openNumberModal() {
    this.numberToggle = true;
  }


  changeFormatDate(date) {
    if (date) {
      if (Object.prototype.toString.call(date) === "[object Date]") {
        return date.getFullYear() + '-' + (date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? ('0' + (date.getDate())) : (date.getDate()));
      }
      else {
        let clonedDate = new Date(date);
        return clonedDate.getFullYear() + '-' + (clonedDate.getMonth() < 10 ? ('0' + (clonedDate.getMonth() + 1)) : clonedDate.getMonth() + 1) + '-' + (clonedDate.getDate() < 10 ? ('0' + (clonedDate.getDate())) : (clonedDate.getDate()));
      }
    }
  }


  selectRange(rangeSelect) {
    this.selectDateRange.emit(rangeSelect);
    this.toggle = false;
    this.numberToggle = false;
    
  }

}
