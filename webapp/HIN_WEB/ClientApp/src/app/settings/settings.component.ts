import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from './settings.service';
import { LoaderService, ThemeService } from '../loader.service';
import { Users } from '../users/users';
import { NotyHelper } from '../helper/NotyHelper';
import { AuthService } from '../officeauth/auth.service';
import { GraphService } from '../officeauth/graph.service';
import { K9erpsetting } from '../model/k9erpsetting';
import { UserDetail } from '../login/login';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public k9erpsettings: K9erpsetting = new K9erpsetting();
  activeContainer: string = 'tab3';
  public themeId: number;
  public user: Users = new Users;
  public themes = [{ Id: 1, Name: "Dark", FileName: "blackandgreen.css" }, { Id: 2, Name: "Cherry Tomato", FileName: "cherrytomato.css" }, { Id: 3, Name: "Martini Olive", FileName: "martiniolive.css" }, { Id: 4, Name: "Navy Peony", FileName: "navypeony.css" }, { Id: 5, Name: "Nebulas Blue", FileName: "nebulasblue.css" }, { Id: 6, Name: "Purple", FileName: "purple.css" }, { Id: 7, Name: "Red Pear", FileName: "redpear.css" }, { Id: 8, Name: "Russet Orange", FileName: "russetorange.css" }, { Id: 9, Name: "Sailor Blue", FileName: "sailorblue.css" }, { Id: 10, Name: "Snorkel Blue", FileName: "snorkelblue.css" }, { Id: 11, Name: "Ultra Violet", FileName: "ultraviolet.css" }];
  public isSignPad: boolean = false;
  public loggedUser: any;

  constructor(public router: Router, public themeService: ThemeService, public settingService: SettingsService, public notyHelper: NotyHelper, private officeService: AuthService, private graphService: GraphService, public notification: NotyHelper) { }

  ngOnInit() {
    var data = JSON.parse(localStorage.getItem("userDetail"));
    this.loggedUser = JSON.parse(localStorage.getItem("userDetail"));
    if (localStorage.getItem("userDetail")) {
      this.getUserById(data.User.UserId);
    }
    //this.themeId = 1;
  }

  SelectFile(file) {

  }

  getUserById(id) {
    this.settingService.getUserById(id).subscribe(data => {
      if (data) {
        //if (data.Signature) {
        //  let signatureModel = JSON.parse(atob(data.Signature));
        //  console.log(signatureModel);
        //  data.Signature = signatureModel.signature;
        //  console.log(data.Signature);
        //}
        this.user = data;
        this.themeId = this.themes.find(x => x.FileName == (this.user.UserTheme ? this.user.UserTheme : 'Dark')).Id;
        this.isSignPad = true;
      } 
    });
  }

  signPad() {
    return this.isSignPad;
  }

  //showSignPad() {
  //  return this.isSignPad = true;
  //}
  //hideSignPad() {
  //  return this.isSignPad = false;
  //}

  toggleSignPad() {
    this.isSignPad = !this.isSignPad;
  }

  updateUser(user) {
    if (this.themeId == 0 || this.themeId == null) {
      this.themeId = 1;
    }
    this.user.UserTheme = this.themes.find(x => x.Id == this.themeId).FileName;
    //let signatureModel = { signature: user.Signature, secretKey: "HINAPP123", clientKey: "DP123" }
    //user.Signature = btoa(JSON.stringify(signatureModel));
    this.settingService.updateUser(user).subscribe(data => {
      if (data) {
        this.user = data;
        this.notyHelper.ShowNoty("User updated successfully..");
        //localStorage.clear();
        let userDetails = <UserDetail>JSON.parse(localStorage.getItem("userDetail"));
        userDetails.User = this.user;
        localStorage.setItem("userDetail", JSON.stringify(userDetails));
      }
    });
  }

  ngOnDestroy() {
    this.loggedUser = null;
  }

  selectTheme(themeId) {
    if (themeId == 0 || themeId == null) {
      themeId = 1;
    }
    var theme = this.themes.find(x => x.Id == themeId).FileName;
    this.themeService.selectTheme(theme);
    this.settingService.saveUserTheme(this.user.UserId, theme).subscribe(data => {
      if (data != null) {
        this.notyHelper.ShowNoty("User theme saved");
      }
    }, err => { }, () => { });
  }

  cancel() {
    this.router.navigate(['/home']);
  }


  async signIn(): Promise<void> {
    if (!this.authenticated)
      await this.officeService.signIn();
    else {
    }
  }
  get authenticated(): boolean {
    return this.officeService.authenticated;
  }
  async signOut(): Promise<void> {
      await this.officeService.signOut();
  }
  saveErpSetting(k9erpsettings) {
    this.settingService.saveErpSetting(k9erpsettings).subscribe(data => {
      if (data != null) {
        this.k9erpsettings = data;
        this.notification.ShowNoty("Save Successfully");
        this.router.navigate(['/home']);
      }
      else {
        this.notification.ShowNoty("Error Occured");
      }
    });
  }
  async getCalendars(): Promise<void> {
    let calendars = await this.graphService.getCalendars();
  }
  checkValidation(obj) {
    if (obj)
      return obj.invalid && (obj.dirty || obj.touched);
    else
      return false;
  }
  checkReqValidation(obj) {
    if (obj)
      return obj.invalid;
    else
      return false;
  }
}
