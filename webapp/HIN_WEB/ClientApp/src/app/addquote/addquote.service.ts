import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Deal } from '../model/deal';
import { LinePart, PartCatalog } from '../model/addpartcatalog';
import { Quote } from '../model/quote';
import { Services } from '../model/services';

@Injectable({
  providedIn: 'root'
})
export class AddquoteService {

  constructor(public http: HttpClient) { }
  saveQuote(quote) {
    return this.http.post<any>("/api/Quote/SaveQuote", quote).pipe();
  }

  getDealDropdown() {
    return this.http.get<Array<Deal>>("/api/Quote/GetDealDropdown").pipe();
  }
  getProposal() {
    return this.http.get<Array<Quote>>("/api/Quote/GetQuote").pipe();
  }
  getQuoteCatalog(quoteId) {
    return this.http.get<Array<LinePart>>("/api/Quote/GetQuoteCatalog?quoteId=" + quoteId).pipe();
  }
  getPartCatalog() {
    return this.http.get<Array<PartCatalog>>("/api/PartCatalog/GetPartCatalog").pipe();
  }
  getLeadProposal(leadId) {
    return this.http.get<Array<Quote>>("/api/Quote/GetLeadProposal?leadId=" + leadId).pipe();
  }
  getAllLeadServices(leadId) {
    return this.http.get<Array<Services>>("/api/Services/GetAllLeadServices?leadId=" + leadId).pipe();
  }
  getAllDealServices(dealId) {
    return this.http.get<Array<Services>>("/api/Services/GetAllDealServices?dealId=" + dealId).pipe();
  }
  getDealProposal(dealId) {
    return this.http.get<Array<Quote>>("/api/Quote/GetDealProposal?dealId=" + dealId).pipe();
  }
  saveLines(linePart) {
    return this.http.post<any>("/api/PartCatalog/SaveLines", linePart).pipe();
  }
  getQuoteNumber(prefix) {
    return this.http.get<any>("/api/CodeIndent/GetLastQuoteIdentity?prefix=" + prefix);
  }
}

