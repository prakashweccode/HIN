import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Companyregister, CompanySettings, Settings } from '../model/companyregister';

@Injectable({
  providedIn: 'root'
})
export class CompanyregisterService {

  constructor(public http: HttpClient) { }

  saveCompanyRegister(companyRegister) {
    return this.http.post<Companyregister>("api/CompanyRegister/SaveCompanyRegister", companyRegister).pipe();
  }

  getSettings() {
    return this.http.get<Array<Settings>>("api/CompanySettings/GetSettings").pipe();
  }

  saveSettings(companySettings) {
    return this.http.post<Array<CompanySettings>>("api/CompanySettings/SaveCompanySettings", companySettings).pipe();
  }

  getCompanySettingsById(id) {
    return this.http.get<Array<CompanySettings>>("api/CompanySettings/GetCompanySettingsById?id=" + id).pipe();
  }
}
