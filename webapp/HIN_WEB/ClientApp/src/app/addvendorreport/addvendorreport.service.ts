import { Injectable } from '@angular/core';
import { Vendor } from '../model/vendor';
import { HttpClient } from '@angular/common/http';
import { Lead } from '../model/lead';

@Injectable({
  providedIn: 'root'
})
export class AddvendorreportService {

  constructor(private http: HttpClient) { }

  getLeadReportByVendor(opportunityAcquisitionCost) {
    return this.http.post<Array<Lead>>("/api/Report/GetLeadReportByVendor", opportunityAcquisitionCost).pipe();
  }

}
