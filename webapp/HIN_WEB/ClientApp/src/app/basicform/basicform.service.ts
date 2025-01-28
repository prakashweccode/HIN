import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Companyregister } from '../model/companyregister';
import { Temppatient } from '../model/temppatient';
import { LeadExtend } from '../model/lead';
import { PatientFormsDTO } from '../model/PatientFormsDTO';

@Injectable({
  providedIn: 'root'
})
export class BasicformService {

  constructor(private http: HttpClient) { }

  saveTempPatient(tempPatient) {
    return this.http.post<any>("/api/Authentication/SaveTempPatient", tempPatient).pipe();
  }
  saveTenantPatient(tempPatient) {
    return this.http.post<any>("/api/Authentication/SaveTenantPatient", tempPatient).pipe();
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
  validatePatientId(patientNumber) {
    return this.http.get<Temppatient>("/api/Authentication/GetPatientById?PatientNumber=" + patientNumber).pipe();
  }
  getMaritalStatus() {
    return this.http.get<Array<Temppatient>>("/api/Authentication/GetMaritalStatus").pipe();
  }
  getLeadByUserName(userName: string) {
    return this.http.get<LeadExtend>("/api/Authentication/GetLeadDetailsByUserName?userName=" + userName).pipe();
  }

  getPatientAppointmentForms(userName) {
    return this.http.get<Array<PatientFormsDTO>>("/api/Authentication/GetPatientApppointmentForms?userName=" + userName).pipe();
  }
  getPatientDetail(id) {
    return this.http.get<Temppatient>("/api/Authentication/GetpatientDetails?id=" + id).pipe();
  }
}
