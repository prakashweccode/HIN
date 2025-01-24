import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnedrivegraphAuthService } from '../onedriveservice/onedrivegraph-auth.service';
import { NotyHelper } from '../helper/NotyHelper';
import { BasicformService } from '../basicform/basicform.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  public isOpen: boolean = false;
  public practiceCode: string;
  constructor(public router: Router, private oneDriveAuthService: OnedrivegraphAuthService, private notyHelper: NotyHelper, public basicFormService: BasicformService) { }

  ngOnInit() {
  }

  openBasicForm() {
    this.router.navigate(['/basicform']);
  }
  openLogin() {
    this.router.navigate(['/login']);
  }
  loginRedirect() {
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

  practiceCodeValidate() {
    this.basicFormService.validatePracticeCode(this.practiceCode).subscribe(data => {
      if (data) {
        this.router.navigate(['/patientform/' + this.practiceCode]);
      }
      else {
        this.notyHelper.ShowNoty("Enter Valid PracticeCode.");
      }
    })
  }



  gotoPatientForm() {
    if (this.practiceCode) {
      this.router.navigate(['/patientform/' + this.practiceCode]);
    }
    else {
      this.notyHelper.ShowNoty("Code is required.");
    }
  }

}
