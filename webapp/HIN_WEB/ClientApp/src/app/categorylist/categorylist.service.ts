import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, CategoryValues } from '../model/Category';

@Injectable({
  providedIn: 'root'
})
export class CategorylistService {

  constructor(private http: HttpClient) { }
  loadCategories(entity) {
    return this.http.get<Array<Category>>("/api/Category/GetCategory?entityTypeId=" + entity).pipe();
  }
  saveCategories(category) {
    return this.http.post<Category>("/api/Category/SaveCategory", category).pipe();
  }
  saveCategoriesValue(categoryValues) {
    return this.http.post<any>("/api/Category/SaveCategoryValues", categoryValues).pipe();
  }
  loadCategoryValues(entityTypeId, entityId, categoryType) {
    return this.http.get<Array<CategoryValues>>("/api/Category/GetCategoryValues?entityTypeId=" + entityTypeId + "&entityId=" + entityId + "&categoryType=" + categoryType).pipe();
  }
  deleteCategoryValues(entityTypeId, entityId) {
    return this.http.delete<any>("/api/Category/DeleteCategoryValues?entityTypeId=" + entityTypeId + "&entityId=" + entityId).pipe();
  }
}
