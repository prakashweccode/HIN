import { Injectable } from '@angular/core';
import { UserDetail } from '../login/login';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public userInformation: UserDetail = JSON.parse(localStorage.getItem("userDetail"));
  constructor(private http: HttpClient) { }

  naveMenu(userInfo) {
    this.userInformation = userInfo;
  }

  clearUser() {
    this.userInformation = null;
  }
  getUserQuotaReports(userId) {
    return this.http.get<any>("/api/Report/GetUserQuotaReports?userId=" + userId).pipe();
  }
}
