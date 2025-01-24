import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomProperty, CustomPropertyValues, CustomFieldListItems } from './custom-fields';
import { LeadGenType } from '../helper/LeadGenType';

@Injectable({
  providedIn: 'root'
})
export class CustomFieldsService {

  constructor(private http: HttpClient) {
  }
  getCustomFieldType() {
    return this.http.get<any>("/api/CustomProperty/GetCustomFieldType").pipe();
  }
  saveCustomFields(customFields) {
    return this.http.post<CustomProperty>("/api/CustomProperty/AddCustomProperty", customFields).pipe();
  }
  saveListItems(items) {
    return this.http.post<Array<CustomFieldListItems>>("/api/CustomProperty/saveListItems", items).pipe();
  }
  getListItems(id) {
    return this.http.get<Array<CustomFieldListItems>>("/api/CustomProperty/GetListItems?id=" + id).pipe();
  }
  SaveCustomFieldValues(customFieldValues) {
    return this.http.post<any>("/api/CustomProperty/SaveCustomFieldValues", customFieldValues).pipe();
  }
  getCustomFieldValues(entityId, entityType, alignment) {
    return this.http.get<Array<CustomPropertyValues>>("/api/CustomProperty/GetCustomFieldValues?entityId=" + entityId + "&typeId=" + entityType + "&alignment=" + alignment).pipe();
  }

  deleteCustomField(customFieldId) {
    return this.http.delete<any>("/api/CustomProperty/DeleteCustomFieldValues?id=" + customFieldId).pipe();
  }

}
