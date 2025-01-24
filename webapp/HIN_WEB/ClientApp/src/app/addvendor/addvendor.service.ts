import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReferralFee, PaymentMode, VendorContact, Vendor } from '../model/vendor';
import { Providertype } from '../model/providertype';

@Injectable({
  providedIn: 'root'
})
export class AddvendorService {

  constructor(public http: HttpClient) { }
  saveVendor(vendors) {
    return this.http.post<any>("/api/Vendor/saveVendor", vendors).pipe();
  }

  getReferralFee() {
    return this.http.get<Array<ReferralFee>>("/api/Vendor/GetReferralFee").pipe();
  }
  getProvider() {
    return this.http.get<Array<Providertype>>("/api/Vendor/GetProvider").pipe();
  }
  getPaymentModel() {
    return this.http.get<Array<PaymentMode>>("/api/Vendor/GetPaymentModel").pipe();
  }
  getVendorContacts(entityId) {
    return this.http.get<Array<VendorContact>>("/api/Vendor/GetVendorContacts?vendorId=" + entityId).pipe();
  }
  getVendor() {
    return this.http.get<Array<Vendor>>("/api/Vendor/GetVendor").pipe();
  }


  getVendorById(vendorId) {
    return this.http.get<Vendor>("/api/Vendor/GetVendorById?vendorId=" + vendorId).pipe();
  }
}
