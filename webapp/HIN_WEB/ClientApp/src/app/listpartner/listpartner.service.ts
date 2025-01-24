import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListpartnerService {

  constructor(public http: HttpClient) { }

  getIndustryEntityType() {
    return this.http.get<any>("/api/ContactInfo/GetIndustryEntityType").pipe();
  }
}
