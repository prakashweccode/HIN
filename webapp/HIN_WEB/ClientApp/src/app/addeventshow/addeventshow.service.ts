import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventMode, Eventshow, EventCost } from '../model/eventshow';
import { Vendor } from '../model/vendor';
import { Referral } from '../model/referral';
import { Partner } from '../model/partner';

@Injectable({
  providedIn: 'root'
})
export class AddeventshowService {

  constructor(public http: HttpClient) { }
  saveEventShow(eventShows) {
    return this.http.post<any>("/api/EventShow/saveEventShow", eventShows).pipe();
  }
  getVendorsByEntityOrigin(entityId, originId) {
    return this.http.get<Array<Vendor>>("/api/Vendor/GetVendorsByEntityOrigin?entityId=" + entityId + "&originId=" + originId).pipe();
  }
  getEventMode() {
    return this.http.get<Array<EventMode>>("/api/EventShow/GetEventMode").pipe();
  }
  getVendor() {
    return this.http.get<Array<Vendor>>("/api/Vendor/GetVendor").pipe();
  }
  getPartner() {
    return this.http.get<Array<Partner>>("/api/Vendor/GetPartner").pipe();
  }
  getReferral() {
    return this.http.get<Array<Referral>>("/api/Vendor/GetReferral").pipe();
  }
  getEventShow() {
    return this.http.get<Array<Eventshow>>("/api/EventShow/GetEventShow").pipe();
  }
  getVendorEvents(vendorId) {
    return this.http.get<Array<Eventshow>>("/api/EventShow/GetVendorEvents?vendorId=" + vendorId).pipe();
  }
  getPartnerEvents(partnerId) {
    return this.http.get<Array<Eventshow>>("/api/EventShow/GetPartnerEvents?partnerId=" + partnerId).pipe();
  }
  getReferralEvents(referralId) {
    return this.http.get<Array<Eventshow>>("/api/EventShow/GetReferralEvents?referralId=" + referralId).pipe();
  }

  saveEventCost(eventCost) {
    return this.http.post<EventCost>("/api/EventShow/SaveEventCost", eventCost).pipe();
  }

  getEventCost(id) {
    return this.http.get<EventCost>("/api/EventShow/GetEventCost?eventId=" + id).pipe();
  }

  getEventShowType() {
    return this.http.get<any>("/api/EventShow/GetEventShowType").pipe();
  }


  getEventShowById(id) {
    return this.http.get<Eventshow>("/api/EventShow/GetEventShowById?eventId=" + id).pipe();
  }
}
