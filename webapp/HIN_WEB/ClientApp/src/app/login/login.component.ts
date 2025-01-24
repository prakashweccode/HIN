import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { Title } from '@angular/platform-browser';
import { NotyHelper } from '../helper/NotyHelper';
import { Login, TwoFactor, UserDetail } from './login';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { NavbarService } from '../navbar/navbar.service';
import { ThemeService } from '../loader.service';
import { OnedrivegraphAuthService } from '../onedriveservice/onedrivegraph-auth.service';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public twoFactor: TwoFactor = new TwoFactor();
  public userInfo: UserDetail = new UserDetail();
  public isValidating = false;
  isIframe = false;
  loggedIn = false;
  constructor(public themeService: ThemeService, public router: Router, appConfigSvc: AppConfigService, titleService: Title, private loginService: LoginService, private noty: NotyHelper, public navBarService: NavbarService, private oneDriveAuthService: OnedrivegraphAuthService, public broadcastService: BroadcastService, public authService: MsalService) {
    appConfigSvc.getAppConfig().subscribe(data => {
      titleService.setTitle((data.settings.find(x => x.key == 'AppTitle').value) + " | Login");
    });
  }

  ngOnInit() {
    //localStorage.removeItem("userDetail");
    this.isIframe = window !== window.parent && !window.opener;

    this.checkoutAccount();

    this.broadcastService.subscribe('msal:loginSuccess', () => {
      this.checkoutAccount();
    });

    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }

      console.log('Redirect Success: ', response);
    });

    this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
      console.log('MSAL Logging: ', message);
    }, {
      correlationId: CryptoUtils.createNewGuid(),
      piiLoggingEnabled: false
    }));
  }
  checkoutAccount() {
    this.loggedIn = !!this.authService.getAccount();
  }

  signIn(model: TwoFactor) {
    this.isValidating = true;
    this.loginService.signIn(model).subscribe(data => {
      if (data == null) {
        this.isValidating = false;
        alert("Incorrect username or password");
      }
      else {
        localStorage.setItem("userDetail", JSON.stringify(data));
        if (data.Token) {
          this.navBarService.naveMenu(data);
          this.userInfo = data;
          if (this.userInfo.User.UserTheme != null) {
            this.themeService.selectTheme(this.userInfo.User.UserTheme);
          }
          window.location.href = '/listleads';
          //this.router.navigate(['/listdeals']);
        }
        else {
          this.userInfo = data;
        }
        this.isValidating = false;
      }
    }, err => {
      if (err.error && err.error.detail) {
        this.noty.ShowNoty(err.error.detail);
      }
      this.isValidating = false;
    }, () => { });
  }
  onMicrosoftLogin() {
    this.oneDriveAuthService.microsoftLogin();
    //this.msalService.loginRedirect();
    //const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

    //if (isIE) {
    //  this.authService.loginRedirect();
    //} else {
    //  //this.authService.loginPopup();
    //  this.authService.loginRedirect();
    //}
  }
}
