import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { OAuthSettings } from '../helper/oauth';
import { UserDetail } from '../login/login';
import { NotyHelper } from '../helper/NotyHelper';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public authenticated: boolean;
  public user: UserDetail;

  constructor(
    private msalService: MsalService, private noty: NotyHelper) {
    this.authenticated = false;
    this.user = JSON.parse(localStorage.getItem("userDetail") || '{}');
  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(): Promise<void> {
    //console.log(OAuthSettings);
    let result = await this.msalService.loginPopup(OAuthSettings)
      .catch((reason) => {
        this.noty.ShowNoty('User authentication failed with office 365 : ' + JSON.stringify(reason, null, 2));
      });

    if (result) {
      this.authenticated = true;
    }
  }

  // Sign out
  signOut(): void {
    if (!(this.user && this.user.User)) return;
    this.msalService.clearCacheForScope(this.user.User.OfficeToken);
    this.user = null;
    this.authenticated = false;
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    let result = await this.msalService.acquireTokenSilent(OAuthSettings)
      .catch((reason) => {
        this.noty.ShowNoty('Unable to fetch token from office 365. Connect to your microsoft account and try again or contact support. ' + JSON.stringify(reason, null, 2));
      });

    if (result) {
      {
        if (!(this.user && this.user.User)) return;
        this.user.User.OfficeToken = result.accessToken;
        localStorage.setItem("userDetail", JSON.stringify(this.user));
        this.authenticated = true;
        return result.accessToken;
      }
      
    }
    return null;
  }
}
