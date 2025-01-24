import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  constructor(private http: HttpClient) { }

  verifyEmail(forgotpassword) {
    return this.http.post<any>("/api/Authentication/ForgotPassword", forgotpassword).pipe();
  }
  
}
