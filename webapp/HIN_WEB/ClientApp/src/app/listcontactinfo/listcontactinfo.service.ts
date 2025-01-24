import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gender } from '../model/gender';

@Injectable({
  providedIn: 'root'
})
export class ListcontactinfoService {

  constructor(public http: HttpClient) { }

  getDropdowns() {
    return this.http.get<any>("/api/ContactInfo/GetGenderEntityType").pipe();
  }

  sendBatchEmail(batchEmailSender) {
    return this.http.post<any>("api/EmailTemplate/SendBatchEmail", batchEmailSender).pipe();
  }
  sendEmailsToGroups(batchEmailSender) {
    return this.http.post<any>("api/EmailTemplate/SendEmailsToGroups", batchEmailSender).pipe();
  }
  getContactsForGroup(groupId) {
    return this.http.get<any>("/api/EmailTemplate/GetContactsForGroup?groupId=" + groupId).pipe();
  }
}

