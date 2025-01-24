import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor(public http: HttpClient) { }
  getCsvProperties(entityName) {
    return this.http.get<any>("/api/Import/GetEntityColumns?entityname=" + entityName).pipe();
  }
}
