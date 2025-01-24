import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lead } from '../model/lead';

@Injectable({
  providedIn: 'root'
})
export class AddleadreportService {

  constructor(private http: HttpClient) { }

  getLeadReportByDate(opportunityAcquisitionCost) {
    return this.http.post<Array<Lead>>("/api/Report/GetLeadReportByDate", opportunityAcquisitionCost).pipe();
  }

}
