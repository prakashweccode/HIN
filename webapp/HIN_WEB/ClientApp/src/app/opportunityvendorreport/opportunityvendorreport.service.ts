import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Deal } from '../model/deal';

@Injectable({
  providedIn: 'root'
})
export class OpportunityvendorreportService {

  constructor(private http: HttpClient) { }

  getOpportunitiesByVendor(opportunityAcquisitionCost) {
    return this.http.post<Array<Deal>>("/api/Report/GetOpportunitiesByVendor", opportunityAcquisitionCost).pipe();
  }
}
