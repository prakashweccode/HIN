import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReferralFee, PaymentMode, VendorContact } from '../model/vendor';
import { Providertype } from '../model/providertype';
import { Referral } from '../model/referral';
import { Partner } from '../model/partner';

@Injectable({
  providedIn: 'root'
})
export class AddreferralService {

  constructor(public http: HttpClient) { }

  saveReferral(referrals) {
    return this.http.post<any>("/api/Referral/saveReferral", referrals).pipe();
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
  getReferral() {
    return this.http.get<Array<Referral>>("/api/Referral/GetReferral").pipe();
  }

  getReferralType() {
    return this.http.get<Array<any>>("/api/Referral/GetReferralType").pipe();
  }

  getProviderType() {
    return this.http.get<Array<any>>("/api/Referral/GetProviderType").pipe();
  }

  getReferralByPipeLineGroupId(id) {
    return this.http.get<Array<Referral>>("/api/Referral/GetReferralByPipeLineGroupId?id=" + id).pipe();
  }

  updateReferralPipelineId(id, pipelineId) {
    return this.http.patch<Referral>("/api/Referral/UpdateReferralPipelineId/" + id, pipelineId).pipe();
  }


  getReferralById(referralId) {
    return this.http.get<Referral>("/api/Referral/GetReferralById?referralId=" + referralId).pipe();
  } 

}
