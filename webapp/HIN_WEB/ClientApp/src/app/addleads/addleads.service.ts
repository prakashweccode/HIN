import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../model/currency';
import { Lead, LeadOriginType, LeadStatus, SocialMediaType } from '../model/lead';
import { Networking } from '../model/networking';
import { Industrytype } from '../model/industrytype';
import { Templatelist } from '../model/templatelist';

@Injectable({
  providedIn: 'root'
})
export class AddleadsService {

  constructor(private http: HttpClient) { }
  saveLead(lead) {
    return this.http.post<any>("/api/Lead", lead).pipe();
  }
  getAllLeads() {
    return this.http.get<Array<Lead>>("/api/Lead/GetAllLeads").pipe();
  }
  getAllNetworkings() {
    return this.http.get<Array<Networking>>("/api/Networking/GetNetworking").pipe();
  }
  getLeadById(leadId) {
    return this.http.get<Lead>("/api/Lead/GetLeadById?leadId=" + leadId).pipe();
  }

  getLeadOriginType() {
    return this.http.get<Array<LeadOriginType>>("/api/Lead/GetLeadOriginType").pipe();
  }

  getSocialMediaType() {
    return this.http.get<Array<SocialMediaType>>("/api/Lead/GetSocialMediaType").pipe();
  }

  getLeadsByEntityOrigin(entityId, originId) {
    return this.http.get<Array<Lead>>("/api/Lead/GetLeadsByEntityOrigin?entityId=" + entityId + "&originId=" + originId).pipe();
  }

  getLeadsByPartnerId(partnerId) {
    return this.http.get<Array<Lead>>("/api/Lead/GetLeadsByPartnerId?partnerId=" + partnerId).pipe();
  }

  getLeadsByReferralId(referralId) {
    return this.http.get<Array<Lead>>("/api/Lead/GetLeadsByReferralId?referralId=" + referralId).pipe();
  }
  getUserLeadIds(userId) {
    return this.http.get<Array<number>>("/api/Lead/GetUserLeadIds?userId=" + userId).pipe();
  }

  getIndustryType() {
    return this.http.get<Array<Industrytype>>("/api/Lead/GetIndustryType").pipe();
  }

  getLeadStatus() {
    return this.http.get<Array<LeadStatus>>("/api/Lead/GetLeadStatus").pipe();
  }
  getTemplateList() {
    return this.http.get<Array<Templatelist>>("/api/Authentication/GetTemplateList").pipe();
  }
  getValidatePatient() {
    return this.http.get<any>("/api/Authentication/GetValidatePatientNumber").pipe();
  }

  

}
