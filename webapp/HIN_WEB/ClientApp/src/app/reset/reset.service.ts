import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor(private http: HttpClient) { }

  updatePassword(oResetPassword) {
    return this.http.post<any>("/api/Authentication/ResetPassword", oResetPassword).pipe();
  }

}
