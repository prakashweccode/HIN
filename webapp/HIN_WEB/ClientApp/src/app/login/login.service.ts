import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TwoFactor } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  signIn(model: TwoFactor ) {
    return this.http.post<any>("/api/Authentication/PortalLogin", model).pipe();
  }
}
