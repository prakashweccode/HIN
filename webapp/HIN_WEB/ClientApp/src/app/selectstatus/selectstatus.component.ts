import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdddealsService } from '../adddeals/adddeals.service';
import { Dealstatus } from '../helper/dealstatus';
import { DealStatus } from '../model/deal';

@Component({
  selector: 'app-selectstatus',
  templateUrl: './selectstatus.component.html',
  styleUrls: ['./selectstatus.component.css']
})
export class SelectstatusComponent implements OnInit {
  statusId: number;
  status: Array<DealStatus> = [];
  @Output() selectedStatusId = new EventEmitter();

  constructor(public dealStatusService:AdddealsService) { }

  ngOnInit() {
    this.getDealStatus();
  }


  getDealStatus() {
    this.dealStatusService.getDealStatus().subscribe(data => {
      this.status = data;
    }, err => { }, () => { });
  }

  selectStatusId(filterStatus) {
    this.statusId = filterStatus;
    this.selectedStatusId.emit(this.statusId);
  }

  getStatusName(statusId) {
    if (this.status) {
      return this.status.find(x => x.Id == statusId).Name;
    }
  }

  clearStatus() {
    this.statusId = null;
    this.selectedStatusId.emit(null);
  }
}
