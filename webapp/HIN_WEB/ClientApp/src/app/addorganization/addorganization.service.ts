import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddorganizationService {

  constructor(public http: HttpClient) { }
  
  saveOrganization(organization) {
    return this.http.post<any>("/api/Organization/SaveOrganization", organization).pipe();
  }
}
