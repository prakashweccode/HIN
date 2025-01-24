import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PipelineGroup, Pipeline } from '../model/pipeline';
import { Deal, DealReportsDto } from '../model/deal';
import { Vendor } from '../model/vendor';

@Injectable({
  providedIn: 'root'
})
export class ListdealsService {
  constructor(public http: HttpClient) { }
  getAllOpportunity() {
    return this.http.get<Array<Deal>>("/api/Deal/GetAllOpportunity").pipe();
  }
  getAllOpportunitiesByStatus(fromDate, toDate, statusId) {
    return this.http.get<Array<DealReportsDto>>("/api/Deal/GetAllOpportunitiesByStatus?from=" + fromDate + "&to=" + toDate + "&statusId=" + statusId).pipe();
  }
  getPipeLineGroup() {
    return this.http.get<Array<PipelineGroup>>("/api/Pipeline/GetPipeLineGroup").pipe();
  }

  getPipeLineByPipeLineGroupId(Id) {
    return this.http.get<Array<Pipeline>>("/api/Pipeline/GetPipeLineByPipeLineGroupId?Id=" + Id).pipe();
  }

  getDealByPipeLineGroupId(Id) {
    return this.http.get<any>("/api/Deal/GetDealByPipeLineGroupId?id=" + Id).pipe();
  }
  getVendorByPipeLineGroupId(Id) {
    return this.http.get<Array<Vendor>>("/api/Vendor/GetVendorByPipeLineGroupId?id=" + Id).pipe();
  }
  updatePipelineId(dealId, pipelineId) {
    return this.http.patch<Deal>("/api/Deal/UpdatePipelineId/" + dealId, pipelineId).pipe();
  }
  saveCancelReason(deal) {
    return this.http.post<Deal>("/api/Deal/SaveCancelReason", deal).pipe();
  }
  updateStatusId(dealId, statusId) {
    return this.http.patch<Deal>("/api/Deal/UpdateStatusId/" + dealId, statusId).pipe();
  }

  updatePipelineStatus(dealId, status) {
    return this.http.patch<Deal>("/api/Deal/updatePipelineStatus/" + dealId, status).pipe();
  }
}
