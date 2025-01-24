import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contactinformation } from '../contactinformation/contactinformation';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { Datashared } from '../helper/datashared';
import { LeadGenType } from '../helper/LeadGenType';
import { NotyHelper } from '../helper/NotyHelper';
import { ListdealsService } from '../listdeals/listdeals.service';
import { ModalService } from '../loader.service';
import { Lead } from '../model/lead';
import { Officeemail } from '../model/officeemail';
import { Pipeline, PipelineGroup } from '../model/pipeline';
import { NotesInformation } from '../notesinfo/notesinfo';
import { NotesinfoService } from '../notesinfo/notesinfo.service';
import { SfcalendarService } from '../sfcalendar/sfcalendar.service';

@Component({
  selector: 'app-leadsteps',
  templateUrl: './leadsteps.component.html',
  styleUrls: ['./leadsteps.component.css']
})
export class LeadstepsComponent implements OnInit {
  emailInfos: Array<Officeemail> = [];
  notesInfos: Array<NotesInformation> = [];
  activeContainer: string = "tab1";
  contactInformations: Array<Contactinformation> = [];
  selectedContactInfo: Contactinformation = new Contactinformation();
  toggle: boolean = false;
  selectedContact: Contactinformation;
  contactInfo: Contactinformation = new Contactinformation();
  public entityType: number = LeadGenType.Lead;
  public entityNumber: string;
  public entityId: number;
  selectedPipeIndex = 0;
  public listPipeLineGroup: Array<PipelineGroup>;
  public listofPipeline: Array<Pipeline>;
  public lead: Lead = new Lead();


  constructor(private notesService: NotesinfoService, private calendarService: SfcalendarService, public dataShared: Datashared, public router: Router, private contactService: ContactinformationService, public dealService: ListdealsService, private modalService: ModalService, public noty: NotyHelper) { }

  ngOnInit() {
    this.getPipeLineGroups();
    var leadData = new Lead();
    leadData = this.dataShared.getValue();
    if (leadData) {
      this.lead = leadData;
      this.entityId = this.lead.LeadId;
      this.entityNumber = this.lead.LeadNumber;
      this.getPipeLine(this.lead.PipelineGroupId);
      this.LoadNotes(this.lead.LeadId, this.entityType);
    }
    else {
      this.router.navigate(['/listleads']);
    }
  }

  addOpportunity() {
    if (this.lead.LeadId) {
      this.dataShared.setLeadValue(this.lead);
      this.navigate('adddealsmodal', true);
    }
    else
      this.navigate('adddealsmodal', true);
  }

  LoadNotes(entityId, entityTypeId) {
    this.notesService.LoadNotes(entityId, entityTypeId).subscribe(data => {
      if (data) {
        this.notesInfos = data;
      }
    }, err => { }, () => { });
  }

  closeToggle() {
    this.selectedContact = null;
    this.toggle = false;
  }

  getContactInformation() {
    this.contactService.getContactInformation(this.entityType, this.lead.LeadId, false).subscribe(data => {
      if (data != null) {
        this.contactInformations = data;
        if (this.contactInformations.length == 1) {
          this.selectedContactInfo = this.contactInformations[0];
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

  editLead(lead ) {
    //this.dataShared.setPermissionBaseValue(permission);
    this.dataShared.setValue(lead);
    this.navigate('addleadsmodal', true);
  }

  addNewContact() {
    this.selectedContact = null;
    this.contactInfo = new Contactinformation();
    this.toggle = true;
  }

  addNewLead() {
    this.navigate('addleadsmodal', true);
  }

  navigate(path, ismodel) {
    if (ismodel) {
      this.modalService.show(null);
      this.router.navigate([{ outlets: { modal: [path] } }]);
    }
    else {
      this.router.navigate(['/' + path]);
    }
  }



  getPipeLineGroups() {
    this.dealService.getPipeLineGroup().subscribe(data => {
      this.listPipeLineGroup = data;
    });
  }

  getPipeLine(id) {
    if (id) {
      this.dealService.getPipeLineByPipeLineGroupId(id).subscribe(data => {
        this.listofPipeline = data;
        this.listofPipeline = this.sortBy('DisplayOrder');
        this.selectedPipeIndex = this.listofPipeline.findIndex(x => x.PipelineId == this.lead.PipelineId);
        if (this.selectedPipeIndex == -1) {
          this.selectedPipeIndex = 0;
          this.lead.PipelineId = this.listofPipeline[this.selectedPipeIndex].PipelineId;
        }
      });
    }
  }

  getPipeLineGroupName(id) {
    if (this.listPipeLineGroup) {
      var name = this.listPipeLineGroup.find(x => x.PipelineGroupId == id).Name;
      return name;
    }
  }

  getPipeLineName(id) {
    if (this.listofPipeline) {
      var name = this.listofPipeline.find(x => x.PipelineId == id).Name;
      return name;
    }
  }

  sortBy(prop: string) {
    return this.listofPipeline ? this.listofPipeline.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1) : [];
  }

  saveContactInfo(contactInfo) {
    contactInfo.Type = this.entityType;
    contactInfo.EntityId = this.lead.LeadId;
    if (!contactInfo.Id) {
      this.contactService.addContactInfo(contactInfo).subscribe(data => {
        if (data) {
          this.selectedContact = null;
          this.getContactInformation();
          this.toggle = false;
          this.noty.ShowNoty("Contact information saved !!!");
        }
      }, err => { }, () => { });
    }
    else {
      this.contactService.UpdateContact(contactInfo).subscribe(data => {
        if (data) {
          this.selectedContact = null;
          this.getContactInformation();
          this.toggle = false;
          this.noty.ShowNoty("Contact information saved !!!");
        }
      }, err => { }, () => { });
    }
  }

  cancel() {
    this.dataShared.setEntityValue(this.entityType);
    this.dataShared.setValue(this.lead.PipelineGroupId);
    this.router.navigate(['/funnel']);
  }

}
