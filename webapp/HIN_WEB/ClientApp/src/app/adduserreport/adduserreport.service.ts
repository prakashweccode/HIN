import { Injectable } from '@angular/core';
import { User } from 'oidc-client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdduserreportService {
  
  constructor(private http: HttpClient) { }

  getUserByDate(from, to) {
    return this.http.get<Array<User>>("/api/Report/GetUserByDate?from=" + from + "&to=" + to).pipe();
  }
}
