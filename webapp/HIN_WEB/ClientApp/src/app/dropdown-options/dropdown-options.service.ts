import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityListOption } from '../model/config';

@Injectable({
  providedIn: 'root'
})
export class DropdownOptionsService {

  constructor(private http: HttpClient) { }

  getDropDownOptions(entityType) {
    return this.http.get<Array<EntityListOption>>("/api/EntityListOption/GetDropDownOptions?entityType=" + entityType).pipe();
  }
  saveOptions(listItems) {
    return this.http.post<any>("/api/EntityListOption/SaveListOptions", listItems).pipe();
  }
  updateListOption(item) {
    return this.http.post<any>("/api/EntityListOption/UpdateListOption", item).pipe();
  }
}
