import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListorganizationService {

  constructor(private http: HttpClient) { }
  getOrg(usertext) {
    return this.http.get<any>("/api/Organization/GetOrg?searchtext=" + usertext).pipe();
  }
}
