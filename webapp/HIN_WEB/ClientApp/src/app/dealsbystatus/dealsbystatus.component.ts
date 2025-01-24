import { Component, OnInit } from '@angular/core';
import { DealReportsDto } from '../model/deal';
import { ListdealsService } from '../listdeals/listdeals.service';
import { Dealreport } from '../model/dealreport';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dealsbystatus',
  templateUrl: './dealsbystatus.component.html',
  styleUrls: ['./dealsbystatus.component.css']
})
export class DealsbystatusComponent implements OnInit {
  public listDeal: Array<DealReportsDto> = [];
  dealReport: Dealreport = new Dealreport();
  radioReport: number = 1;
  statusId: number = 0;
  constructor(private dealService: ListdealsService, private router: Router) { }

  ngOnInit() {
    this.dealReport.reportinput.To = new Date();
    this.dealReport.reportinput.From = new Date();
    //this.getOpportunitiesByStatus(0);
  }
  dealStatusChange(status) {
    this.statusId = status;
  }
  cancel() {
    this.router.navigate(['/reports']);
  }
  getOpportunitiesByStatus() {
    if (this.radioReport == 1) {
      this.dealReport.reportinput.From = this.dealReport.reportinput.To;
    }
    if (this.radioReport == 2) {
      var dateSet = new Date(this.dealReport.reportinput.To);
      dateSet.setMonth(dateSet.getMonth() - 1);
      this.dealReport.reportinput.From = dateSet;
    }
    if (this.radioReport == 4) {
      var yearSet = new Date(this.dealReport.reportinput.To);
      yearSet.setFullYear(yearSet.getFullYear() - 1);
      this.dealReport.reportinput.From = yearSet;
    }
    this.dealService.getAllOpportunitiesByStatus(this.changeFormatDate(this.dealReport.reportinput.From), this.changeFormatDate(this.dealReport.reportinput.To), this.statusId).subscribe(data => {
      if (data)
        this.listDeal = data;
    }, err => { }, () => { });
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
  handleFrequencyChange(evt) {
    if (evt.target.checked) {
      this.radioReport = evt.target.value;
      this.dealReport.reportinput.From = new Date();
      this.dealReport.reportinput.To = new Date();
      this.listDeal = [];
    }
  }
}
