import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Companyregister } from '../model/companyregister';

@Injectable({
  providedIn: 'root'
})
export class BasicformService {

  constructor(private http: HttpClient) { }

  saveTempPatient(tempPatient) {
    return this.http.post<any>("/api/Authentication/SaveTempPatient", tempPatient).pipe();
  }

  approvePatient(tempPatient) {
    return this.http.post<any>("/api/Lead/ApprovePatient", tempPatient).pipe();
  }

  getTenantDetail(code:string) {
    return this.http.get<Companyregister>("/api/Authentication/GetTenantDetail?code=" + code).pipe();
  }
  validatePracticeCode(code: string) {
    return this.http.get<Companyregister>("/api/Authentication/GetValidatePracticeCode?code=" + code).pipe();
  }
}
