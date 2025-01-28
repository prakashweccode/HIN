import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomDetails } from '../model/CustomDetails';
import { Router } from '@angular/router';
import { NotyHelper } from '../helper/NotyHelper';
import { BasicformService } from '../basicform/basicform.service';
import { MsalService } from '@azure/msal-angular';
import { NavbarService } from '../navbar/navbar.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LandingpageService } from '../landingpage/landingpage.service';
import { OnedrivegraphService } from '../onedriveservice/onedrivegraph.service';
import { Datashared } from '../helper/datashared';
import { AddleadsService } from '../addleads/addleads.service';
import { Lead } from '../model/lead';
import { Temppatient } from '../model/temppatient';
import { PatientFormsDTO } from '../model/PatientFormsDTO';



@Component({
  selector: 'app-landingpagemedicalassociates',
  templateUrl: './landingpagemedicalassociates.component.html',
  styleUrls: ['./landingpagemedicalassociates.component.css']
})
export class LandingpagemedicalassociatesComponent implements OnInit {
  public isOpen: boolean = false;
  public isSlideOpen: boolean = false;
  public practiceCode: string;
  public patientNumber: String;
  public loginCap: String;
  public patientNewNumber: String;
  public currentPage: number = 1;
  public isLeft: boolean = false;
  public custom: Array<CustomDetails> = [];
  public slideIndex = 1;
  lstLead: Array<Lead> = [];
  lstTempPatient: Array<Temppatient> = [];
  public lstForms: any = [];
  public lead: Lead = new Lead();
  public lstPatientAppointmentForms: Array<PatientFormsDTO> = [];
  public patientAppointmentId: any;
  public isForms: boolean = false;
  constructor(public addleadservice: AddleadsService, private sanitizer: DomSanitizer, public router: Router, private notyHelper: NotyHelper, public basicFormService: BasicformService, private msalService: MsalService, private navbarService: NavbarService, private graphService: OnedrivegraphService, public landingPageService: LandingpageService, public dataShared: Datashared) { }

  ngOnInit() {
   
    this.getCustom();
    this.checkValidatePatient();
    this.lstForms = [
      { Id: 1, Activity: "BasicForms" },
     
    ];
    
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

  //server

  //loginRedirect() {
  //  //this.oneDriveAuthService.microsoftLogin();
  //  this.msalService.loginPopup().then(x => {
  //    let baseUrl = window.location.origin;
  //    let userName = x.account.userName;
  //    let userDomain = userName ? userName.split('@')[1] : '';
  //    let urlDomain = baseUrl.replace('https://', '');
  //    if (userDomain && urlDomain) {
  //      if (userDomain === urlDomain) {
  //        var msDto = { givenName: x.account.name, userPrincipalName: x.account.userName, surname: '' };
  //        this.graphService.ValidateUserInHinPortal(msDto).subscribe(_data => {
  //          if (_data) {
  //            localStorage.setItem("userDetail", JSON.stringify(_data));
  //            window.location.href = baseUrl + "/listleads";
  //          }
  //        });

  //      }
  //      else {
  //        Swal.fire({
  //          title: 'Authorization Failed!',
  //          text: 'User is not associated to "' + urlDomain + '". Signout and try with different account',
  //          type: 'error',
  //          showCancelButton: false,
  //          confirmButtonText: 'Ok',
  //          cancelButtonText: ''
  //        }).then((result) => {
  //          if (result.value) {
  //            this.clearUser();
  //          }
  //        });}
  //    }
  //    else {
  //      this.clearUser();
  //    }
  //    console.log(userDomain);
  //    console.log('----------------');
  //    console.log(urlDomain);
  //  });
  //}

  //local code

  loginRedirect() {
    //  //this.oneDriveAuthService.microsoftLogin();
    this.msalService.loginPopup().then(x => {
      let baseUrl = window.location.origin;
      let userName = x.account.userName;
      //let userDomain = userName ? userName.split('@')[1] : '';
      //let urlDomain = baseUrl.replace('https://', '');
      //if (userDomain && urlDomain) {
      //if (userDomain === urlDomain) {
      var msDto = { givenName: x.account.name, userPrincipalName: x.account.userName, surname: '' };
      this.graphService.ValidateUserInHinPortal(msDto).subscribe(_data => {
        if (_data) {
          localStorage.setItem("userDetail", JSON.stringify(_data));
          window.location.href = baseUrl + "/listleads";
        }
      });

      ////}
      //else {
      //  Swal.fire({
      //      //    title: 'Authorization Failed!',
      //      //    text: 'User is not associated to "' + urlDomain + '". Signout and try with different account',
      //      //    type: 'error',
      //      //    showCancelButton: false,
      //      //    confirmButtonText: 'Ok',
      //      //    cancelButtonText: ''
      //      //  }).then((result) => {
      //      //    if (result.value) {
      //      //      this.clearUser();
      //      //    }
      //      //  });
      //      //}
      //    //}
      //    //else {
      //    //  this.clearUser();
      //    //}
      //    //console.log(userDomain);
      //    //console.log('----------------');
      //    //console.log(urlDomain);
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

  //patientIdValidate() {
  //  
  //  if (this.patientNumber.length > 8) {
  //    this.notyHelper.ShowNoty("Please enter valid Patient ID.");
  //  }
  //  else {
  //    this.basicFormService.validatePatientId(this.patientNumber).subscribe(data => {
  //      if (data) {

  //        let nextNumber = this.validatePatientSequence(data);
  //        this.notyHelper.ShowNoty("Patient ID already registered.");
  //      }
  //      else {
  //        this.router.navigate(['/basicformmedicalassociates/' + this.patientNumber]);
  //      }
  //    });
  //  }

  //}

  patientIdValidate() {
    var data = this.lstTempPatient.find(x => x.PatientNumber == this.patientNumber);
    var data1 = this.lstLead.find(x => x.LeadNumber == this.patientNumber);
    if ((this.patientNumber.length > 7) && (this.patientNumber.substring(0, 1) == 'P')) {
      
      if (data != null || data1 != null  ) {
        this.notyHelper.ShowNoty("Please enter valid Patient ID.");
      }
      
      
      else {
        this.router.navigate(['/basicformmedicalassociates/' + this.patientNumber]);
      }
    }
    else {
      this.notyHelper.ShowNoty("Please enter valid Patient ID.");
    }
  }

//  if(("" + this.patientNumber.match("^[A-Za-z[0-9]]\d{7}"))) {
//  this.notyHelper.ShowNoty("Please enter valid Patient ID.");
//}

  checkValidatePatient() {
    this.addleadservice.getValidatePatient().subscribe(data => {
   
      if (data) {
        
        this.lstLead = data.Item1;

        this.lstTempPatient = data.Item2;

      }
    })
  }

  getShortName(name: any) {
    return name.split(' ').map((n: any[]) => n[0]).join('');
  }

  validatePatientSequence(patient) {
    
    let currentId = patient.Id;
    let nextId = currentId + 1;
    let currentNumber = patient.PatientNumber;
    let nextNumber = currentNumber.replace(currentId.toString(), nextId.toString());
    return nextNumber;
  }



  editTempPatient(evt) {
    this.dataShared.setValue(evt);
    this.router.navigate(['/addtemppatient']);
  }

  gotoPatientForm() {
    if (this.practiceCode) {
      this.router.navigate(['/patientform/' + this.practiceCode]);
    }
    else {
      this.notyHelper.ShowNoty("Code is required.");
    }
  }
  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number) {
    let i;
    let slides = document.getElementsByClassName("carousel-item") as HTMLCollectionOf<HTMLElement>;
    //let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    //for (i = 0; i < dots.length; i++) {
    //  dots[i].className = dots[i].className.replace(" active", "");
    //}
    slides[this.slideIndex - 1].style.display = "block";

    //dots[slideIndex - 1].className += " active";

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

  //checkPatientNumber() {
  //  
  //  this.addleadservice.getValidatePatient().subscribe(data => {
  //    if (data) {
  //      this.lstLead = data.item1;
  //      this.lstTempPatient = data.item2;
  //    }
  //  })
  //}


  loginFormsRedirect() {
    //this.oneDriveAuthService.microsoftLogin();
    this.msalService.loginPopup().then(x => {
      let baseUrl = window.location.origin;
      let userName = x.account.userName;
      let userDomain = userName ? userName.split('@')[1] : '';
      let leadUserName = userName ? userName.split('@')[0] : '';
      this.getPatientForms(leadUserName);
      //let urlDomain = baseUrl.replace('https://', '');
      let urlDomain = "medicalassociates.healthinformation.network";
      if (userDomain && urlDomain) {
        if (userDomain === urlDomain) {
          localStorage.setItem("patientDetail", JSON.stringify(leadUserName));
          this.isForms = true;
          /*window.location.href = baseUrl + "/basicformmedicalassociates";*/
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

  getPatientForms(leadUserName) {
    this.lstPatientAppointmentForms = [];
    this.basicFormService.getPatientAppointmentForms(leadUserName).subscribe(data => {
      if (data) {
        this.lstPatientAppointmentForms = data;
      }
    });
  }

  closeTemplate() {
    this.isForms = false;
  }

  gotoForms(patientAppointmentId) {
    if (patientAppointmentId) {
      this.router.navigate(['/basicformmedicalassociates']);
    }
  }

  appointmentChange(patientAppointmentId) {
    localStorage.setItem("AppointmentDetail", JSON.stringify(patientAppointmentId));
  }
  




}
