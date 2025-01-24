import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListleadsService {

  constructor(public http: HttpClient) { }


  updateStatus(data) {
    return this.http.post<any>("api/Lead/UpdateStatus", data).pipe();
  }

  updateSecurityGroup(data) {
    return this.http.post<any>("api/Lead/UpdateSecurityGroup", data).pipe();
  }

  updateAssignedTo(data) {
    return this.http.post<any>("api/Lead/UpdateAssignedToId", data).pipe();
  }


}
