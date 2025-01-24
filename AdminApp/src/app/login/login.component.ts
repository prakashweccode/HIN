import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyUserDataModel } from '../companyapi/models'
import { CompanyUserService } from '../companyapi/services';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { filter } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public companyUserDataModel: CompanyUserDataModel = { userName: '', password: '' };
  loginDisplay = false;
  constructor(public companyUserService: CompanyUserService, private router: Router,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration, private authService: MsalService, private msalBroadcastService: MsalBroadcastService) {

  }

  ngOnInit(): void {

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
     
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
        if (this.authService.instance.getActiveAccount()?.idToken) {
          this.router.navigate(['./home/dashboard']);
          this.setLoginDisplay();
        }
        else {
          this.router.navigate(['/']);
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        if (this.authService.instance.getActiveAccount()?.idToken) {
         this.router.navigate(['./home/dashboard']);
          this.setLoginDisplay();
        }
        else {
         this.router.navigate(['/']);
        }
      })
  }
  validate() {
    this.companyUserService.apiCompanyUserValidateUserPost$Json({ userName: this.companyUserDataModel?.userName!, password: this.companyUserDataModel?.password! })
      .subscribe((data: string | any[]) => {
        if (data.length > 0) {
          this.router.navigate(['./home/dashboard']);
        }
        else {
          alert("Invalid credentials")
        }
      }, (error: any) => { alert("Error while calling request") }, () => { });
  }

  loginRedirect() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }
  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }


  loginPopup() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
    } else {
      this.authService.loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
    }
  }

}
