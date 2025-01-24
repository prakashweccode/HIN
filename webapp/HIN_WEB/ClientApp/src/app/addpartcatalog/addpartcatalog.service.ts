import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PartCatalog } from '../model/addpartcatalog';

@Injectable({
  providedIn: 'root'
})
export class AddpartcatalogService {

  constructor(public http: HttpClient) { }

  savePartCatalog(partCatalog) {
    return this.http.post<any>("/api/PartCatalog/SavePartCatalog", partCatalog).pipe();
  }
  getLeadPartCatalog(leadId) {
    return this.http.get<Array<PartCatalog>>("/api/EventShow/GetLeadPartCatalog?leadId=" + leadId).pipe();
  }
  getDealPartCatalog(dealId) {
    return this.http.get<Array<PartCatalog>>("/api/EventShow/GetDealPartCatalog?dealId=" + dealId).pipe();
  }
  saveLines(linePart) {
    return this.http.post<any>("/api/PartCatalog/SaveLines", linePart).pipe();
  }
}
