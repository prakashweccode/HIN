import { Injectable } from '@angular/core';
import { Currency } from '../../model/currency';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyyService {

  constructor(public http: HttpClient) { }

  getCurrency() {
    return this.http.get<Array<Currency>>("api/Currency/GetCurrency").pipe();
  }
}
