import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotyHelper } from '../helper/NotyHelper';
import { BasicformService } from '../basicform/basicform.service';
import { MsalService } from '@azure/msal-angular';
import { window } from 'ngx-bootstrap';
import { NavbarService } from '../navbar/navbar.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { OnedrivegraphService } from '../onedriveservice/onedrivegraph.service';
import { LandingpageService } from './landingpage.service';
import { Vendor } from '../model/vendor';
import { CustomDetails } from '../model/CustomDetails';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  public isOpen: boolean = false;
  public isSlideOpen: boolean = false;
  public practiceCode: string;
  public currentPage: number = 1;
  public isLeft: boolean = false;
  public custom: Array<CustomDetails> = [];
  constructor(private sanitizer: DomSanitizer, public router: Router, private notyHelper: NotyHelper, public basicFormService: BasicformService, private msalService: MsalService, private navbarService: NavbarService, private graphService: OnedrivegraphService, public landingPageService: LandingpageService) { }

  ngOnInit() {
    this.getCustom();
  }

  openBasicForm() {
    this.router.navigate(['/basicform']);
  }
  openLogin() {
    this.router.navigate(['/login']);
  }

  clearUser() {
    this.navbarService.clearUser();
    this.msalService.logout();
  }
  loginRedirect() {
    //this.oneDriveAuthService.microsoftLogin();
    this.msalService.loginPopup().then(x => {
      let baseUrl = window.location.origin;
      let userName = x.account.userName;
      let userDomain = userName ? userName.split('@')[1] : '';
      let urlDomain = baseUrl.replace('https://', '');
      if (userDomain && urlDomain) {
        if (userDomain === urlDomain) {
          var msDto = { givenName: x.account.name, userPrincipalName: x.account.userName, surname: '' };
          this.graphService.ValidateUserInHinPortal(msDto).subscribe(_data => {
            console.log(_data);
            if (_data) {
              localStorage.setItem("userDetail", JSON.stringify(_data));
              window.location.href = baseUrl + "/listleads";
            }
          });

        }
        else {
          Swal.fire({
            title: 'Authorization Failed!',
            text: 'User is not associated to "' + urlDomain + '". Signout and try with different account',
            type: 'error',
            showCancelButton: false,
            confirmButtonText: 'Ok',
            cancelButtonText: ''
          }).then((result) => {
            if (result.value) {
              this.clearUser();
            }
          });
        }
      }
      else {
        this.clearUser();
      }
      console.log(userDomain);
      console.log('----------------');
      console.log(urlDomain);
    });
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

  enterPracticeCode() {
    this.isOpen = true;
  }
  closePracticeCode() {
    this.isOpen = false;
  }

  toggleSideBar() {
    if (document.getElementById('mobileSidebar').classList.contains('mobileAsideBar-close')) {
      document.getElementById('sidebarOverlay').classList.remove('d-none');
      document.getElementById('sidebarOverlay').classList.add('d-block');
      document.getElementById('mobileSidebar').classList.remove('mobileAsideBar-close');
      document.getElementById('mobileSidebar').classList.add('mobileAsideBar-open');
      document.querySelector('body').style.overflow = 'unset';
    } else {
      document.getElementById('sidebarOverlay').classList.remove('d-block');
      document.getElementById('sidebarOverlay').classList.add('d-none');
      document.getElementById('mobileSidebar').classList.remove('mobileAsideBar-open');
      document.getElementById('mobileSidebar').classList.add('mobileAsideBar-close');
      document.querySelector('body').style.overflow = 'hidden';
    }
  }

  getCustomTexts(key: string) {
    if (this.custom && this.custom.length > 0) {
      return this.custom.find(x => x.CustomText == key).CustomContact;
    }
    else {
      return;
    }
  }

  getSanitizeHtml(key: string) {
    if (this.custom && this.custom.length > 0) {
      return this.sanitizer.bypassSecurityTrustHtml(this.custom.find(x => x.CustomText == key).CustomContact.toString());
    }
    else {
      return;
    }
  }

  goToNextPage() {
    if (this.currentPage == 1) {
      this.currentPage++;
    }
    else if (this.currentPage == 2) {
      this.currentPage++;
    }
  }


  goToBackPage() {
    this.currentPage--;
  }

  getCustom() {
    this.landingPageService.getCustomDetails().subscribe(data => {
      if (data) {
        this.custom = data;
      }
    })
  }

}
