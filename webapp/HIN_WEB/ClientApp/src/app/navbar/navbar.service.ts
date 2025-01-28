import { Injectable } from '@angular/core';
import { UserDetail } from '../login/login';
import { HttpClient } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';


@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public userInformation: UserDetail;
  constructor(private http: HttpClient, private graphService: MsalService) {
    if (sessionStorage['msal.idtoken']) {
      this.userInformation = new UserDetail();
      this.userInformation.Token = sessionStorage['msal.idtoken'];
      let account = graphService.getAccount();
      if (account && account.userName) {
        this.userInformation.User.Email = account.userName;
        this.userInformation.User.FirstName = account.name;
      }
    }
    else {
      this.userInformation = undefined;
    }
  }

  naveMenu(userInfo) {
    this.userInformation = userInfo;
  }

  clearUser() {
    sessionStorage.clear();
    this.userInformation = null;
  }
  getUserQuotaReports(userId) {
    return this.http.get<any>("/api/Report/GetUserQuotaReports?userId=" + userId).pipe();
  }
}
