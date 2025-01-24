import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActualamountService {

  constructor(private http: HttpClient) { }

  saveActualAmount(deal) {
    return this.http.post<any>("/api/Deal/SaveActualAmount", deal).pipe();
  }
}

