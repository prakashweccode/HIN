import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DealStatus, Deal } from '../model/deal';
import { Providerstatus } from '../model/providerstatus';

@Injectable({
  providedIn: 'root'
})
export class AdddealsService {
 
  constructor(private http: HttpClient) { }

  saveDeal(lead) {
    return this.http.post<any>("/api/Deal/SaveDeal", lead).pipe();
  }

  getDeal(usertext) {
    return this.http.get<any>("/api/Deal/GetDeal?searchtext=" + usertext).pipe();
  }
  getDealById(id) {
    return this.http.get<any>("/api/Deal/GetDealById?dealId=" + id).pipe();
  }

  getDealStatus() {
    return this.http.get<Array<DealStatus>>("api/Deal/GetDealStatus").pipe();
  }
  getOpportunity() {
    return this.http.get<Array<Deal>>("api/Deal/GetDeals").pipe();
  }

  getStepDetails(deal) {
    return this.http.post<any>("api/Deal/GetStepDetails", deal).pipe();
  }

  updateDealProbability() {
    return this.http.get<any>("api/Deal/UpdateDealProbability").pipe();
  }

  getProviderStatus() {
    return this.http.get<Array<Providerstatus>>("api/Deal/GetProviderStatus").pipe();
  }

}
