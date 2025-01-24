import { Injectable } from '@angular/core';
import { Lead } from '../model/lead';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddeventreportService {

  constructor(private http: HttpClient) { }

  
  getLeadReportByEvent(opportunityAcquisitionCost) {
    return this.http.post<Array<Lead>>("/api/Report/GetLeadReportByEvent", opportunityAcquisitionCost).pipe();
  }
}
