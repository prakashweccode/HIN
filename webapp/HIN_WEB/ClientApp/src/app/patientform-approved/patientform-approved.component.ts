import { Component, OnInit, Input } from '@angular/core';
import { PatientForm, Lead } from '../model/lead';
import { Temppatient } from '../model/temppatient';
import { Router, ActivatedRoute } from '@angular/router';
import { BasicformService } from '../basicform/basicform.service';
import { NotyHelper } from '../helper/NotyHelper';
import { VoiceToTextService } from '../voice-to-text/voice-to-text.service';
import { Datashared } from '../helper/datashared';
import { NavbarService } from '../navbar/navbar.service';
import { Companyregister } from '../model/companyregister';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-patientform-approved',
  templateUrl: './patientform-approved.component.html',
  styleUrls: ['./patientform-approved.component.css']
})
export class PatientformApprovedComponent implements OnInit {
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
  public lead: Lead = new Lead();
  public ServicesId: number;
  @Input() searchString: string;
  /* @Input() searchLead: string;*/
  public dob: any;
  selectedOption: any;
  date: any;
  constructor(public router: Router, private actRoute: ActivatedRoute, public basicFormService: BasicformService, public noty: NotyHelper, private speechService: VoiceToTextService, public dataShared: Datashared, public navBarService: NavbarService) {
    this.actRoute.params.subscribe(routeParams => {
      if (routeParams.number) {
        this.patientNumber = routeParams.number;
        this.tempPatient.PatientNumber = this.patientNumber;
        this.getTenantDetails();
      }
      this.selectedOption = 'M';
    });
  }


  ngOnInit() {
    let leadUserName = JSON.parse(localStorage.getItem("patientDetail"));
    let servicesId = JSON.parse(localStorage.getItem("AppointmentDetail"));
    this.ServicesId = servicesId;
    if (leadUserName) {
      this.getLeadDetails(leadUserName);
    }
    if (servicesId) {
      this.getPatientInformation(servicesId);
    }
    this.getPatientInformation(this.searchString);
    /*this.getLeadDetails(this.searchLead);*/
    this.tempPatient.IsConsentEn = true;
    this.speechService.init(document);
    this.speechService.InitAllDictation(document);
    this.getMaritalStatusList();

  }

  getPatientInformation(servicesId) {
    this.basicFormService.getPatientDetail(servicesId).subscribe(data => {
      if (data) {
        this.tempPatient = data;
        var Dob = formatDate(this.tempPatient.Dob, 'yyyy-MM-dd', 'en-US');
        this.dob = Dob;
        var date = formatDate(this.tempPatient.Date, 'yyyy-MM-dd', 'en-US');
        this.date = date;
        this.updateOption(this.tempPatient.Gender);
        
      }
    });
  }

  updateOption(option: any) {
    this.selectedOption = option;
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
        this.tempPatient.Dob = this.lead.Dob;
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


    if (!this.tempPatient.PatientName || !this.tempPatient.LastName || !this.tempPatient.Address || !this.tempPatient.City || !this.tempPatient.State || !this.tempPatient.Zipcode || !this.tempPatient.Age || !this.tempPatient.Gender || !this.tempPatient.Dob || !this.tempPatient.CellPhone || !this.tempPatient.EmailAddress || !this.tempPatient.EmergencyContact) {
      this.noty.ShowNoty("Please fill all required fields");
    }
    else {
      if (!this.tempPatient.Id) {
        this.tempPatient.Status = 1;
      }
      this.tempPatient.ServicesId = this.ServicesId;
      this.tempPatient.Date = this.date;
      this.basicFormService.saveTenantPatient(tempPatient).subscribe(data => {
        if (data) {
          this.tempPatient = data;
          this.noty.ShowNoty("Data Saved Successfully..");
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



  goBack() {
    this.router.navigate(['/editservice']);
  }
  signPad() {
    return this.isSignPad;
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

  binding(evt, type) {

    if (type == 'ps') {
      this.tempPatient.PatientSignature = evt;
    }
    else {
      this.tempPatient.PatientAttenSign = evt;
    }
  }
  signatureBinding(evt, type) {
    console.log(evt, type)
    if (type == 'fdp') {
      this.tempPatient.FirmaDelPaciente = evt;
      console.log(this.tempPatient.FirmaDelPaciente);
    }
    else {
      this.tempPatient.FirmaDelAtencion = evt;
      console.log(this.tempPatient.FirmaDelAtencion);
    }
  }

  approvePatientForm(tempPatient) {
    if (!this.tempPatient.PatientName || !this.tempPatient.LastName || !this.tempPatient.Address || !this.tempPatient.City || !this.tempPatient.State || !this.tempPatient.Zipcode || !this.tempPatient.Age  || !this.dob || !this.tempPatient.CellPhone || !this.tempPatient.EmailAddress || !this.tempPatient.EmergencyContact) {
      this.noty.ShowNoty("Please fill all required fields");
    }
    else {
      this.tempPatient.Status = 2;
      this.tempPatient.Dob = this.dob;
      this.basicFormService.saveTenantPatient(tempPatient).subscribe(data => {
        if (data) {
          this.tempPatient = data;
          this.noty.ShowNoty("Data Saved Successfully..");
          this.CloseNotify();
        }
      }, err => { }, () => { });
    }
    
  }

  GenderBinding(evt) {
    this.tempPatient.Gender = evt;
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

 

  
}
  



