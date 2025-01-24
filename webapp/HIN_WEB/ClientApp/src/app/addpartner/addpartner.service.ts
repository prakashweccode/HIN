import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReferralFee, PaymentMode, VendorContact } from '../model/vendor';
import { Providertype } from '../model/providertype';
import { Partner } from '../model/partner';

@Injectable({
  providedIn: 'root'
})
export class AddpartnerService {

  constructor(public http: HttpClient) { }

  savePartner(partners) {
    return this.http.post<any>("/api/Partner/savePartner", partners).pipe();
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
  getPartner() {
    return this.http.get<Array<Partner>>("/api/Partner/GetPartner").pipe();
  }

  getPartnerByPipeLineGroupId(id) {
    return this.http.get<Array<Partner>>("/api/Partner/GetPartnerByPipeLineGroupId?id=" + id).pipe();
  }

  updatePartnerPipelineId(id, pipelineId) {
    return this.http.patch<Partner>("/api/Partner/UpdatePartnerPipelineId/" + id, pipelineId).pipe();
  }

  getPartnerById(partnerId) {
    return this.http.get<Partner>("/api/Partner/GetPartnerById?partnerId=" + partnerId).pipe();
  }
}
