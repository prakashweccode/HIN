import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotyHelper } from '../helper/NotyHelper';
import { UserDetail } from '../login/login';
import { Forgotpassword } from '../model/forgotpassword';
import { ForgotService } from './forgot.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  public isResetPassword: boolean = false;
  public isVerified: boolean = false;
  public isValidating: boolean = false;
  public forgot: Forgotpassword = new Forgotpassword();
  public user: UserDetail = new UserDetail();
  constructor(public forgotService: ForgotService, public noty: NotyHelper, private router: Router) { }

  ngOnInit() {
  }
  verifyEmail() {
    
    this.isValidating = true;
    this.forgotService.verifyEmail(this.forgot).subscribe(data => {
      if (data) {
        this.user = data;
        this.isVerified = true;
        this.noty.ShowNoty("Email send successfully!!!");
      }
      else {
        this.noty.ShowNoty("Email send successfully!!!");
      }
      this.isValidating = false;
    }, err => { }, () => { });
  }

  closeToggle() {
    this.forgot = new Forgotpassword();
    this.isResetPassword = false;
    this.router.navigate(['/login']);
  }
  backToLogin() {
    this.router.navigate(['/login']);
  }

}
