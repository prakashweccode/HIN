import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import SignaturePad from 'signature_pad';
import { NotyHelper } from '../helper/NotyHelper';
import { LoaderService } from '../loader.service';
import { UserDetail } from '../login/login';
import { Services } from '../model/services';
import { Template, TemplateStatus } from '../model/template';
import { Templatelist } from '../model/templatelist';
import { OnedrivegraphService } from '../onedriveservice/onedrivegraph.service';
import { TemplateService } from '../template/template.service';
import { Users } from '../users/users';
import { UsersService } from '../users/users.service';
import { VoiceToTextService } from '../voice-to-text/voice-to-text.service';
import { document } from 'ngx-bootstrap';

@Component({
  selector: 'app-template-dictation',
  templateUrl: './template-dictation.component.html',
  styleUrls: ['./template-dictation.component.css']
})
export class TemplateDictationComponent implements OnInit, OnDestroy {
  lstTemplateList: Array<Templatelist> = [];
  lstAppointment: Array<Services> = [];
  template: Template = new Template();
  strSelectedTemplate: string = '';
  selectedTemplatePage: any = '';
  selectedTemplateHtml: any = '';
  selectedTemplateName: string = '';
  selectedAppointment: any;
  previewHtml: any = '';
  onClick: any;
  isPreview: boolean = false;
  templateId: number = 0;
  appointmentId: number = 0;
  show = false;
  signaturePad: any;
  image: any;
  loggedUser: UserDetail;
  loggedUserData: Users = new Users();
  isListening: boolean = false;
  currentCtrl: HTMLInputElement;
  constructor(public loaderService: LoaderService, public userService: UsersService, public router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private notyHelper: NotyHelper, public templateService: TemplateService, private speechService: VoiceToTextService, private graphService: OnedrivegraphService) {
    this.loggedUser = JSON.parse(localStorage.getItem("userDetail"));
    this.userService.getUserById(this.loggedUser.User.UserId).subscribe(_data => {
      if (_data)
        this.loggedUserData = _data
    }, err => { }, () => { });
  }
  ngOnDestroy() {
    this.speechService.stop();
  }
  ngOnInit() {
    this.speechService.init(document);
    this.speechService.InitAllDictation(document);
    this.initializeScreen();
    let templateId = this.route.snapshot.paramMap.get('id');
    if (templateId) {
      this.templateService.getTemplateById(templateId).subscribe(_data => {
        if (_data) {
          this.appointmentId = _data.AppointmentId;
          this.templateId = _data.TemplateId;
          this.selectedTemplatePage = this.sanitizer.bypassSecurityTrustHtml(_data.DraftHtml ? _data.DraftHtml : '');
          setTimeout(() => {
            this.bindStartButtonEvent();
            this.bindStopButtonEvent();
            this.bindSignatureAdd();
            this.bindSignatureClear();
            this.bindDefaultValues();
            this.bindTextFocusoutEvent();
          }, 500);
        }
      }, _err => { console.log(_err); }, () => { });
    }
    else {
      this.loadTemplatePage(this.templateId);
    }
  }

  loadSignaturePad(ele: any): void {
    this.signaturePad = new SignaturePad(document.getElementById('signatureCtrl') as HTMLCanvasElement, {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      penColor: 'rgb(0, 0, 0)'
    });
  }
  selectSignature() {
    this.image = "";
    const dataURL = this.signaturePad.toDataURL();
    //const parts = dataURL.split(';base64,');
    this.image = dataURL;
  }

  clear() {
    this.signaturePad.clear();
  }

  loadSignature() {
    if (this.loggedUser && this.loggedUser.User && this.loggedUser.User.Signature) {
      this.signaturePad = new SignaturePad(document.getElementById('signatureCtrl') as HTMLCanvasElement, {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(0, 0, 0)'
      });
      this.signaturePad.fromDataURL("data:image/png;base64," + this.loggedUserData.Signature);
      setTimeout(() => {
        this.selectSignature();
      }, 500);
    }
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }

  changeColor() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    const color = 'rgb(' + r + ',' + g + ',' + b + ')';
    this.signaturePad.penColor = color;
  }

  initializeScreen() {
    this.templateService.getDefaultData().subscribe(_data => {
      if (_data) {
        if (_data.item1)
          this.lstAppointment = _data.item1;
        if ((_data.item2))
          this.lstTemplateList = _data.item2;
      }
    }, _error => { console.log(_error); }, () => { });
  }

  loadTemplatePage(id: number) {
    if (id) {
      this.templateService.getTemplatePageById(id).subscribe(_data => {
        if (_data) {
          this.strSelectedTemplate = _data.templatePage;
          this.selectedTemplatePage = this.sanitizer.bypassSecurityTrustHtml(_data.templatePage ? _data.templatePage : '');
          this.selectedTemplateHtml = _data.templateHtml ? _data.templateHtml : '';
          this.selectedTemplateName = _data.templateName ? _data.templateName : '';
          setTimeout(() => {
            this.bindStartButtonEvent();
            this.bindStopButtonEvent();
            this.bindSignatureAdd();
            this.bindSignatureClear();
            this.bindLoadSignature();
            this.bindDefaultValues();
            this.bindTextFocusoutEvent();
          }, 500);
        }
        else {
          this.selectedTemplatePage = '';
          this.selectedTemplateHtml = '';
        }
      }, _error => { console.log(_error); }, () => { });
    }
  }
  bindSignatureAdd() {
    var canvas = document.getElementById('signatureCtrl');
    if (canvas) {
      var cns = canvas as HTMLCanvasElement;
      this.loadSignaturePad(cns);
      cns.addEventListener('click', this.selectSignature.bind(this));

    }
  }
  bindLoadSignature() {
    var button = document.getElementById('loadSignature');
    if (button) {
      var btn = button as HTMLButtonElement;
      btn.addEventListener('click', this.loadSignature.bind(this));
    }
  }
  bindSignatureClear() {
    var button = document.getElementById('signatureClear');
    if (button) {
      var btn = button as HTMLButtonElement;
      btn.addEventListener('click', this.clear.bind(this));
    }
  }
  bindDefaultValues() {
    if (this.strSelectedTemplate && this.selectedAppointment) {
      this.setTextControlValue("patientName", this.selectedAppointment.PatientName);
      this.setTextControlValue("patientDob", this.getDateStringFormat('YMD', this.selectedAppointment.DOB, "-"));
      this.setTextControlValue("patientAge", this.selectedAppointment.Age);
      this.setTextControlValue("patientOccupation", this.selectedAppointment.Occupation);
      this.setTextControlValue("name1", this.selectedAppointment.PatientName);
      this.setTextControlValue("name2", this.selectedAppointment.PatientName);
    }
    return;
  }

  setTextControlValue(strId, val) {
    var txtCtrl = document.getElementById(strId) as HTMLInputElement;
    if (txtCtrl)
      txtCtrl.value = val;
  }
  getDateStringFormat(startType: string, date: any, splitter: string) {
    let oDate = new Date(date);
    if (oDate) {
      switch (startType) {
        case 'MDY':
          return ("0" + (oDate.getMonth() + 1)).slice(-2) + splitter + ("0" + oDate.getDate()).slice(-2) + splitter + oDate.getFullYear();
        case 'DMY':
          return ("0" + oDate.getDate()).slice(-2) + splitter + ("0" + (oDate.getMonth() + 1)).slice(-2) + splitter + oDate.getFullYear();
        case 'YMD':
          return oDate.getFullYear() + splitter + ("0" + (oDate.getMonth() + 1)).slice(-2) + splitter + ("0" + oDate.getDate()).slice(-2);
        default:
          return ("0" + oDate.getDate()).slice(-2) + splitter + ("0" + (oDate.getMonth() + 1)).slice(-2) + splitter + oDate.getFullYear();
      }
    }
  }
  dictateAll() {
    this.speechService.startAllDictation();
    this.isListening = true;
  }
  stopAllDictation() {
    this.speechService.stopAllDictation();
    this.ResetInputBorderColor();
    this.isListening = false;
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

  bindStartButtonEvent() {
    var buttons = document.getElementsByClassName('app-speech-input-btn');
    if (buttons && buttons.length > 0) {
      for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i] as HTMLButtonElement;
        button.addEventListener('click', this.voiceToText.bind(this));
      }
    }
  }
  bindTextFocusoutEvent() {
    var textCtrls = document.querySelectorAll('[control-type="text"]');
    if (textCtrls && textCtrls.length > 0) {
      for (var i = 0; i < textCtrls.length; i++) {
        var ctrl = textCtrls[i] as HTMLInputElement;
        ctrl.addEventListener('focusout', this.assignCtrlTextValue.bind(this));
      }
    }
  }

  assignCtrlTextValue(evt: any) {
    var txtValue = evt.target.value;
    var txtElem = evt.target as HTMLInputElement;
    if (txtElem && txtElem.type === 'textarea') {
      txtElem.innerText = txtValue;
    }
    else {
      txtElem.value = txtValue;
    }
  }

  bindStopButtonEvent() {
    var buttons = document.getElementsByClassName('app-speech-stop-btn');
    if (buttons && buttons.length > 0) {
      for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i] as HTMLButtonElement;
        button.addEventListener('click', this.stopVoiceToText.bind(this));
      }
    }
  }

  getFormControlValues() {
    let formControls = document.querySelectorAll('[binding="true"]');
    formControls.forEach(ctrl => {
      let controlType = ctrl.getAttribute('control-type');
      switch (controlType) {
        case 'text':
          let textControl = ctrl as HTMLInputElement;
          let idText = textControl.id;
          let textValue = textControl.value;
          this.previewHtml = this.previewHtml.replace('{#' + idText + '}', textValue);
          break;
        case 'radio':
          let rdoControl = ctrl as HTMLInputElement;
          if (rdoControl.checked) {
            let rdoName = rdoControl.name;
            let rdoValue = rdoControl.value;
            this.previewHtml = this.previewHtml.replace('{#' + rdoName + '}', rdoValue);
          }
          break;
        case 'checkbox':
          let chkControl = ctrl as HTMLInputElement;
          let chkControlName = chkControl.name;
          if (chkControl.checked == true) {
            this.previewHtml = this.previewHtml.replace('selected="{#' + chkControlName + '}"', 'checked="true"');
          }
          else {
            this.previewHtml = this.previewHtml.replace('selected="{#' + chkControlName + '}"', '');
          }
        default:
          break;
      }
      this.previewHtml = this.previewHtml.replace('{#signature}', this.image);
    });
  }

  appointmentChange(id: number) {
    if (id && id > 0) {
      this.templateService.getSelectedAppointmentDetail(id).subscribe(_data => {
        if (_data) {
          this.selectedAppointment = _data;
          console.log(this.selectedAppointment);
          this.bindDefaultValues();
        }
      }, _err => { console.log(_err); }, () => { });
    }
  }

  previewTemplate(templateId) {
    if (templateId) {
      this.previewHtml = this.selectedTemplateHtml;
      this.getFormControlValues();
      this.isPreview = true;
    }
  }

  closePreview() {
    this.isPreview = false;
  }

  bindPreviewHTML(html) {
    if (html) {
      let safeHTML = this.sanitizer.bypassSecurityTrustHtml(html);
      return safeHTML;
    }
  }

  sendToOneDrive() {
    if (!this.selectedAppointment) {
      this.notyHelper.ShowNoty("Please select an appointment.");
    }
    else {
      if (this.previewHtml) {
        this.show = true;
        var result: ArrayBuffer;
        var elementHTML = this.previewHtml;
        var doc = new jsPDF();
        var graphServive = this.graphService;
        var fileName = this.selectedAppointment.PatientName + "_" + this.selectedAppointment.PatientEmr + "-" + this.selectedTemplateName;
        var appointmentDate = this.getDateStringFormat("YMD", this.selectedAppointment.AppointmentDate, "-");
        var practiceName = this.selectedAppointment.PracticeName;
        var practiceAddress = this.trimAddress(this.selectedAppointment.Address);
        var patientNameEmr = this.selectedAppointment.PatientName + "_" + this.selectedAppointment.PatientEmr;
        //var patientEmr = this.selectedAppointment.PatientEmr;
        //var templateName = this.selectedTemplateName;
        doc.html(elementHTML, {
          callback: function (doc) {
            // Save the PDF
            result = doc.output("arraybuffer");
            //doc.output("pdfobjectnewwindow");
            //let fileResult = new File([result], "InitialTemplate_1.pdf", { type: "application/pdf" });
            let content = {
              "name": fileName + ".pdf",
              "size": result.byteLength,
              "file": result
            }
            graphServive.SaveTemplateForAppointment(content, practiceName, appointmentDate, patientNameEmr, practiceAddress);
          },
          margin: [5, 5, 5, 5],
          autoPaging: 'text',
          x: 0,
          y: 0,
          width: 150, //target width in the PDF document
          windowWidth: 700 //window width in CSS pixels
        });
        this.show = false;
      }
      this.template.Status = 1;
      this.template.AppointmentId = this.appointmentId;
      this.template.TemplateId = this.templateId;
      this.templateService.saveTemplate(this.template).subscribe(data => {
        if (data) {
          this.notyHelper.ShowNoty("Data saved successfully !!!");
        }
      }, err => { console.log(err); }, () => { });
      this.notyHelper.ShowNoty("File Sent to Ondrive.");
    }
  }

  trimAddress(str) {
    return this.trim(str, 10);
  }
  trim(str, length) {
    return str.substring(0, length);
  }

  getDraftHtml(html) {
    let formControls = document.querySelectorAll('[binding="true"]');
    formControls.forEach(ctrl => {
      let controlType = ctrl.getAttribute('control-type');
      switch (controlType) {
        case 'text':
          let textControl = ctrl as HTMLInputElement;
          let idText = textControl.id;
          let textValue = textControl.value;
          html = html.replace('{#' + idText + '}', textValue);
          break;
        case 'radio':
          let rdoControl = ctrl as HTMLInputElement;
          if (rdoControl.checked) {
            let rdoName = rdoControl.name;
            let rdoValue = rdoControl.value;
            html = html.replace('{#' + rdoName + '}', rdoValue);
          }
          break;
        case 'checkbox':
          let chkControl = ctrl as HTMLInputElement;
          let chkControlName = chkControl.name;
          if (chkControl.checked == true) {
            html = html.replace('selected="{#' + chkControlName + '}"', 'checked="true"');
          }
          else {
            html = html.replace('selected="{#' + chkControlName + '}"', '');
          }
        default:
          break;
      }
    });
    html = html.replace('{#signature}', this.image);
    return html;
  }

  //sendToEmail(appointment) {
  //  if (this.previewHtml && appointment) {
  //    let model = new TemplateMailRequest();
  //    var appData = this.lstAppointment.find(x => x.Id == appointment);
  //    model.MailId = "dinesh.rkp@gmail.com";
  //    model.Appointment = appData.ServiceNumber;
  //    model.HtmlBody = this.previewHtml;
  //    this.templateService.SendTemplateMail(model).subscribe(_data => {
  //      if (_data) {
  //        this.notyHelper.ShowNoty("Email sent successfully");
  //      }
  //    }, _err => { console.log(_err); }, () => { });
  //  }
  //}

  saveAsDraft(templateId, appointmentId, draftTemplate: HTMLDivElement) {
    if (templateId && appointmentId) {
      this.getFormControlValues();
      this.template.AppointmentId = appointmentId;
      this.template.TemplateId = templateId;
      this.template.Status = TemplateStatus.Draft;
      this.template.DraftHtml = this.getDraftHtml(draftTemplate.innerHTML);
      setTimeout(() => {
        this.templateService.SaveDraftTemplate(this.template).subscribe(_data => {
          if (_data) {
            this.notyHelper.ShowNoty("Data Saved Successfully.");
          }
        }, err => { console.log(err); }, () => { });
      }, 2000);
    }
  }
}


