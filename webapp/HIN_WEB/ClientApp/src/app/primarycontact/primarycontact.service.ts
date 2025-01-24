import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contactinformation } from '../contactinformation/contactinformation';

@Injectable({
  providedIn: 'root'
})
export class PrimarycontactService {

  constructor(private http: HttpClient) { }

  getPrimaryContact(entityId, type) {
    return this.http.get<Contactinformation>("api/PrimaryContact/GetPrimaryContact?entityId=" + entityId + "&type=" + type);
  }

  savePrimaryContact(contactInfo) {
    return this.http.post<Contactinformation>("api/PrimaryContact/SavePrimaryContact", contactInfo).pipe();
  }


}
