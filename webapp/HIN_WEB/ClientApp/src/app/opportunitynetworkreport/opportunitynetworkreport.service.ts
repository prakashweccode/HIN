import { Injectable } from '@angular/core';
import { Deal } from '../model/deal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpportunitynetworkreportService {

  constructor(private http: HttpClient) { }

  getOpportunitiesByNetwork(from, to, assignto) {
    return this.http.get<Array<Deal>>("/api/Report/GetOpportunitiesByNetwork?from=" + from + "&to=" + to + "&assignto=" + assignto).pipe();
  }
}
