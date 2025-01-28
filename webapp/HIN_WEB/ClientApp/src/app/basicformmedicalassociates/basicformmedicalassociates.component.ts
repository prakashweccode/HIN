import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotyHelper } from '../helper/NotyHelper';
import { PatientForm, LeadExtend } from '../model/lead';
import { Temppatient } from '../model/temppatient';
import { VoiceToTextService } from '../voice-to-text/voice-to-text.service';
import { Companyregister } from '../model/companyregister';
import { BasicformService } from '../basicform/basicform.service';
import { Datashared } from '../helper/datashared';
import { formatDate } from '@angular/common';
import { NavbarService } from '../navbar/navbar.service';
import { MsalService } from '@azure/msal-angular';
import { Session } from 'protractor';
import { window } from 'ngx-bootstrap';

@Component({
  selector: 'app-basicformmedicalassociates',
  templateUrl: './basicformmedicalassociates.component.html',
  styleUrls: ['./basicformmedicalassociates.component.css']
})
export class BasicformmedicalassociatesComponent implements OnInit {
  public printPage: boolean = false;
  @Input() buttonEnable: boolean = true;
  public patientForm: PatientForm = new PatientForm();
  public femaleData: boolean = false;
  public colonoscopyData: boolean = false;
  public checkData: boolean = true;
  public tempPatient: Temppatient = new Temppatient();
  public isSignPad: boolean = false;
  public age: any;
  public showAge: any;
  isListening: boolean = false;
  currentCtrl: HTMLInputElement;
  activeContainer: string = 'tab1';
  logo: string;
  practiceCode: string;
  patientNumber: string;
  public lstTempPatient: Array<Temppatient> = [];
  activityTypes: any[];
  public isOpen: boolean = false;
  //public lead: Lead = new Lead();
  public lead: LeadExtend = new LeadExtend();
  public ServicesId: number;
  public dob: any;
  public date: any;
  constructor(public router: Router, private actRoute: ActivatedRoute, public basicFormService: BasicformService, public noty: NotyHelper, private speechService: VoiceToTextService, public dataShared: Datashared, public navBarService: NavbarService, private msalService: MsalService) {
    this.actRoute.params.subscribe(routeParams => {
      if (routeParams.number) {
        this.patientNumber = routeParams.number;
        this.tempPatient.PatientNumber = this.patientNumber;
        this.getTenantDetails();
      }
    });
  }

 

  ngOnInit() {
    let leadUserName = JSON.parse(localStorage.getItem("patientDetail"));
    let servicesId = JSON.parse(localStorage.getItem("AppointmentDetail"));
    this.ServicesId = servicesId;
    if (leadUserName) {
      this.getLeadDetails(leadUserName);
    }
    if (servicesId){
      this.getPatientInformation(servicesId);
    }
    
    this.tempPatient.IsConsentEn = true;
    this.speechService.init(document);
    this.speechService.InitAllDictation(document);
    this.getMaritalStatusList();
    this.ngOnDestroy();
  }

  ngOnDestroy() {
    this.navBarService.clearUser();
    sessionStorage.clear();
  }


  GenderBinding(evt) {
    this.tempPatient.Gender = evt;
  }

  getPatientInformation(servicesId) {
    this.basicFormService.getPatientDetail(servicesId).subscribe(data => {
      if (data) {
        this.tempPatient = data;
        var Dob = formatDate(this.tempPatient.Dob, 'yyyy-MM-dd', 'en-US');
        this.dob = Dob;
        this.tempPatient.Gender = this.lead.GenderId == 1 ? true : false;
        var date = formatDate(this.tempPatient.Date, 'yyyy-MM-dd', 'en-US');
        this.date = date;
      }
    });
  }

  getLeadDetails(userName) {
    this.basicFormService.getLeadByUserName(userName).subscribe(data => {
      if (data) {
        this.lead = data;
        this.tempPatient.PatientName = this.lead.LeadName;
        this.tempPatient.LastName = this.lead.PatientLastName;
        this.tempPatient.Address = this.lead.Address;
        this.tempPatient.City = this.lead.City;
        this.tempPatient.State = this.lead.State;
        this.tempPatient.Zipcode = this.lead.ZipCode;
        this.tempPatient.Age = this.lead.Age;
        this.tempPatient.EmailAddress = this.lead.EmailAddress;
        this.tempPatient.CellPhone = this.lead.CellNumber;
        this.tempPatient.HomePhone = this.lead.OfficeNumber;
        this.tempPatient.EmergencyContact = this.lead.EmergencyCellNumber;
        var Dob = formatDate(this.lead.Dob, 'yyyy-MM-dd', 'en-US');
        this.dob = Dob;
        this.tempPatient.Gender = this.lead.GenderId == 1 ? true : false;
      }
    });
  }

  getTenantDetails() {
    this.basicFormService.getTenantDetail(this.practiceCode).subscribe((data: Companyregister) => {
      if (data) {
        this.logo = data.CompanyLogo;
      }
    });
  }

  ageCalculator(event: any) {
    if (this.tempPatient.Dob) {
      const convertAge = new Date(this.tempPatient.Dob);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      this.tempPatient.Age = this.showAge;
    }
  }

  goToPreview() {
    this.printPage = true;
  }
  closeprintPage() {
    this.printPage = false;
  }

  //print(printWrapper) {

  //  //let w = window.open();
  //  //w.document.write(document.getElementById(printWrapper).innerHTML);
  //  //w.print();
  //  //w.close();

  //  var printContents = document.getElementById(printWrapper).innerHTML;
  //  var originalContents = document.body.innerHTML;
  //  document.body.innerHTML = printContents;
  //  window.print();
  //  document.body.innerHTML = originalContents;
  //  window.location.reload();
  //}

  onCheckboxChange(event: any) {
    console.log(event.target.checked);
    if (event.target.checked)
      this.checkData = false;
    else
      this.checkData = true;
  }

  changeGender(event: any) {
    console.log(event.target.value);
    if (event.target.value == "false") {
      this.femaleData = true;
    }
    else {
      this.femaleData = false;
    }
  }
  changeColonoscopy(event: any) {
    console.log(event.target.value);
    if (event.target.value == "false") {
      this.colonoscopyData = true;
    }
    else {
      this.colonoscopyData = false;
    }
  }

  openES() {
    this.tempPatient.IsConsentEn = false;
    this.tempPatient.IsConsentimiento = true;
    this.activeContainer = 'tab2';
  }
  openEN() {
    this.tempPatient.IsConsentimiento = false;
    this.tempPatient.IsConsentEn = true;
    this.activeContainer = 'tab1';
  }

  saveTempPatient(tempPatient) {

    const inputFields = document.getElementsByName('mandatory');

    for (let i = 0; i < inputFields.length; i++) {
      const inputField = inputFields[i] as HTMLInputElement;

      if (!inputField.value) {

        inputField.style.border = '1px solid red';

      } else {
        inputField.style.border = '1px solid #ccc';
      }
    }

    if (!this.tempPatient.PatientName || !this.tempPatient.LastName || !this.tempPatient.Address || !this.tempPatient.City || !this.tempPatient.State || !this.tempPatient.Zipcode || !this.tempPatient.Age || !this.tempPatient.Gender || !this.dob || !this.tempPatient.CellPhone || !this.tempPatient.EmailAddress || !this.tempPatient.EmergencyContact) {
      this.noty.ShowNoty("Please fill all required fields");
    }
    else {
      if (!this.tempPatient.Id) {
        this.tempPatient.Status = 1;
      }
      this.tempPatient.ServicesId = this.ServicesId;
      this.tempPatient.Dob = this.dob;
      this.tempPatient.Date = this.date;
      this.basicFormService.saveTenantPatient(tempPatient).subscribe(data => {
        if (data) {
          this.tempPatient = data;
          this.noty.ShowNoty("Data Saved Successfully..");
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['/']);
          this.CloseNotify();
        }
      }, err => { }, () => { });
    }
  }

  //getMaritalStatusList() {
  //  this.basicFormService.getMaritalStatus().subscribe(data => {
  //    if (data) {
  //      this.lstTempPatient = data;
  //    }
  //  });
  //}

  Notify(tempPatient) {
    //if (!this.tempPatient.PatientName || !this.tempPatient.Address || !this.tempPatient.City || !this.tempPatient.State || !this.tempPatient.Zipcode || !this.tempPatient.Age || !this.tempPatient.Gender || !this.tempPatient.Dob || !this.tempPatient.CellPhone || !this.tempPatient.EmailAddress || !this.tempPatient.EmergencyContact) {
    //  this.noty.ShowNoty("Please fill all required fields");
    //}
    //else {
    //  this.isOpen = true;
    //}
    this.isOpen = true;
   
  }
  CloseNotify() {
    this.isOpen = false;
  }

  getMaritalStatusList() {
    this.activityTypes = [
      { Id: 1, Activity: "Never married" },
      { Id: 2, Activity: "Married" },
      { Id: 3, Activity: "Separated" },
      { Id: 4, Activity: "Divorced" },
      { Id: 5, Activity: "Widowed" },
      { Id: 6, Activity: "Others" },
    ];
  }



  goToLogin() {
    localStorage.clear();
    this.navBarService.clearUser();
    sessionStorage.clear();
    this.msalService.logout();
   
  }
  signPad() {
    return this.isSignPad;
  }
  toggleSignPad() {
    this.isSignPad = !this.isSignPad;
  }

  dictateAll() {
    this.speechService.startAllDictation();
    //this.isListening = true;
  }
  stopAllDictation() {
    this.speechService.stopAllDictation();
    this.ResetInputBorderColor();
    //this.isListening = false;
  }

  ResetInputBorderColor() {
    document.querySelectorAll('[tabindex]').forEach((ctrl: HTMLInputElement) => {
      if (ctrl)
        ctrl.style.borderColor = "#999";
    });
  }
  voiceToText(evt: any) {
    if (evt) {
      this.speechService.init(document);
      var targetElementId = evt.target.name;
      if (targetElementId) {
        var txtCtrl = document.getElementById(targetElementId) as HTMLInputElement;
        txtCtrl.focus();
        txtCtrl.style.borderColor = "red";
        this.currentCtrl = txtCtrl;
        let currentCtrlIndex = parseInt(this.currentCtrl.getAttribute('tabindex'));
        var stopButton = document.getElementsByName(targetElementId + "_stop")[0];
        if (stopButton) {
          stopButton.style.display = 'block';
          evt.target.style.display = 'none';
        }
        this.speechService.counter = currentCtrlIndex;
        this.speechService.startAllDictation();
        this.speechService.speechInput().subscribe(data => {
          //this.currentCtrl.value = data;
        }, err => { }, () => { });
      }
      else {
        this.currentCtrl = null;
      }
    }
  }
  stopVoiceToText(evt: any) {
    var targetElementId = evt.target.name;
    var startElementId = targetElementId.replace('_stop', '');
    var txtCtrl = document.getElementById(startElementId) as HTMLInputElement;
    this.currentCtrl = txtCtrl;
    let currentCtrlIndex = parseInt(this.currentCtrl.getAttribute('tabindex'));
    if (targetElementId && startElementId) {
      var startButton = document.getElementsByName(startElementId)[0];
      if (startButton) {
        startButton.style.display = 'block';
        evt.target.style.display = 'none';
      }
      this.speechService.counter = currentCtrlIndex;
      this.speechService.stopAllDictation();
      this.ResetInputBorderColor();
    }
  }

  bindingPatientSignature(evt, type) {
    if (type == 'ps') {
      this.tempPatient.PatientSignature = evt;
    }
  }

  bindingPatientAttenSign(evt, type) {
    if (type == 'pas') {
      this.tempPatient.PatientAttenSign = evt;
    }
   
  }

  BindingFirmaDelPaciente(evt, type) {
    if (type == 'fdp') {
      this.tempPatient.FirmaDelPaciente = evt;
    }
   
  }

  BindingFirmaDelAtencion(evt, type) {
    if (type == 'fda') {
      this.tempPatient.FirmaDelAtencion = evt;
    }
  }

  togglePatientSignatureSignPad() {
    this.tempPatient.PatientSignature = null;
  }

  togglePatientAttenSignSignPad() {
    this.tempPatient.PatientAttenSign = null;
  }

  toggleFirmaDelPacienteSignSignPad() {
    this.tempPatient.FirmaDelPaciente = null;
  }

  toggleFirmaDelAtencionSignSignPad() {
    this.tempPatient.FirmaDelAtencion = null;
  }

  print(printWrapper) {

    //let w = window.open();
    //w.document.write(document.getElementById(printWrapper).innerHTML);
    //w.print();
    //w.close();

    var printContents = `<div id="printWrapper">
      <span (click)="closeprintPage()" class="noprint w3-button w3-display-topright">&times;</span>
      <div class="w3-small sfcenter w3-margin-top">
        <div class="w3-animate-opacity marginform w3-container">
          <header>
            <a *ngIf="buttonEnable" class="w3-bar-item w3-button w3-right w3-padding noprint" (click)="print('printWrapper')"><i class="fa fa-print" aria-hidden="true"></i> Print Result</a>
            <br />
            <div style="display: -webkit-box;">
              <div style="width: 50%;float: left;">
              <img style="max-width: 185px;" src="{{logo?logo:'assets/images/defaultlogo.png'}}"></div>
              <div class="w3-right w3-margin-right" style="width: 40%;float: right;">
                <h3 style="font-size: 26px;font-weight: 600;text-align:right;margin:0px;">Patient Information</h3>
              </div>
            </div>
          </header>
          <div style="display: block;padding: 20px 30px;">

            <div style="padding-top: 50px;padding-bottom: 10px;">
              <div id="pdf-form">
                <div style="display: flow-root;margin-bottom: 14px;">
                  <div style="width: 50%;float: left;">
                    <label>First Name </label> <input style="width: 71%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.PatientName + `" />
                  </div>
                  <div style="width: 50%;float: right;">
                    <label>Last Name </label> <input style="width: 71%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.LastName + `" />
                  </div>
                </div>
                <div class="w3-margin-top-xlarge" style="display: flow-root;margin-bottom: 14px;">
                  <div style="width: 100%;float: left;">
                    <label>Address : </label> <input style="width: 90%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.Address + `" />
                  </div>
                </div>
                <div class="w3-margin-top-xlarge" style="display: flow-root;margin-bottom: 14px;">
                  <div style="width: 33%;float: left;">
                    <label>City : </label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.City + `" />
                  </div>
                  <div style="width: 33%;float: left;">
                    <label>State : </label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.State + `">
                  </div>
                  <div style="width: 33%;float: left;">
                    <label>Zip Code : </label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.Zipcode + `">
                  </div>
                </div>
                <div class="w3-margin-top-xlarge" style="display: flow-root;margin-bottom: 14px;">
                  <div style="width: 30%;float: left;">
                    <label>Age : </label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.Age + `">
                  </div>
                  <div style="width: 30%;float: left;">
                    <label>Gender : </label> ` + (this.tempPatient.Gender == true ? "Male" : "Female") + `
                  </div>
                  <div style="width: 30%;float: left;">
                    <label>D.O.B : </label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;outline:none;" type="date" value="`+ this.tempPatient.Dob + `">
                  </div>
                </div>
                <div class="w3-margin-top-xlarge" style="display: flow-root;margin-bottom: 14px;">
                  <div style="width: 30%;float: left;">
                    <label>Marital Status : </label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.MaritalStatus + `">
                  </div>
                  <div style="width: 30%;float: left;">
                    <label> Home Phone : </label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.HomePhone + `">
                  </div>
                  <div style="width: 30%;float: left;">
                    <label> Cell Phone : </label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.CellPhone + `">
                  </div>
                </div>
                <div style="display: flow-root;margin-bottom: 14px;">
                  <div style="width: 100%;float: left;">
                    <label>Email Address : </label> <input style="width: 85%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.EmailAddress + `">
                  </div>
                </div>
                <div class="w3-margin-top-xlarge" style="display: flow-root;margin-bottom: 14px;">
                  <div style="width: 50%;float: left;">
                    <label> Emergency Contact : </label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.EmergencyContact + `">
                  </div>
                  <div style="width: 50%;float: left;">
                    <label> Telephone : </label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.Telephone + `">
                  </div>
                </div>
                <div class="w3-margin-top-xlarge" style="display: flow-root;margin-bottom: 14px;">
                  <div style="width: 80%;float: left;">
                    <label> Allergies : </label> <input style="border: none;" type="checkbox" value="`+ this.tempPatient.Nka + `"><label style="margin-left:5px">Not Known Allergies</label>
                    <div *ngIf="checkData">
                      <input style="width:100%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.Allergies + `">
                    </div>
                  </div>
                </div>

                <div class="w3-center">
                  <h3 style="font-size: 26px;font-weight: 600;margin:0px;">Past Medical History</h3>
                </div>

                <table class="w3-table w3-center" style="text-align:center">
                  <tbody>
                    <tr style="text-align:center; border:none">
                      <th>
                        <label>Please check each applicable diagnosis:</label>
                      </th>
                    </tr>
                    <tr style="width:100px">

                      <td>
                        <ul style="list-style-type:none;">
                          <li><input style="border: none; margin-left: -12px" type="checkbox" [checked]="`+ (this.tempPatient.Hypertension ? true : false) + `" value="` + this.tempPatient.Hypertension + `"><label style="margin-left:5px">Hypertension</label></li>
                          <li><input style="border: none; margin-left: -12px" type="checkbox" [checked]="`+ (this.tempPatient.HeartDisease ? true : false) + `" value="` + this.tempPatient.HeartDisease + `"><label style="margin-left:5px">Heart disease</label></li>
                          <li><input style="border: none; margin-left: -12px" type="checkbox" [checked]="`+ (this.tempPatient.Liverdisease ? true : false) + `" value="` + this.tempPatient.Liverdisease + `"><label style="margin-left:5px">Liver disease</label></li>
                          <li>
                            <input style="border: none; margin-left: -12px" type="checkbox" [checked]="`+ (this.tempPatient.InsulinDependent ? true : false) + `" value="` + this.tempPatient.InsulinDependent + `"><label style="margin-left:5px">If yes, Insulin dependent?</label><span></span>
                          </li>
                          <li>
                            <input style="border: none; margin-left: -12px" [checked]="`+ (this.tempPatient.Cancer ? true : false) + `" type="checkbox" value="` + this.tempPatient.Cancer + `"><label style="margin-left:5px">Cancer</label>
                          </li>
                          <li>
                            <label style="margin-left: -12px;">Type : </label><input style="width: 50%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.Type + `">
                          </li>
                        </ul>
                      </td>
                      <td>
                        <ul style="list-style-type:none;">
                          <li><input style="border: none; margin-left: -12px" [checked]="`+ (this.tempPatient.KidneyDisease ? true : false) + `" type="checkbox" value="` + this.tempPatient.KidneyDisease + `"><label style="margin-left:5px">Kidney disease</label></li>
                          <li><input style="border: none; margin-left: -12px" [checked]="`+ (this.tempPatient.Diabetes ? true : false) + `" type="checkbox" value="` + this.tempPatient.Diabetes + `"><label style="margin-left:5px">Diabetes</label></li>
                          <li><input style="border: none; margin-left: -12px" [checked]="`+ (this.tempPatient.ThyroidDisease ? true : false) + `" type="checkbox" value="` + this.tempPatient.ThyroidDisease + `"><label style="margin-left:5px">Thyroid disease</label></li>
                          <li><input style="border: none; margin-left: -12px" [checked]="`+ (this.tempPatient.Asthma ? true : false) + `" type="checkbox" value="` + this.tempPatient.Asthma + `"><label style="margin-left:5px">Asthma</label></li>
                          <li><input style="border: none; margin-left: -12px" [checked]="`+ (this.tempPatient.MentalDisorder ? true : false) + `" type="checkbox" value="` + this.tempPatient.MentalDisorder + `"><label style="margin-left:5px">Mental Disorder</label></li>
                        </ul>
                      </td>


                    </tr>
                  </tbody>
                </table>
                <br />
                <br />

                <label>Other medical Problems</label>
                <table class="w3-table">
                  <tbody>
                    <tr><td style="height: 30px"><input style="width: 100%; border: none; margin-left: -12px" type="text" value="`+ this.tempPatient.OtherMedicalProblems + `"></td></tr>
                  </tbody>
                </table>
                <br />
                <br />

                <label>Past surgeries and hospitalization </label>
                <table class="w3-table">
                  <tbody>
                    <tr><td style="height: 30px"><input style="width: 100%; border: none;" type="text" value="`+ this.tempPatient.PastSurgeriesAndHospitalization + `"></td></tr>
                  </tbody>
                </table>
                <br />

                <div class="w3-margin-top-xlarge" style="display: flow-root;margin-bottom: 14px;">
               <div style="width: 50%; float: left; position: relative; ">
               <input [checked]="`+ (this.tempPatient.BloodTransfusion ? true : false) + `" type="checkbox" value="` + this.tempPatient.BloodTransfusion + `" ><label> Have you ever had a blood transfusion? </label> <input style="width: 70%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="` + this.tempPatient.BloodTransfusionData + `"/>
             </div>
             </div>

                <div class="w3-margin-top-xlarge" style="display: flow-root;margin-bottom: 14px;">
                  <div style="width: 50%;float: left;">
                    <label> Medication : </label> <input style="width: 100%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.Medication + `">
                  </div>
                </div>
              </div>
            </div>
            <div id="footer" style="margin-top: 20px;">
              <div style="text-align: center;margin: 0px;">
                <p>3107 W Hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
                <p>Office:(786) 638-4747 <sup>.</sup>Fax:(954) 367-3763</p>
              </div>
            </div>
            <div class="page-break"></div>
          </div>

          <div style="display: block;padding: 20px 30px;">
            <div style="display: -webkit-box;">
              <div style="width: 50%;float: left;"><img style="max-width: 185px;" src="{{logo?logo:'assets/images/defaultlogo.png'}}"></div>
            </div>
            </br>
            </br>
            <div style="padding-top: 50px;padding-bottom: 10px;">
              <div id="pdf-form">
                <div class="w3-center">
                  <h3 style="font-size: 26px;font-weight: 600;margin:0px;">Social History</h3>
                </div>
                <table class="w3-table w3-center" style="text-align: center; border: 1px solid #999;">
                  <tbody>
                    <tr>
                      <td style="border: 1px solid #999;">
                        <label style="text-align: center; display: block;"><b>Excersice</b></label>
                        <ul style="list-style-type: none; padding-inline-start: 10px;">
                          <li><input style="border: none; margin-left: -12px" [checked]="`+ ((this.tempPatient.Sedentary == true) ? true : false) + `" type="checkbox" value="` + this.tempPatient.Sedentary + `"><label style="margin-left:5px">Sedentary (No excersice)</label></li>
                          <li><input style="border: none; margin-left: -12px" [checked]="`+ (this.tempPatient.MildExercise ? true : false) + `" type="checkbox" value="` + this.tempPatient.MildExercise + `"><label style="margin-left:5px">mild exercise (Walking, wolf)</label></li>
                          <li><input style="border: none; margin-left: -12px" [checked]="`+ (this.tempPatient.RegularVigorius ? true : false) + `" type="checkbox" value="` + this.tempPatient.RegularVigorius + `"><label style="margin-left:5px">Regular Vigorius exercise (4x/week)</label></li>
                        </ul>
                      </td>
                      <td style="border:1px solid #999;">
                    <label style="text-align: center; display: block;"><b>Alcohol</b></label>
                    <ul style="list-style-type: none; padding-inline-start: 10px;">
                      <li><input style="border: none; margin-left: -12px"  [checked]="`+ (this.tempPatient.DrinkAlcohol ? true : false) + `" type="checkbox" value="` + this.tempPatient.DrinkAlcohol + `"><label style="margin-left:5px">Drink alcohol</label></li>
                      <li></li>
                      <li style="margin-left:-12px"><label>How many drinks per week? </label><input style="width: 53%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="` + this.tempPatient.DrinkAlcoholData + `" ></li>
                    </ul>
                  </td>
                      <td style="border:1px solid #999;">
                    <label style="text-align: center; display: block;"><b>Tobacco</b></label>
                    <ul style="list-style-type: none; padding-inline-start: 10px;">
                      <li><input style="border: none; margin-left: -12px" [checked]="`+ (this.tempPatient.UseTobocco ? true : false) + `" type="checkbox" value="` + this.tempPatient.UseTobocco + `" ><label style="margin-left:5px">Use tobocco</label></li>
                      <li><label>Packs per day? </label><input style="width: 7%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="` + this.tempPatient.PacksPerDay + `"><label style="margin-left:5px">no of years? </label><input style="width: 7%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="` + this.tempPatient.Years + `" ><label style="margin-left:5px">year quit </label><input style="width: 7%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="` + this.tempPatient.YearsToQuit + `"></li>

                    </ul>
                  </td>
                    </tr>
                    <tr>
                      <td style="border: 1px solid #999;">
                        <label style="text-align: center; display: block;"><b>Drugs</b></label>
                        <ul style="list-style-type: none; padding-inline-start: 10px;">
                          <li><input style="border: none; margin-left: -12px" [checked]="`+ ((this.tempPatient.StreetDrugs == true) ? true : false) + `" type="checkbox" value="` + this.tempPatient.StreetDrugs + `"><label style="margin-left:5px">Currently use recreational or street drugs</label></li>
                          <li><input style="border: none; margin-left: -12px" [checked]="`+ (this.tempPatient.StreetDrugNeedle ? true : false) + `" type="checkbox" value="` + this.tempPatient.StreetDrugNeedle + `"><label style="margin-left:5px">used street drugs with a needle in the past</label></li>
                        </ul>
                      </td>
                      <td style="border: 1px solid #999;">
                    <label style="text-align: center; display: block;"><b>Sex</b></label>
                    <ul style="list-style-type: none; padding-inline-start: 10px;">
                      <li><input style="border: none; margin-left: -12px" [checked]="`+ (this.tempPatient.Contraception ? true : false) + `" type="checkbox" value="` + this.tempPatient.Contraception + `"><label style="margin-left:5px">Contraception / Birth control </label><input style="width: 53%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="` + this.tempPatient.ContraceptionData + `"></li>
                    </ul>
                  </td>
                      <td style="border: 1px solid #999;">
                        <label style="text-align: center; display: block;"><b>Personal Saftey</b></label>
                        <ul style="list-style-type: none; padding-inline-start: 10px;">
                          <li><input style="border: none; margin-left: -12px" [checked]="`+ (this.tempPatient.LiveAlone ? true : false) + `" type="checkbox" value="` + this.tempPatient.LiveAlone + `"><label style="margin-left:5px">Live alone</label></li>
                          <li><input style="border: none; margin-left: -12px" [checked]="`+ (this.tempPatient.FrequentlyFalls ? true : false) + `" type="checkbox" value="` + this.tempPatient.FrequentlyFalls + `"><label style="margin-left:5px">Frequently falls in the last 6 months</label></li>
                        </ul>
                      </td>
                    </tr>


                  </tbody>
                </table>
                <br />
                <br />

                <div *ngIf="femaleData" style="border: 2px solid #999;" class="w3-padding">
                  <div class="w3-row">
                    <label> G </label><input style="width: 20%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.G + `"> &nbsp;<label> P </label><input style="width: 20%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="` + this.tempPatient.P + `"> &nbsp;
                    <label> A </label><input style="width: 20%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.A + `"> &nbsp;<label> LMP </label><input style="width: 20%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="` + this.tempPatient.Lmp + `">
                  </div>
                  <div class="w3-row w3-margin-top-xxlarge">
                    <label> Mamogram </label><input style="width: 20%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.Mamogram + `"> &nbsp;<label> Pap Smear </label><input style="width: 20%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="` + this.tempPatient.PapSmear + `">
                  </div>
                </div>
                <br />

                <div class="w3-left">
                <label>Colonoscopy: </label> ` + (this.tempPatient.Colonoscopy == true ? "Yes" : "No") + `
               </div>
              <div class="w3-margin-top-3xlarge" style="display: flow-root;margin-bottom: 14px;">
              <div style="width: 95%; float: left; position: relative;">
              <input style="width: 95%;border: none;border-bottom: 1px solid #999;outline:none;" type="text"  value="`+ this.tempPatient.ColonoscopyData + `">
             </div>
          </div>




               

                <div class="w3-center">
                  <h3 style="font-size: 26px;font-weight: 600;margin:0px;">Family Health History</h3>
                </div>


                <table class="w3-table w3-center" style="text-align: center; border: 1px solid #999;">
                  <tbody>
                    <tr>
                      <th style="border:none">Relationship</th>
                      <th style="border:none">Age</th>
                      <th style="border:none">Significant Health Problems</th>
                    </tr>
                  <tbody>
                    <tr><td style="border: 1px solid #999; width: 200px;">Father</td>
                    <td style="border:1px solid #999; text-align:center"><input style="width: 100%; border: none; margin-left: -12px" type="text" value="`+ this.tempPatient.FatherAge + `"></td>
                    <td style="border: 1px solid #999; text-align: center "><input style="width: 100%; border: none; margin-left: -12px" type="text" value="`+ this.tempPatient.FatherHealthProblem + `">
                    </td>
                    </tr>
                    <tr><td style="border: 1px solid #999; width: 200px;">Mother</td>
                    <td style="border: 1px solid #999; text-align: center"><input style="width: 100%; border: none; margin-left: -12px" type="text" value="`+ this.tempPatient.MotherAge + `"></td>
                    <td style="border: 1px solid #999; text-align: center"><input style="width: 100%; border: none; margin-left: -12px" type="text" value="`+ this.tempPatient.MotherHealthPproblem + `"></td>
                    </tr>
                    <tr><td style="border:1px solid #999 ">Sibling</td>
                    <td style="border: 1px solid #999; text-align: center"><input style="width: 100%; border: none; margin-left: -12px" type="text" value="`+ this.tempPatient.SiblingAge + `"></td>
                    <td style="border: 1px solid #999; text-align: center;"><input style="width: 100%; border: none; margin-left: -12px" type="text" value="`+ this.tempPatient.SiblingHealthProblem + `"></td>
                    </tr>
                    <tr><td style="border:1px solid #999"><input style="width: 100%; border: none; margin-left: -12px" type="text"></td>
                    <td style="border: 1px solid #999; text-align: center; width: 20%;"><input style="width: 100%; border: none; margin-left: -12px" type="text"></td>
                    <td style="border: 1px solid #999; text-align: center"><input style="width: 100%; border: none; margin-left: -12px" type="text"></td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <br />
                <!--<div class="w3-margin-top-xlarge" style="display: flow-root;margin-bottom: 14px;">
                  <div style="width: 95%;float: left;">
                    <label> Colonoscopy : </label><input style="width: 100%;border: none;border-bottom: 1px solid #999;outline:none;" type="text">
                    <input class="w3-margin-top-xlarge" style="width: 100%;border: none;border-bottom: 1px solid #999;outline:none;" type="text">
                  </div>
                </div>-->
              </div>
            </div>
            <div id="footer" style="margin-top: 20px;">
              <div style="text-align: center;margin: 0px;">
                <p>3107 W Hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
                <p>Office:(786) 638-4747 <sup>.</sup>Fax:(954) 367-3763</p>
              </div>
            </div>
            <div class="page-break"></div>
          </div>

          <div style="display: block;padding: 20px 30px;">
            <div style="display: -webkit-box;">
              <div style="width: 50%;float: left;"><img style="max-width: 185px;" src="{{logo?logo:'assets/images/defaultlogo.png'}}"></div>
            </div>
            <div style="padding-top: 50px;padding-bottom: 10px;">
              <div id="pdf-form">
              <div *ngIf="tempPatient.IsConsentEn == true">
                <div class="w3-center">
                  <h3 style="font-size: 26px;font-weight: 600;margin:0px;"><u>CONSENT FOR TREATMENT</u></h3>
                </div>
                <div class="w3-row w3-margin-left w3-margin-top-xxlarge">
                  <p>The undersigned has been informed of the treatment considered necessary for the patient whose name appears below. Physicians and employees of the above facility will perform the treatment and procedures.</p>
                </div>
                <div class="w3-row w3-margin-left">
                  <p>Authorization is hereby granted for such treatment, procedures, including the administration of anesthetics, medications or other therapies that may be deemed necessary.</p>
                </div>
                <div class="w3-row w3-margin-left">
                  <p>I consent for myself or on behalf of the patient, the selection, assignment of physician, and agree to arrange with him for obtaining a complete diagnosis and continuation of treatment as needed.</p>
                </div>
                <div class="w3-row w3-margin-left">
                  <p>I certify that I have read the above authorization and understand it.  I also certify that no guarantees or assurances have been made to me as to the results that may be obtained by this treatment. </p>
                </div>

                <div class="w3-margin-top-xxlarge w3-margin-left" style="display: flow-root;margin-bottom: 14px;">
                  <div style="width: 65%;float: left;">
                    <label> Patient Printed Name : </label> <input style="width: 65%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.PatientPrintedName + `" >
                  </div>
                  <div style="width: 35%;float: left;">
                    <label> Date : </label> <input style="width:60%;border: none;border-bottom: 1px solid #999;outline:none;" type="date" value="`+ this.tempPatient.Date + `">
                  </div>
                </div>
                <div class="w3-margin-top-xxlarge w3-margin-left" style="display: flow-root;margin-bottom: 14px;">
                  <div style="width: 100%;float: left;">
                    <label> Patient Signature : </label>
                 <div>
                  <img style="margin-left: 50px;" src="data:image/jpg;base64,`+ this.tempPatient.PatientSignature + `" />
                </div>
                   
                  </div>
                </div>

                <div class="w3-row w3-margin-left">
                  <p>*All authorizations must be signed by the patient or an authorized person in case of a minor or when the patient is physically or mentally incompetent. </p>
                </div>

                <div class="w3-row w3-margin-left">
                  <p>***********************************************************************************************************</p>
                </div>
                </div>

                <div *ngIf="tempPatient.IsConsentimiento == true">
                <div class="w3-center">
                  <h3 style="font-size: 26px;font-weight: 600;margin:0px;"><u>CONSENTIMIENTO PARA TRATAMIENTO</u></h3>
                </div>

                <div class="w3-row w3-margin-left w3-margin-top-xxlarge">
                  <p>El que suscribe, se le ha informado que el tratamiento para el paciente cuyo nombre aparece debajo, el cual se considera necesario y que el tratamiento lo efectuaran los doctores de la institución arriba mencionada.</p>
                </div>
                <div class="w3-row w3-margin-left">
                  <p>Su autorización es garantía para realizar cualquier tratamiento, procedimiento y administración de anestésicos, medicamentos u otras terapias que puedan ser necesarias.</p>
                </div>
                <div class="w3-row w3-margin-left">
                  <p>Yo consiento por mí mismo o en lugar del paciente con respecto a la designación del médico y que de acuerdo hacer los arreglos con el fin de obtener un diagnóstico completo y la continuación del tratamiento como sea necesario.</p>
                </div>
                <div class="w3-row w3-margin-left">
                  <p>Por este medio certifico que he leído toda la información que aparece arriba y que la comprendo, igualmente certifico que no se me ha dado ninguna garantía o seguridad de los resultados que se pudieran obtener de este tratamiento. </p>
                </div>

                <div class="w3-margin-top-xxlarge w3-margin-left" style="display: flow-root;margin-bottom: 14px;">
                  <div style="width: 65%;float: left;">
                    <label> Nombre del Paciente (Letra en Molde) : </label> <input style="width: 45%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="`+ this.tempPatient.NombreDelPaciente + `">
                  </div>
                  <div style="width: 35%;float: left;">
                    <label> Fecha : </label> <input style="width: 65%;border: none;border-bottom: 1px solid #999;outline:none;" type="date" value="`+ this.tempPatient.Fecha + `">
                  </div>
                </div>
                <div class="w3-margin-top-xxlarge w3-margin-left" style="display: flow-root;margin-bottom: 14px;">
                  <div style="width: 100%;float: left;">
                    <label> Firma del Paciente : </label>
                 <div>
                  <img style="margin-left: 50px;" src="data:image/jpg;base64,`+ this.tempPatient.FirmaDelPaciente + `" />
                </div>
                  </div>
                </div>
                <div class="w3-row w3-margin-left w3-margin-top-xxlarge">
                  <p>*Todas las autorizaciones tienen que ser firmados por el paciente o un individuo autorizado en caso de un menor o si el paciente esta fisicamente o psicologicamente incompetente.	 </p>
                </div>
                </div>

              </div>
            </div>
            <div id="footer" style="margin-top: 20px;">
              <div style="text-align: center;margin: 0px;">
                <p>3107 W Hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
                <p>Office:(786) 638-4747 <sup>.</sup>Fax:(954) 367-3763</p>
              </div>
            </div>
            <div class="page-break"></div>
          </div>

          <div style="display: block;padding: 20px 30px;">
            <div style="display: -webkit-box;">
              <div style="width: 50%;float: left;"><img style="max-width: 185px;" src="{{logo?logo:'assets/images/defaultlogo.png'}}"></div>
            </div>
            <div style="padding-top: 50px;padding-bottom: 10px;">
              <div id="pdf-form">
              <div *ngIf="tempPatient.IsConsentEn == true">
                <div class="w3-center">
                  <h3 style="font-size: 26px;font-weight: 600;margin:0px;"><u>ATTENTION TO ALL PATIENTS</u></h3>
                </div>
                <div class="w3-row w3-margin-left w3-margin-top-xxlarge">
                  <p>Under Florida Law, the Physician is generally required to carry medical malpractice insurance or otherwise demonstrated financial responsibility to cover potential claims for medical malpractice. Your doctor has decided not to carry medical malpractice insurance. This is permitted under Florida Law subjected to certain conditions. Florida Law imposes penalties against noninsured physician who fail to satisfy adverse judgment arising from claims of medical malpractice. This notice is provided pursuant to Florida Law.</p>
                </div>

                <div class="w3-row w3-margin-left w3-margin-top-3xlarge">
               <input style="border: none; margin-left: 0px;" [checked]="`+ (this.tempPatient.AttentionAgree ? true : false) + `" type="checkbox" value="` + this.tempPatient.AttentionAgree + `"><label style="margin-left:5px">I have read this statement and fully understand it.</label>
              
            </div>

                <div class="w3-margin-top-xxlarge w3-margin-left" style="display: flow-root;margin-bottom: 14px;">
                  <div style="width: 60%;float: left;">
                    <label> Patient Signature : </label>
                 <div>
                  <img style="margin-left: 50px;" src="data:image/jpg;base64,`+ this.tempPatient.PatientAttenSign + `" />
                </div>
                  </div>
                  <div style="width: 40%;float: left;">
                    <label> Date : </label> <input style="width: 60%;border: none;border-bottom: 1px solid #999;outline:none;" type="date" value="`+ this.tempPatient.AttenDate + `">
                  </div>
                </div>
                </div>

                <div *ngIf="tempPatient.IsConsentimiento == true">
                <div class="w3-center w3-margin-top-xxlarge">
                  <h3 style="font-size: 26px;font-weight: 600;margin:0px;"><u>ATENCION PACIENTES</u></h3>
                </div>

                <div class="w3-row w3-margin-left w3-margin-top-xxlarge">
                  <p>Bajo las leyes de la Florida, se requiere generalmente que los médicos tengan seguro de mala práctica médica, de lo contrario demostrar responsabilidad financiera para cubrir posibles reclamaciones por mala práctica médica. Su médico ha decidido no tener seguro de mala práctica.  Esto se permite por las leyes de la Florida sujetas a ciertas condiciones.  Las Leyes de la Florida imponen multas a los médicos no asegurados que no satisfagan juicios adversos derivados de reclamaciones de mala práctica médica. Este aviso ha sido provisto siguiendo las leyes de la Florida.</p>
                </div>

                <div class="w3-row w3-margin-left w3-margin-top-xxlarge">
              <input style="border: none; margin-left: 0px;" [checked]="`+ (this.tempPatient.AtencionAgree ? true : false) + `" type="checkbox" value="` + this.tempPatient.AtencionAgree + `"><label style="margin-left:5px">Yo he leído y entiendo perfectamente este aviso.</label>
            </div>

                

                <div class="w3-margin-top-xxlarge w3-margin-left" style="display: flow-root;margin-bottom: 14px;">
                  <div style="width: 60%;float: left;">
                    <label> Firma del Paciente : </label>
                 <div>
                  <img style="margin-left: 50px;" src="data:image/jpg;base64,`+ this.tempPatient.FirmaDelAtencion + `" />
                </div>
                  </div>
                  <div style="width: 40%;float: left;">
                    <label> Date : </label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;outline:none;" type="date">
                  </div>
                </div>
                </div>
              </div>
            </div>
            <div id="footer" style="margin-top: 20px;">
              <div style="text-align: center;margin: 0px;">
                <p>3107 W Hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
                <p>Office:(786) 638-4747 <sup>.</sup>Fax:(954) 367-3763</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>`;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }

}
