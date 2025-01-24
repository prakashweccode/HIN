import { Injectable } from '@angular/core';
import { Deal } from '../model/deal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpportunityreferralreportService {

  constructor(private http: HttpClient) { }

  getOpportunitiesByReferral(from, to, assignto) {
    return this.http.get<Array<Deal>>("/api/Report/GetOpportunitiesByReferral?from=" + from + "&to=" + to + "&assignto=" + assignto).pipe();
  }
}
