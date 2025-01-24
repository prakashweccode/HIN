import { HttpClient } from '@angular/common/http';
import { Template } from '../model/template';
import { Injectable } from '@angular/core';
import { Deal } from '../model/deal';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) { }

  saveTemplate(template) {
    return this.http.post<any>("/api/Template/AddOrUpdateTemplate", template).pipe();
  }
  getTemplateById(id) {
    return this.http.get<Template>("/api/Template/GetTemplateById?id=" + id).pipe();
  }
  getDefaultData() {
    return this.http.get<any>("/api/Template/GetDefaultData").pipe();
  }
  getTemplatePageById(id) {
    return this.http.get<any>("/api/Template/GetTemplatePageById?id=" + id).pipe();
  }
  SaveDraftTemplate(template) {
    return this.http.post<any>("/api/Template/SaveDraftTemplate", template).pipe();
  }
  SendTemplateMail(model) {
    return this.http.post<any>("/api/Template/SendTemplateMail", model).pipe();
  }
  getSelectedAppointmentDetail(id: number) {
    return this.http.get<any>("/api/Template/GetSelectedAppointmentDetail?id=" + id).pipe();
  }
  getAllPractice() {
    return this.http.get<Array<Deal>>("/api/Template/GetAllPractice").pipe();
  }
  findOneDrive(searchOneDrive) {
    return this.http.post<any>("/api/Template/FindOneDrive", searchOneDrive).pipe();
  }

}
