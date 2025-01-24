import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resetpassword } from '../model/resetpassword';
import { ResetService } from './reset.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  public isSuccess: boolean = false;
  public oResetPassword: Resetpassword = new Resetpassword();
  constructor(private router: Router, private resetPwdService: ResetService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.oResetPassword.userId = this.route.snapshot.queryParamMap.get('userid');
    this.oResetPassword.email = this.route.snapshot.queryParamMap.get('email');
  }
  redirectToLogin() {
    this.isSuccess = false;
    this.router.navigate(['/login']);
  }

  resetPassword() {

    if (this.oResetPassword.password == this.oResetPassword.confirmPassword) {
      this.resetPwdService.updatePassword(this.oResetPassword).subscribe(data => {
        if (data != null) {
          
          this.isSuccess = true;
        }
      }, err => {
        /*this.errHandler.handleError(err, "Error!", "");*/
      });
    }
    else {

    }
  }
}
