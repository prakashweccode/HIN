import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';
import { Organization } from '../model/organization';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  getUser(usertext) {
    return this.http.get<any>("/api/Users/GetUser?searchtext=" + usertext).pipe();
  }
  getUsers() {
    return this.http.get<any>("/api/Users/GetUsers").pipe();
  }
  getUserById(id) {
    return this.http.get<Users>("/api/Users/GetUserById?Id=" + id).pipe();
  }
  GetOrganizationById(id) {
    return this.http.get<Organization>("/api/Organization/GetOrganizationById?Id=" + id).pipe();
  }
  getGroupUsers(groupId) {
    return this.http.get<Array<Users>>("/api/Users/GetGroupUsers?groupId=" + groupId);
  }
  saveUsers(users) {
    return this.http.post<any>("/api/Users/SaveUsers", users).pipe();
  }

}
