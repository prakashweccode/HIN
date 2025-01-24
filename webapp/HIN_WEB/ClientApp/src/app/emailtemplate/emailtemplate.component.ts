import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { debug } from 'console';
import { Datashared } from '../helper/datashared';
import { NotyHelper } from '../helper/NotyHelper';
import { ComponentSettings, EmailTemplate } from '../model/email-history';
import { EmailtemplateService } from './emailtemplate.service';

@Component({
  selector: 'app-emailtemplate',
  templateUrl: './emailtemplate.component.html',
  styleUrls: ['./emailtemplate.component.css']
})
export class EmailtemplateComponent implements OnInit {
  public templateNames: Array<string> = [];
  public TemplateId: number = 0;
  public tempParent: any;
  public tempChild: any;
  public tempSettings: any;
  public components: any = [];
  public editorToggle: boolean = false;
  public configPopupToggle: boolean = false;
  public previewToggle: boolean = false;
  public previewHTML: string = '';
  public templateName: string;
  public editorModel: any = {
    editorText: null, elementStyle: null, elementProperties: {}
  };
  constructor(private router: Router, private sanitizer: DomSanitizer, private noty: NotyHelper, private service: EmailtemplateService, private dataHelper: Datashared) { }

  ngOnInit() {
    let template = this.dataHelper.getValue();
    if (template) {
      let emailTemplate = template;
      this.components = JSON.parse(emailTemplate.TemplateJson);
      this.templateName = emailTemplate.TemplateName;
      this.TemplateId = emailTemplate.TemplateId;
    }
    this.getTemplateNames();
  }
  getTemplateNames() {
    this.service.getAllTemplateNames().subscribe(data => {
      if (data) {
        this.templateNames = data;
      }
    }, err => { }, () => { });
  }
  editTextBlock(ctrl, parent) {
    this.editorToggle = true;
    this.editorModel.editorText = ctrl.data;
    this.tempParent = parent;
    this.tempChild = ctrl;
  }
  saveEditorModel() {
    this.tempChild.data = this.editorModel.editorText;
    this.editorModel.editorText = null;
    this.editorToggle = false;
  }
  uploadPreview(imageCtrl, previewCtrl) {
    if (imageCtrl.files && imageCtrl.files[0]) {
      //previewCtrl.data = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageCtrl.files[0]));
      let file = imageCtrl.files[0];
      //let fileToBlob = new Blob([new Uint8Array(file.arrayBuffer())], { type: file.type });
      //console.log(fileToBlob);
      var reader = new FileReader();
      reader.onload = function () {
        previewCtrl.data = reader.result;
        //console.log(reader.result);
        //var blob = window.dataURLtoBlob(reader.result);
        //console.log(blob, new File([blob], "image.png", {
        //  type: "image/png"
        //}));
      };
      reader.readAsDataURL(file);
    }
  }
  closePreviewToggle() {
    this.previewToggle = false;
    this.previewHTML = '';
  }
  clearPreview(previewCtrl) {
    if (previewCtrl)
      previewCtrl.data = null;
  }
  deleteElement(index) {
    if (index > -1) {
      this.components.splice(index, 1);
    }
  }
  dragElement(evt, data) {
    evt.dataTransfer.setData("data", data);
  }
  moveElement(evt, component) {
    evt.dataTransfer.setData("move", JSON.stringify(component));
  }
  closeEditorToggle() {
    this.editorModel.editorText = null;
    this.editorToggle = false;
  }
  settings(component) {
    this.configPopupToggle = true;
    this.tempSettings = new ComponentSettings();
    if (component.settings)
      this.tempSettings = component.settings;
    this.tempSettings.componentIndex = component.index;
  }
  closeConfigPopupToggle() {
    this.configPopupToggle = false;
  }
  saveConfiguration(settings) {
    if (settings)
      this.components[settings.componentIndex].settings = settings;
  }
  changeElement(evt, fromComp) {
    let toComp = evt.dataTransfer.getData("move");
    if (toComp) {
      toComp = JSON.parse(toComp);
      this.components[toComp.index].index = fromComp.index;
      this.components[fromComp.index].index = toComp.index;
      this.sortArray();
    }
  }
  sortArray() {
    this.components = this.components.sort((a, b) => a.index - b.index);
  }
  dropElement(evt) {
    var data = evt.dataTransfer.getData("data");
    switch (data) {
      case 'layout1':
        this.components.push({
          name: data,
          index: null,
          type: "row",
          props: {},
          data: null,
          settings: {},
          cols: [
            {
              name: "image",
              width: "48%",
              data: null
            },
            {
              name: "editor",
              width: "48%",
              data: null
            }
          ]
        });
        break;
      case 'layout2':
        this.components.push({
          name: data,
          index: null,
          type: "row",
          data: null,
          settings: {},
          cols: [
            {
              name: "editor",
              width: "50%",
              data: null
            },
            {
              name: "image",
              width: "50%",
              data: null
            }
          ]
        });
        break;
      case 'layout3':
        this.components.push({

          name: data,
          index: null,
          type: "row",
          data: null,
          settings: {},
          cols: [
            {
              name: "image",
              width: "50%",
              data: null
            },
            {
              name: "image",
              width: "50%",
              data: null
            }
          ]

        });
        break;
      case 'layout4':
        this.components.push({
          name: data,
          index: null,
          type: "row",
          data: null,
          settings: {},
          cols: [
            {
              name: "image",
              width: "50%",
              data: null
            },
            {
              name: "image",
              width: "50%",
              data: null
            },
            {
              name: "editor",
              width: "50%",
              data: null
            },
            {
              name: "editor",
              width: "50%",
              data: null
            }
          ]
        });
        break;
      case 'layout5':
        this.components.push({
          name: data,
          index: null,
          type: "row",
          data: null,
          settings: {},
          cols: [
            {
              name: "editor",
              width: "50%",
              data: null
            },
            {
              name: "editor",
              width: "50%",
              data: null
            }
          ]
        });
        break;
      case 'layout6':
        this.components.push({
          name: data,
          index: null,
          type: "row",
          data: null,
          settings: {},
          cols: [

          ]
        });
        break;
      case 'image':
        this.components.push({
          name: data,
          index: null,
          type: "row",
          data: null,
          settings: {},
          cols: [

          ]
        });
        break;
      case 'header':
        this.components.push({
          name: data,
          index: null,
          type: "row",
          data: null,
          settings: {},
          cols: [

          ]
        });
        break;
      case 'text':
        this.components.push({
          name: data,
          index: null,
          type: "row",
          data: null,
          settings: {},
          cols: [

          ]
        });
        break;
      case 'button':
        this.components.push({
          name: data,
          index: null,
          type: "row",
          data: null,
          settings: {},
          cols: [

          ]
        });
        break;
      case 'separator':
        this.components.push({
          name: data,
          index: null,
          type: "row",
          data: null,
          settings: {},
          cols: [

          ]
        });
        break;
      case 'list':
        this.components.push({
          name: data,
          index: null,
          type: "row",
          data: null,
          settings: {},
          cols: [

          ]
        });
        break;
      case 'video':
        this.components.push({
          name: data,
          index: null,
          type: "row",
          data: null,
          settings: {},
          cols: [

          ]
        });
        break;
      case 'links':
        this.components.push({
          name: data,
          index: null,
          type: "row",
          data: null,
          settings: {},
          cols: [

          ]
        });
        break;
      case 'footer':
        this.components.push({
          name: data,
          index: null,
          type: "row",
          data: null,
          settings: {},
          cols: [

          ]
        });
        break;
    }
  }
  allowDrop(evt) {
    evt.preventDefault();
  }
  backToTemplates() {
    this.router.navigate(['/emaildashboard']);
  }
  assignIndex(component, index) {
    component.index = index;
  }
  previewTemplate() {
    if (this.components.length > 0) {
      this.parseTemplate(this.components);
      //let previewContainer = document.getElementById();
      this.previewToggle = true;
    }
    else {
      this.noty.ShowNoty("Preview not available.");
    }
  }
  bindPreviewHTML(html) {
    if (html) {
      let safeHTML = this.sanitizer.bypassSecurityTrustHtml(html);
      return safeHTML;
      //return this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(html));
      //return this.sanitizer.sanitize(SecurityContext.HTML, html);
    }
  }
  //bindPreviewBlob(blob) {
  //  if (blob) {
  //    console.log(blob);
  //    console.log(this.sanitizer.bypassSecurityTrustUrl(blob));
  //    return this.sanitizer.bypassSecurityTrustUrl(blob);
  //  }
  //}
  SaveTemplate() {
    if (this.templateName && this.templateName != "") {
      if (this.templateNames.indexOf(this.templateName.toLowerCase()) > -1 && this.TemplateId <= 0) {
        this.noty.ShowNoty("Template name already exist. Please enter alternate template name.");
      }
      else {
        if (this.components && this.components.length > 0) {
          this.parseTemplate(this.components);
          let emailTemplate = new EmailTemplate();
          emailTemplate.TemplateHtml = `<div style="width:100%;"><div style="max-width:750px;margin:auto;border:1px solid #ccc;padding:10px;"> ${this.previewHTML}</div></div>`;
          emailTemplate.TemplateJson = JSON.stringify(this.components);
          emailTemplate.TemplateName = this.templateName;
          emailTemplate.TemplateId = this.TemplateId;
          this.service.saveEmailTemplate(emailTemplate).subscribe(data => {
            if (data) {
              this.noty.ShowNoty("Template : {" + this.templateName + "} saved successfully.");
            }
          }, err => { }, () => { });
        } else {
          this.noty.ShowNoty("Template is empty.");
        }
      }
    }
    else {
      this.noty.ShowNoty("Template name is required.");
    }
  }

  //parseNullOrEmpty(oValue) {
  //  return oValue ? oValue : '';
  //}
  getCols(cols) {
    let columns = '';
    for (let i = 0; i < cols.length; i++) {
      switch (cols[i].name) {
        case 'editor':
          columns += `<div style="width: 47%;padding: 0;border-radius: 5px;margin: 10px;float:left;">
                        <div style="width:100%;min-height:140px;cursor:pointer;">${(cols[i] && cols[i].data) ? cols[i].data : ''}</div>
                      </div>`;
          break;
        case 'image':
          columns += `<div style="width: 44%;padding: 0px 10px;border-radius: 5px;margin: 10px;float:left;">
                      <img src="${(cols[i] && cols[i].data) ? cols[i].data : ''}" style="width:100%;min-height:140px;min-height:14px" alt="image" />
                      </div>`;
          break;
      }
    }
    return columns;
  }
  parseTemplate(components) {
    for (let i = 0; i < components.length; i++) {
      switch (components[i].name) {
        case 'layout1':
          this.previewHTML += `<div style="width:100%;display:inline-block;">${this.getCols(components[i].cols)}</div>`;
          break;
        case 'layout2':
          this.previewHTML += `<div style="width:100%;display:inline-block;">${this.getCols(components[i].cols)}</div>`;
          break;
        case 'layout3':
          this.previewHTML += `<div style="width:100%;display:inline-block;">${this.getCols(components[i].cols)}</div>`;
          break;
        case 'layout4':
          this.previewHTML += `<div style="width:100%;display:inline-block;">${this.getCols(components[i].cols)}</div>`;
          break;
        case 'layout5':
          this.previewHTML += `<div style="width:100%;display:inline-block;">${this.getCols(components[i].cols)}</div>`;
          break;
        case 'layout6':
          this.previewHTML += `<div style="width:100%;display:inline-block;">${this.getCols(components[i].cols)}</div>`;
          break;
        case 'image':
          this.previewHTML += `<div style="width:100%;display:inline-block;">
          <img src="${(components[i] && components[i].data) ? components[i].data : ''}" style="width:100%;min-height:175px;" alt="image" />
          </div>`;
          break;
        case 'header':
          this.previewHTML += `<div style="width:100%;display:inline-block;">
          <div style="width:100%;min-height:75px;padding-top:25px;cursor:pointer;">${(components[i] && components[i].data) ? components[i].data : ''}</div>
          </div>`;
          break;
        case 'text':
          this.previewHTML += `<div style="width:100%;display:inline-block;">
          <div style="width:100%;min-height:75px;padding-top:25px;cursor:pointer;">${(components[i] && components[i].data) ? components[i].data : ''}</div>
          </div>`;
          break;
        case 'button':

          break;
        case 'separator':
          this.previewHTML += `<div style="width:100%;display:inline-block;">
          <hr style="margin:5px 0px;" />
          </div>`;
          break;
        case 'list':

          break;
        case 'video':
          this.previewHTML += `<div style="width:100%;display:inline-block;">
          <div style="width:100%;min-height:75px;padding-top:25px;cursor:pointer;">${(components[i] && components[i].data) ? components[i].data : ''}</div>
          </div>`;
          break;
        case 'links':
          this.previewHTML += `<div style="width:100%;display:inline-block;">
          <div style="width:100%;min-height:75px;padding-top:25px;"><a target="_blank" style="text-decoration:underline;cursor:pointer;">${(components[i] && components[i].data) ? components[i].data : ''}</a></div>
          </div>`;
          break;
        case 'footer':
          this.previewHTML += `<div style="width:100%;display:inline-block;">
          <div style="width:100%;min-height:75px;padding-top:25px;cursor:pointer;">${(components[i] && components[i].data) ? components[i].data : ''}</div>
          </div>`;
          break;
      }
    }
  }
}
