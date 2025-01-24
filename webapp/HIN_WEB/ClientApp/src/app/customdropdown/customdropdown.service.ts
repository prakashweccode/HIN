import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customdropdown } from './customdropdown';

@Injectable({
  providedIn: 'root'
})
export class CustomdropdownService {

  constructor(public http: HttpClient) { }

  saveDropDown(customDropDown) {
    return this.http.post<Customdropdown>("api/CustomDropDown/SaveCustomDropDown", customDropDown).pipe();
  }

  getDropDown(getApiPath) {
    return this.http.get<Array<Customdropdown>>("api/CustomDropDown/GetCustomDropDown?getApiPath=" + getApiPath).pipe();
  }

}
