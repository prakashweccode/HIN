import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lead } from '../model/lead';

@Injectable({
  providedIn: 'root'
})
export class AddreferralreportService {

  constructor(private http: HttpClient) { }

  getLeadReportByReferral(opportunityAcquisitionCost) {
    return this.http.post<Array<Lead>>("/api/Report/GetLeadReportByReferral", opportunityAcquisitionCost).pipe();
  }

}
