import { ChangeDetectorRef, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as hello from 'hellojs/dist/hello.all.js';
import { forkJoin } from 'rxjs';
import { explorerValues, Onedriveconfig } from '../helper/onedriveconfig';
import { ThemeService } from '../loader.service';
import { TwoFactor, UserDetail } from '../login/login';
import { LoginService } from '../login/login.service';
import { OnedrivegraphService } from './onedrivegraph.service';

@Injectable({
  providedIn: 'root'
})
export class OnedrivegraphAuthService {
  public userInfo: UserDetail = new UserDetail();
  email: string;
  constructor(
    private zone: NgZone,
    private router: Router, public themeService: ThemeService, private loginService: LoginService) { }

  initAuth(graphService: OnedrivegraphService, changeDetectorRef: ChangeDetectorRef) {
    setInterval(this.refreshAccessToken, 1000 * 60 * 10);
    hello.init({
      msft: {
        id: Onedriveconfig.appId,
        oauth: {
          version: 2,
          auth: Onedriveconfig.graphAuthUrl
        },
        scope_delim: ' ',
        form: false
      },
    },
      { redirect_uri: '/' }
    );

    hello.on('auth.login', function (auth) {
      let accessToken;
      if (auth.network === 'msft') {
        const authResponse = hello('msft').getAuthResponse();
        accessToken = authResponse.access_token;
      }
      if (accessToken) {
        explorerValues.authentication.status = 'authenticated';
        changeDetectorRef.detectChanges();
        explorerValues.authentication.user = {};
        graphService.executeQuery('GET', Onedriveconfig.graphV1Url).subscribe(data => {
          if (data) {
            explorerValues.authentication.user = data;
            localStorage.setItem('hin-msft-user', JSON.stringify(data));
            graphService.ValidateUserInHinPortal(explorerValues.authentication.user).subscribe(_data => {
              if (_data) {
                localStorage.setItem("userDetail", JSON.stringify(_data));
              }
            });
          }
        });
        //const params = '?$select=displayName,mail,userPrincipalName,jobTitle,mobilePhone,department,officeLocation';
        //const userData = graphService.executeQuery('GET', Onedriveconfig.graphV1Url + params);
        //const userPhoto = graphService.executeQuery('GET_BINARY', Onedriveconfig.graphBetaUrl + 'photo/$value');
        //forkJoin(userData, userPhoto)
        //  .subscribe((result: any) => {
        //    explorerValues.authentication.user.displayName = result[0].displayName;
        //    explorerValues.authentication.user.mail = result[0].mail || result[0].userPrincipalName;
        //    explorerValues.authentication.user.jobTitle = result[0].jobTitle;
        //    explorerValues.authentication.user.mobilePhone = result[0].mobilePhone;
        //    explorerValues.authentication.user.officeLocation = result[0].officeLocation;
        //    explorerValues.authentication.user.department = result[0].department;
        //    const blob = new Blob([result[1]], { type: 'image/jpeg' });
        //    const imageUrl = window.URL.createObjectURL(blob);
        //    explorerValues.authentication.user.profileImageUrl = imageUrl;
        //    explorerValues.showImage = true;
        //    console.log(explorerValues);
        //    explorerValues.authentication.status = 'authenticated';
        //    changeDetectorRef.detectChanges();
        //  }, e => {
        //    console.log(e);
        //  });
      }
    });
    explorerValues.authentication.status = this.haveValidAccessToken() ? 'authenticating' : 'anonymous';
  }

  login() {
    const loginProperties = {
      display: 'popup',
      mkt: Onedriveconfig.Language,
      scope: Onedriveconfig.scope
    };
    hello('msft').login(loginProperties).then(() => {
      this.zone.run(() => {
        //this.router.navigate(['/addleads']);
      });
    },
      e => console.error(e.error.message)
    );
  }

  microsoftLogin() {
    const loginProperties = {
      display: 'popup',
      mkt: Onedriveconfig.Language,
      scope: Onedriveconfig.scope
    };
    hello('msft').login(loginProperties).then(() => {
      this.zone.run(() => {
        setTimeout(function () {
          window.location.href = "/listleads";
        }, 3000);
        //console.log(localStorage.getItem('userDetail'));
        //var loginModal = new TwoFactor();
        //loginModal.Login.UserName = "dinesh@healthinformation.network";
        //loginModal.Login.IsMicrosoftAuth = true;
        //this.loginService.signIn(loginModal).subscribe(data => {
        //  if (data) {
        //    localStorage.setItem("userDetail", JSON.stringify(data));
        //    window.location.href = '/listleads';
        //    //localStorage.setItem("msUser", JSON.stringify(data));
        //    //this.router.navigate(['/listleads']);
        //  }
        //}, err => { }, () => { });
      });
    },
      e => console.error(e.error.message)
    );
  }

  logout() {
    hello('msft').logout().then(() => {
      this.zone.run(() => {
        //this.router.navigate(['/addleads']);
      });
    },
      e => console.error(e.error.message)
    );
    explorerValues.authentication.status = 'anonymous';
    explorerValues.authentication.user = {};
  }

  localLogout() {
    explorerValues.selectedOption = 'GET';
    if (typeof hello !== 'undefined') {
      hello('msft').logout(null, { force: true });
    }
    explorerValues.authentication['status'] = 'anonymous';
    explorerValues.authentication.user = {};
  }

  refreshAccessToken() {
    if (explorerValues.authentication.status !== 'authenticated') {
      console.log('Not refreshing access token since user is logged out or currently logging in.', new Date());
      return;
    }
    explorerValues.authentication.status = 'authenticating';
    const loginProperties = {
      display: 'none',
      response_type: 'token',
      response_mode: 'fragment',
      nonce: 'graph_explorer',
      prompt: 'none',
      scope: Onedriveconfig.scope,
      login_hint: explorerValues.authentication.user.mail,
      domain_hint: 'organizations'
    };
    const silentLoginRequest = hello('msft').login(loginProperties);
    silentLoginRequest.then(function () {
      explorerValues.authentication.status = 'authenticated';
      console.log('Successfully refreshed access token.', new Date());
    }, function (e) {
      console.error('Error refreshing access token', e, new Date());
      this.checkHasValidAuthToken();
    });
  }

  checkHasValidAuthToken() {
    if (!this.haveValidAccessToken() && this.isAuthenticated()) {
      console.log('App says user is authenticated, but doesn\'t have a valid access token.', new Date());
      this.logout();
    }
  }

  haveValidAccessToken() {
    const session = hello('msft').getAuthResponse();
    if (!session) {
      return false;
    }
    const currentTime = (new Date()).getTime() / 1000;
    return session && session.access_token && session.expires > currentTime;
  }

  isAuthenticated() {
    return explorerValues.authentication['status'] !== 'anonymous';
  }
}
