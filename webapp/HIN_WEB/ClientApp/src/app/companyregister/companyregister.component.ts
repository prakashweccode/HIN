import { Component, OnInit } from '@angular/core';
import { Companyregister, CompanySettings, Settings } from '../model/companyregister';
import { CompanyregisterService } from './companyregister.service';
import { NotyHelper } from '../helper/NotyHelper';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';
import { Users } from '../users/users';
import { UserDetail } from '../login/login';

@Component({
  selector: 'app-companyregister',
  templateUrl: './companyregister.component.html',
  styleUrls: ['./companyregister.component.css']
})
export class CompanyregisterComponent implements OnInit {
  public companyRegister: Companyregister = new Companyregister();
  showSettings: boolean = false;
  settings: Array<Settings> = [];
  companySettings: Array<CompanySettings> = [];
  loggedUser: UserDetail;
  

  constructor(public companyRegisterService: CompanyregisterService, public notification: NotyHelper, public router: Router, public dataShared: Datashared) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem("userDetail"));
    let data = this.dataShared.getValue();
    if (data) {
      this.companyRegister = data;
      this.companyRegister.ConfirmPassword = this.companyRegister.Password;
      //this.getCompanySettingsById(this.companyRegister.RegisterId);
    }
    //else {
    //  this.router.navigate(['/listcompanyregister']);
    //}
    this.getSettings();
  }


  getCompanySettingsById(id) {
    this.companyRegisterService.getCompanySettingsById(id).subscribe(data => {
      this.companySettings = data;
    });
  }

  selectCompanySettingValue(evt) {
    if (evt == "true") {
      return true;
    }
    else {
      return false;
    }
  }

  getSettings() {
    this.companyRegisterService.getSettings().subscribe(data => {
      this.settings = data;
      if (this.companyRegister.RegisterId) {
        this.getCompanySettingsById(this.companyRegister.RegisterId);
      }
      else {
        for (let i = 0; i < this.settings.length; i++) {
          let companySetting = new CompanySettings();
          //companySetting.CompanyId = this.companyRegister.RegisterId;
          companySetting.SettingsId = this.settings[i].Id;
          if (companySetting.SettingsId == 1) {
            companySetting.Value = "true";
          }
          this.companySettings.push(companySetting);
        }
      }
      
    }, err => { }, () => { });
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

  cancel() {
    this.companyRegister = new Companyregister();
  }

  saveCompanyRegister(companyRegister) {
    if (companyRegister.Password == companyRegister.ConfirmPassword) {
      this.companyRegisterService.saveCompanyRegister(companyRegister).subscribe(data => {
        if (data) {
          this.companyRegister = data;
          this.saveCompanySettings(this.companyRegister.RegisterId);
          this.notification.ShowNoty("Company Registerd successfully!");
          //localStorage.clear();
          //this.router.navigate(['/login']);
        }
      }, err => {
          this.notification.ShowNoty("Email already registered!");
      }, () => { });
    }
    else {
      this.notification.ShowNoty("Password mismatch");
    }
  }

  saveCompanySettings(id) {
    for (let i = 0; i < this.companySettings.length; i++) {
      var companySetting = new CompanySettings();
      companySetting.CompanyId = id;
      companySetting.SettingsId = this.companySettings[i].SettingsId;
      companySetting.Value = this.companySettings[i].Value;
      this.companySettings[i] = companySetting;
    }

    this.companyRegisterService.saveSettings(this.companySettings).subscribe(data => {

    });
  }



  back() {
    this.router.navigate(['/listcompanyregister']);
  }


  
}
