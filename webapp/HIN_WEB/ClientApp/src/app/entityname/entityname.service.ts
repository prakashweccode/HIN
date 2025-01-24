import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntitynameService {

  constructor(private http: HttpClient) { }

  getEntityName(entityTypeId, leadTypeId) {
    return this.http.get<any>("/api/EntityName/GetEntityName?entityTypeId=" + entityTypeId + "&leadTypeId=" + leadTypeId).pipe();
  }
  getLeadGenType() {
    return this.http.get<any>("/api/Todo/GetLeadGenType").pipe();
  }
}
