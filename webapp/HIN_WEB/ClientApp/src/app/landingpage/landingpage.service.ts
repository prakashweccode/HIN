import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomDetails } from '../model/CustomDetails';

@Injectable({
  providedIn: 'root'
})
export class LandingpageService {

  constructor(public http: HttpClient) { }

  getCustomDetails() {
    return this.http.get<Array<CustomDetails>>("/api/CustomDetails/GetCustomDetails").pipe();
  }

}

