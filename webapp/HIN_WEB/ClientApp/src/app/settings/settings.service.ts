import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../users/users';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(public http: HttpClient) { }

  saveUserTheme(userId, userTheme) {
    return this.http.get<Users>("/api/Users/SaveUserTheme?userId=" + userId + "&userTheme=" + userTheme).pipe();
  }
  saveErpSetting(k9erpsettings) {
    return this.http.post<any>("/api/K9ERPSetting/SaveErpSetting", k9erpsettings).pipe();
  }

  getUserById(userId) {
    return this.http.get<Users>("/api/Users/GetUserById?Id=" + userId).pipe();
  }

  updateUser(user) {
    return this.http.post<Users>("/api/Users/SaveUser", user).pipe();
  }


}
