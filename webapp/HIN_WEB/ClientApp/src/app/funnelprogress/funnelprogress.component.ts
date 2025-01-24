import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdddealreportService } from '../adddealreport/adddealreport.service';
import { AdddealsService } from '../adddeals/adddeals.service';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { NotyHelper } from '../helper/NotyHelper';
import { Deal, OpportunityCostDTO } from '../model/deal';
import { Dealreport } from '../model/dealreport';
import { Funnelprogress } from '../model/funnelprogress';
import { Funnelprogressrequest } from '../model/funnelprogressrequest';
import { Opportunityacquisitioncost } from '../model/opportunityacquisitioncost';
import { PipelineGroup } from '../model/pipeline';

@Component({
  selector: 'app-funnelprogress',
  templateUrl: './funnelprogress.component.html',
  styleUrls: ['./funnelprogress.component.css']
})
export class FunnelprogressComponent implements OnInit {
  funnelProgressRequest: Funnelprogressrequest = new Funnelprogressrequest()
  public lstFunnelprogress: Array<Funnelprogress> = [];
  assignedToGrid: Assignedtogrid = new Assignedtogrid();
  p: number = 1;
  listPipeLineGroup: Array<PipelineGroup>;
  funnel: PipelineGroup = new PipelineGroup()

  constructor(public router: Router, public addDealReportService: AdddealreportService, private notyHelper: NotyHelper) { }

  ngOnInit() {
     this.getAssignedToGridData();
  }
  cancel() {
    this.router.navigate(['/reports']);
  }
  getFunnelProgress() {
    this.addDealReportService.getFunnelProgress(this.funnelProgressRequest).subscribe(data => {
      if (data)
        this.lstFunnelprogress = data;
    }, err => {

    }, () => {

    });
  }
  selectAssignedValue(evt) {
    this.funnelProgressRequest.Funnels = evt;
  }


  getAssignedToGridData() {
    this.assignedToGrid.ApiUrl = "/api/Pipeline/GetPipeLineGroup";
    this.assignedToGrid.AssignedToId = this.funnel.PipelineGroupId;
    this.assignedToGrid.AssignedToType = this.funnel.Name;
    this.assignedToGrid.Title = "Assigned To";
    this.assignedToGrid.KeyId = "PipelineGroupId";
    this.assignedToGrid.KeyValue = "";
    this.assignedToGrid.DisplayName = "Name";
    this.assignedToGrid.GridHeaders = [
      { displayName: 'Name', propertyName: 'Name' }

    ];
  }
  //changeFormatDate(date) {
  //  if (date) {
  //    if (Object.prototype.toString.call(date) === "[object Date]")
  //      return date.getFullYear() + '-' + (date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? ('0' + (date.getDate())) : (date.getDate()));
  //    else {
  //      let clonedDate = new Date(date);
  //      return clonedDate.getFullYear() + '-' + (clonedDate.getMonth() < 10 ? ('0' + (clonedDate.getMonth() + 1)) : clonedDate.getMonth() + 1) + '-' + (clonedDate.getDate() < 10 ? ('0' + (clonedDate.getDate())) : (clonedDate.getDate()));
  //    }
  //  }
  //}
  //handleFrequencyChange(evt) {
  //  if (evt.target.checked) {
  //    this.radioReport = evt.target.value;
  //    this.opportunityacquisitioncost.From = new Date();
  //    this.opportunityacquisitioncost.To = new Date();
  //    this.listDeal = [];
  //  }
  //}
  //clearCreatedDate() {
  //  this.opportunityacquisitioncost.To = null;
  //  this.opportunityacquisitioncost.From = null;
  //}
}
