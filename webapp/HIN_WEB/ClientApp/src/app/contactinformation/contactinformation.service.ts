import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contactinformation, DealContact, DealContactNextStep } from './contactinformation';
import { Timecost } from '../model/timecost';
import { Materialcost } from '../model/materialcost';
import { Deal } from '../model/deal';
import { VendorContact, VendorContactNextStep, VendorMaterialCost, VendorTimeCost } from '../model/vendor';
import { Contacttitle } from '../model/contacttitle';
import { Partner } from '../model/partner';
import { Referral } from '../model/referral';
import { Contactinformationemailmapping } from '../model/contactinformationemailmapping';

@Injectable({
  providedIn: 'root'
})
export class ContactinformationService {

  constructor(private http: HttpClient) { }
  getContactInformation(entityType, entityId, additionalInfo) {
    return this.http.get<Array<Contactinformation>>("/api/ContactInfo/GetContactInfos?entityType=" + entityType + "&entityId=" + entityId + "&additionalInfo=" + additionalInfo).pipe();
  }
  getContactById(contactId) {
    return this.http.get<Contactinformation>("/api/ContactInfo/GetContactById?contactId=" + contactId).pipe();
  }
  getLeadOpportunities(leadId) {
    return this.http.get<Array<Deal>>("/api/ContactInfo/GetLeadOpportunities?leadId=" + leadId).pipe();
  }
  getPartnerEntity(vendorId) {
    return this.http.get<Array<Partner>>("/api/ContactInfo/GetPartnerEntity?vendorId=" + vendorId).pipe();
  }
  getEventPartnerEntity(eventId) {
    return this.http.get<Array<Partner>>("/api/ContactInfo/GetEventPartnerEntity?eventId=" + eventId).pipe();
  }

  getNetworkEntity(networkingId) {
    return this.http.get<Array<Partner>>("/api/ContactInfo/GetNetworkEntity?networkingId=" + networkingId).pipe();
  }
  getReferralNetworkEntity(networkingId) {
    return this.http.get<Array<Referral>>("/api/ContactInfo/GetReferralNetworkEntity?networkingId=" + networkingId).pipe();
  }
  getReferralEventEntity(eventId) {
    return this.http.get<Array<Referral>>("/api/ContactInfo/GetReferralEventEntity?eventId=" + eventId).pipe();
  }
  addContactInfo(contactInfo) {
    return this.http.post<Contactinformation>("/api/ContactInfo/AddContactInfo", contactInfo).pipe();
  }
  getNewEntityId(entity, prefix) {
    return this.http.get<any>("/api/CodeIndent/GetLastIndentByEntity?entity=" + entity + "&prefix=" + prefix).pipe();
  }
  getEntityByOrigin(originId) {
    return this.http.get<any>("/api/ContactInfo/GetEntityByOrigin?originId=" + originId).pipe();
  }
  getAffiliateName(type, entityId) {
    return this.http.get<any>("/api/ContactInfo/GetAffiliateName?type=" + type + "&entityId=" + entityId).pipe();
  }
  addContactNextStep(dealContactNextStep, dealContactId) {
    dealContactNextStep.StartDate = dealContactNextStep.StartDate.toLocaleString();
    dealContactNextStep.EndDate = dealContactNextStep.EndDate.toLocaleString();
    return this.http.post<DealContactNextStep>("api/ContactInfo/AddDealContactNextStep?dealContactId=" + dealContactId, dealContactNextStep).pipe();
  }
  addVendorContactNextStep(vendorContactNextStep, vendorContactId) {
    return this.http.post<VendorContactNextStep>("api/ContactInfo/AddVendorContactNextStep?vendorContactId=" + vendorContactId, vendorContactNextStep).pipe();
  }
  SaveContactInfos(lstContactInfos) {
    return this.http.post<any>("/api/ContactInfo/SaveContactInfos", lstContactInfos).pipe();
  }
  UpdateContact(contactInfo) {
    return this.http.post<Contactinformation>("/api/ContactInfo/UpdateContact", contactInfo).pipe();
  }
  getContactsByName(searchValue) {
    return this.http.get<Array<Contactinformation>>("/api/ContactInfo/GetContactsByName?contactName=" + searchValue).pipe();
  }
  getAllContactInfos() {
    return this.http.get<Array<Contactinformation>>("/api/ContactInfo/GetAllContactInfos").pipe();
  }

  getAllContactTitle() {
    return this.http.get<Array<Contacttitle>>("/api/ContactInfo/GetAllContactTitle").pipe();
  }

  getDealContacts(entityId, entityType) {
    return this.http.get<Array<DealContact>>("/api/ContactInfo/GetDealContacts?entityId=" + entityId + "&entityType=" + entityType).pipe();
  }
  getAllDealContact() {
    return this.http.get<Array<DealContact>>("/api/ContactInfo/GetAllDealContacts").pipe();
  }
  UpdateDealContact(dealContact) {
    dealContact.StartDate = dealContact.StartDate.toLocaleString();
    dealContact.EndDate = dealContact.EndDate.toLocaleString();
    return this.http.post<DealContact>("/api/ContactInfo/UpdateDealContact", dealContact).pipe();
  }
  UpdateVendorContact(vendorContact) {
    return this.http.post<VendorContact>("/api/ContactInfo/UpdateVendorContact", vendorContact).pipe();
  }
  UpdateDealContactNote(dealContactId, note) {
    return this.http.get<DealContact>("/api/ContactInfo/UpdateDealContactNote?dealContactId=" + dealContactId + "&note=" + note).pipe();
  }
  UpdateVendorContactNote(vendorContactId, note) {
    return this.http.get<VendorContact>("/api/ContactInfo/UpdateVendorContactNote?vendorContactId=" + vendorContactId + "&note=" + note).pipe();
  }
  SaveDealContact(dealContact) {
    return this.http.post<DealContact>("/api/ContactInfo/SaveDealContact", dealContact).pipe();
  }
  SaveTimeCost(timecost, dealContactId) {
    timecost.DealContactId = dealContactId;
    return this.http.post<Timecost>("/api/Deal/SaveTimeCost?dealContactId=" + dealContactId, timecost).pipe();
  }
  GetTimeCost(dealContactId) {
    return this.http.get<Array<Timecost>>("/api/Deal/GetTimeCost?dealContactId=" + dealContactId).pipe();
  }
  SaveMaterialCost(materialcost, dealContactId) {
    materialcost.DealContactId = dealContactId;
    return this.http.post<Materialcost>("/api/Deal/SaveMaterialCost?dealContactId=" + dealContactId, materialcost).pipe();
  }
  GetMaterialCost(dealContactId) {
    return this.http.get<Array<Materialcost>>("/api/Deal/GetMaterialCost?dealContactId=" + dealContactId).pipe();
  }

  SaveVendorTimeCost(timecost, vendorContactId) {
    return this.http.post<any>("/api/Deal/SaveVendorTimeCost?vendorContactId=" + vendorContactId, timecost).pipe();
  }
  GetVendorTimeCost(vendorContactId) {
    return this.http.get<VendorTimeCost>("/api/Deal/GetVendorTimeCost?vendorContactId=" + vendorContactId).pipe();
  }
  SaveVendorMaterialCost(materialcost, vendorContactId) {
    return this.http.post<any>("/api/Deal/SaveVendorMaterialCost?vendorContactId=" + vendorContactId, materialcost).pipe();
  }
  GetVendorMaterialCost(vendorContactId) {
    return this.http.get<VendorMaterialCost>("/api/Deal/GetVendorMaterialCost?vendorContactId=" + vendorContactId).pipe();
  }
  getDealContactNextStep(nextStepId) {
    return this.http.get<DealContactNextStep>("/api/ContactInfo/GetContactNextStep?nextStepId=" + nextStepId).pipe();
  }
  getVendorContactNextStep(nextStepId) {
    return this.http.get<VendorContactNextStep>("/api/ContactInfo/GetVendorContactSteps?nextStepId=" + nextStepId).pipe();
  }
  saveOrUpdateGroup(group) {
    return this.http.post<any>("/api/ContactInfo/SaveOrUpdateGroup", group).pipe();
  }
  getContactGroups(groupId) {
    return this.http.get<any>("/api/ContactInfo/GetContactGroups?groupId=" + groupId).pipe();
  }

  saveSelectedContact(selectedContact) {
    return this.http.post<Contactinformation>("/api/ContactInfo/SaveSelectedContact", selectedContact).pipe();
  }


  SaveContactInfoEmail(email) {
    return this.http.post<any>("/api/ContactInfo/SaveContactInfoEmail", email).pipe();
  }

  getContactInfoEmail(id) {
    return this.http.get<Array<Contactinformationemailmapping>>("/api/ContactInfo/GetContactInfoEmail?id=" + id).pipe();
  }

}
