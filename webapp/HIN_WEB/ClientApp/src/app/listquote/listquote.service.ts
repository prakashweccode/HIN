import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListquoteService {

  constructor(public http: HttpClient) { }

  getQuoteName() {
    return this.http.get<any>("/api/ContactInfo/GetQuoteName").pipe();
  }
}
