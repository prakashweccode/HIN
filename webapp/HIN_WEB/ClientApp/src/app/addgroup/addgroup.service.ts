import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserGroups, UserGroupMapping } from './addgroup';
import { LeadGroupMapping } from '../model/lead';

@Injectable({
  providedIn: 'root'
})
export class AddgroupService {

  constructor(public http: HttpClient) { }

  saveUserGroups(group) {
    return this.http.post<any>("/api/Group/SaveUsergroups", group).pipe();
  }

  GetUserGroups() {
    return this.http.get<Array<UserGroups>>("/api/Group/GetUserGroups").pipe();
  }
  getUserGroupMapping(userId) {
    return this.http.get<Array<UserGroupMapping>>("/api/Group/GetUserGroupMapping?userId=" + userId).pipe();
  }
  getLeadGroupMapping(leadId) {
    return this.http.get<Array<LeadGroupMapping>>("/api/Group/GetLeadGroupMapping?leadId=" + leadId).pipe();
  }

  saveUserGroupMapping(userGroupMapping) {
    return this.http.post<Array<UserGroupMapping>>("/api/Group/SaveUsergroupMapping", userGroupMapping).pipe();
  }
  deleteUserGroupMapping(userId) {
    return this.http.delete<any>("/api/Group/DeleteUserGroupMapping?userId=" + userId).pipe();
  }
  saveLeadGroupMapping(leadGroupMapping) {
    return this.http.post<Array<LeadGroupMapping>>("/api/Group/SaveLeadgroupMapping", leadGroupMapping).pipe();
  }
  deleteLeadGroupMapping(leadId) {
    return this.http.delete<any>("/api/Group/DeleteLeadGroupMapping?leadId=" + leadId).pipe();
  }
}
