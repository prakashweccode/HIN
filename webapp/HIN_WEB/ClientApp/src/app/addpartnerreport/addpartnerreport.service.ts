import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lead } from '../model/lead';

@Injectable({
  providedIn: 'root'
})
export class AddpartnerreportService {

  constructor(private http: HttpClient) { }

  getLeadReportByPartner(opportunityAcquisitionCost) {
    return this.http.post<Array<Lead>>("/api/Report/GetLeadReportByPartner", opportunityAcquisitionCost).pipe();
  }
}
