import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Deal } from '../model/deal';

@Injectable({
  providedIn: 'root'
})
export class OpportunitypartnerreportService {

  constructor(private http: HttpClient) { }

  getOpportunitiesByPartner(from, to, assignto) {
    return this.http.get<Array<Deal>>("/api/Report/GetOpportunitiesByPartner?from=" + from + "&to=" + to + "&assignto=" + assignto).pipe();
  }
}
