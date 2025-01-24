import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomProperty } from '../custom-fields/custom-fields';

@Injectable({
  providedIn: 'root'
})
export class CustomsectionService {

  constructor(private http: HttpClient) { }
  getCustomFields(entityType, alignment) {
    return this.http.get<Array<CustomProperty>>("/api/CustomProperty/GetCustomFieldByType?typeId=" + entityType + "&alignment=" + alignment).pipe();
  }
}
