import { Injectable } from '@angular/core';
import { Deal } from '../model/deal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpportunityeventreportService {

  constructor(private http: HttpClient) { }

  getOpportunitiesByEvent(from, to, assignto) {
    return this.http.get<Array<Deal>>("/api/Report/GetOpportunitiesByEvent?from=" + from + "&to=" + to + "&assignto=" + assignto).pipe();
  }
}
