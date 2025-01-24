import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssignedtogridService {

  constructor(public http: HttpClient) { }


  getData(apiUrl) {
    //return this.http.get<any>(apiUrl + "?pageSize=" + pageSize + "&skip=" + skip).pipe();
    return this.http.get<any>(apiUrl).pipe();
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;
    startPage = 1;
    endPage = totalPages;
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    let pages = this.createArray(startPage, endPage + 1);
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  createArray(startIndex, endIndex) {
    var intArray = [];
    for (var i = startIndex; i <= endIndex - 1; i++) {
      intArray.push(i);
    }
    return intArray;
  }

}
