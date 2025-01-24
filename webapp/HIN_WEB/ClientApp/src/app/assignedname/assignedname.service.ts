import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignedname } from './assignedname';

@Injectable({
  providedIn: 'root'
})
export class AssignednameService {

  constructor(public http: HttpClient) { }


  getUserandPartnerName() {
    return this.http.get<Array<Assignedname>>("api/AssignedName/GetUserandPartnerName").pipe();
  }
}
