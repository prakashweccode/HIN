import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debug } from 'console';
import { Services } from '../model/services';
import { Templatelist } from '../model/templatelist';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  saveService(service) {
    return this.http.post<any>("/api/Services/AddOrUpdateService", service).pipe();
  }
  updateStatusId(serviceId, statusId) {
    return this.http.patch<Services>("/api/Services/UpdateStatusId/" + serviceId, statusId).pipe();
  }
  updateCancelReason(service) {
    return this.http.post<Services>("/api/Services/updateCancelReason", service).pipe();
  }
  getServiceStatus() {
    return this.http.get<any>("/api/Services/GetServiceStatus").pipe();
  }
  getServiceById(id) {
    return this.http.get<any>("/api/Services/GetServiceById?id=" + id).pipe();
  }
  getStepDetails(serviceId) {
    return this.http.get<any>("api/Services/GetStepDetails?serviceId=" + serviceId).pipe();
  }

  getServiceByPipeLineGroupId(id) {
    return this.http.get<Array<Services>>("/api/Services/GetServiceByPipeLineGroupId?id=" + id).pipe();
  }

  updateServicePipelineId(id, pipelineId) {
    return this.http.patch<Services>("/api/Services/UpdateServicePipelineId/" + id, pipelineId).pipe();
  }

  updateServicePipelineStatus(id, statusId) {
    return this.http.patch<Services>("/api/Services/UpdateServicePipelineStatus/" + id, statusId).pipe();
  }

  getAllAppointment() {
    return this.http.get<Array<Services>>("/api/Services/GetAllServices").pipe();
  }
  getAllTemplateList() {
    return this.http.get<any>("/api/Services/GetAllTemplateList").pipe();
  }
  getTemplateListById(templateId) {
    return this.http.get<Templatelist>("/api/Services/GetTemplateListById?templateId=" + templateId).pipe();
  }
  getDealDetails(id) {
    return this.http.get<any>("api/Services/GetDealById?id=" + id).pipe();
  }
  getLeadDetails(id) {
    return this.http.get<any>("api/Services/GetLeadById?id=" + id).pipe();
  }

  getDealAndLead(dealId, leadId) {
    return this.http.get<any>("/api/Services/GetDealAndLead?dealId=" + dealId + "&leadId=" + leadId).pipe();
  }

  getAppointmentForms() {
    return this.http.get<any>("/api/Services/GetAppointmentForms").pipe();
  }

  saveAppointmentFormsMapping(appointmentFormsMapping) {
    return this.http.post<any>("/api/Services/SaveAppointmentFormsMapping", appointmentFormsMapping).pipe();
  }

  saveAppointmentFormsSelected(appointmentForms) {
    return this.http.post<any>("/api/Services/SaveAppointFormsSelected", appointmentForms).pipe();
  }

}
