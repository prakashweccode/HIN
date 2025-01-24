import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListpartcatalogService {

  constructor(public http: HttpClient) { }

  getUOMName() {
    return this.http.get<any>("/api/ContactInfo/GetUOMName").pipe();
  }
}
