import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../model/currency';
import { Reason } from '../model/reason';

@Injectable({
  providedIn: 'root'
})
export class AddcurrencyService {

  constructor(public http: HttpClient) { }
  saveCurrency(currencies) {
    return this.http.post<any>("/api/Currency/saveCurrency", currencies).pipe();
  }
  getReason() {
    return this.http.get<Array<Reason>>("/api/Currency/GetReason").pipe();
  }
 
}
