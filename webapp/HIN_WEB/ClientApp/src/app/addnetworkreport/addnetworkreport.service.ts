import { Injectable } from '@angular/core';
import { Lead } from '../model/lead';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddnetworkreportService {

  constructor(private http: HttpClient) { }
  
  getLeadReportByNetworking(opportunityAcquisitionCost) {
    return this.http.post<Array<Lead>>("/api/Report/GetLeadReportByNetworking", opportunityAcquisitionCost).pipe();
  }
}
