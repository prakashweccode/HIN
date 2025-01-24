import { Injectable } from '@angular/core';
import { Deal } from '../model/deal';
import { HttpClient } from '@angular/common/http';
import { Users } from '../users/users';
import { Opendeals } from '../model/opendeals';
import { Funnelprogress } from '../model/funnelprogress';
import { Winlossbyrep } from '../model/winlossbyrep';
import { Wondealsbyrep } from '../model/wondealsbyrep';
import { Dealslostyyreason } from '../model/dealslostyyreason';
import { Revenueforecastbyrep } from '../model/revenueforecastbyrep';
import { Leadconversion } from '../model/leadconversion';
import { Proposalclosedbyrep } from '../model/proposalclosedbyrep';
import { Opportunitiesovertime } from '../model/opportunitiesovertime';
import { Proposalsclosedbycustomer } from '../model/proposalsclosedbycustomer';

@Injectable({
  providedIn: 'root'
})
export class AdddealreportService {

  constructor(private http: HttpClient) { }

  getOpportunitiesByDate(opportunityAcquisitionCost) {
    return this.http.post<Array<Deal>>("/api/Report/GetOpportunitiesByDate", opportunityAcquisitionCost).pipe();
  }
  getOpportunityCostReport(opportunityAcquisitionCost) {
    return this.http.post<Array<any>>("/api/Report/GetOpportunityCostReport", opportunityAcquisitionCost).pipe();
  }

  getDealClosedbyMonth(opportunityAcquisitionCost) {
    return this.http.post<Array<Deal>>("/api/Report/GetDealClosedbyMonth", opportunityAcquisitionCost).pipe();
  }
  getOpenDeals(from, to, user) {
    return this.http.post<Array<Opendeals>>("/api/Report/GetOpenDeals", { From: from, To: to, users: user }).pipe();
  }
  getFunnelProgress(funnelProgressRequest) {
    return this.http.post<Array<Funnelprogress>>("/api/Report/GetFunnelProgress", funnelProgressRequest).pipe();
  }
  getWinLossByRep(request) {
    return this.http.post<Array<Winlossbyrep>>("/api/Report/GetWinLossByRep", request).pipe();
  }
  getWonDealsByRep(request) {
    return this.http.post<Array<Wondealsbyrep>>("/api/Report/GetWonDealsByRep", request).pipe();
  }
  getDealsLostByReason(request) {
    return this.http.post<Array<Dealslostyyreason>>("/api/Report/GetDealsLostByReason", request).pipe();
  }
  getRevenueforecastbyrep(request) {
    return this.http.post<Array<Revenueforecastbyrep>>("/api/Report/GetRevenueforecastbyrep", request).pipe();
  }
  getLeadConversion(request) {
    return this.http.post<Array<Leadconversion>>("/api/Report/GetLeadConversion", request).pipe();
  }
  getProposalClosedByRep(request) {
    return this.http.post<Array<Proposalclosedbyrep>>("/api/Report/GetProposalClosedByRep", request).pipe();
  }
  getOpportunitieswonovertime(request) {
    return this.http.post<Array<Opportunitiesovertime>>("/api/Report/GetOpportunitieswonovertime", request).pipe();
  }
  getOpportunitieslostbyreason(request) {
    return this.http.post<Array<Opportunitiesovertime>>("/api/Report/GetOpportunitieslostbyreason", request).pipe();
  }
  getProposalsclosedbycustomer(request) {
    return this.http.post<Array<Proposalsclosedbycustomer>>("/api/Report/GetProposalsclosedbycustomer", request).pipe();
  }
  
}
