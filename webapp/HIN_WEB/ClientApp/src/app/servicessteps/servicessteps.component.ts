import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddleadsService } from '../addleads/addleads.service';
import { JobService } from '../addservice/job.service';
import { Contactinformation } from '../contactinformation/contactinformation';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { Datashared } from '../helper/datashared';
import { LeadGenType } from '../helper/LeadGenType';
import { NotyHelper } from '../helper/NotyHelper';
import { ListdealsService } from '../listdeals/listdeals.service';
import { ModalService } from '../loader.service';
import { Deal } from '../model/deal';
import { Lead } from '../model/lead';
import { Officeemail } from '../model/officeemail';
import { Pipeline, PipelineGroup } from '../model/pipeline';
import { Services } from '../model/services';
import { NotesInformation } from '../notesinfo/notesinfo';
import { NotesinfoService } from '../notesinfo/notesinfo.service';
import { SfcalendarService } from '../sfcalendar/sfcalendar.service';

@Component({
  selector: 'app-servicessteps',
  templateUrl: './servicessteps.component.html',
  styleUrls: ['./servicessteps.component.css']
})
export class ServicesstepsComponent implements OnInit {
  emailInfos: Array<Officeemail> = [];
  notesInfos: Array<NotesInformation> = [];
  activeContainer: string = "tab1";
  contactInformations: Array<Contactinformation> = [];
  selectedContactInfo: Contactinformation = new Contactinformation();
  toggle: boolean = false;
  selectedContact: Contactinformation;
  contactInfo: Contactinformation = new Contactinformation();
  public entityType: number = LeadGenType.Services;
  public entityNumber: string;
  public entityId: number;
  selectedPipeIndex = 0;
  public lstServiceStatus: any;
  public listPipeLineGroup: Array<PipelineGroup>;
  public listofPipeline: Array<Pipeline>;
  public service: Services = new Services();
  lstLeads: Array<Lead> = [];
  lstOpportunities: Array<Deal> = [];
  reasonToggle: boolean = false;

  constructor(private jobService: JobService, private notesService: NotesinfoService, private leadService: AddleadsService, public dataShared: Datashared, public router: Router, private contactService: ContactinformationService, public dealService: ListdealsService, private modalService: ModalService, public noty: NotyHelper) { }

  ngOnInit() {
    this.getPipeLineGroups();
    this.getAllLeads();
    this.getAllOpportunities();
    var serviceData = new Services();
    serviceData = this.dataShared.getValue();
    if (serviceData) {
      this.service = serviceData;
      this.entityId = this.service.Id;
      this.entityNumber = this.service.ServiceNumber;
      this.getPipeLine(this.service.PipelineGroupId);
      this.LoadNotes(this.service.Id, this.entityType);
    }
    else {
      this.router.navigate(['/listservices']);
    }
  }
  getAllLeads() {
    this.leadService.getAllLeads().subscribe(data => {
      if (data) {
        this.lstLeads = data;
      }
    }, err => { }, () => { });
  }
  getAllOpportunities() {
    this.dealService.getAllOpportunity().subscribe(data => {
      if (data)
        this.lstOpportunities = data;
    }, err => { }, () => { });
  }
  addService() {
    if (this.service.Id) {
      this.dataShared.setValue(this.service);
      this.navigate('addservicemodal', true);
    }
    else
      this.navigate('addservicemodal', true);
  }
  UpdateStatus(statusId) {
    if (statusId && (statusId == 4)) {
      this.dataShared.setValue(statusId);
      this.reasonToggle = true;
    }
    else {
      this.jobService.updateStatusId(this.service.Id, statusId).subscribe(data => {
        if (data) {
          this.service = data;
          this.noty.ShowNoty("Service status updated.");
        }
      }, err => { }, () => { });
    }
  }
  cancelReasonToggle() {
    this.service.CancelReason = null;
    this.reasonToggle = false;
  }
  updateCancelReason() {
    this.service.StatusId = this.dataShared.getValue();
    this.jobService.updateCancelReason(this.service).subscribe(data => {
      this.reasonToggle = false;
      this.noty.ShowNoty("Updated successfully!");
    }, err => { }, () => { });
  }
  editLeadModal() {
    this.dataShared.setValue(this.lstLeads.find(x => x.LeadId == this.service.LeadId));
    this.navigate('addleadsmodal', true);
  }
  editDealModal() {
    this.dataShared.setValue(this.lstOpportunities.find(x => x.DealId == this.service.DealId));
    this.navigate('adddealsmodal', true);
  }
  getCompanyName(id) {
    if (id && this.lstLeads.length > 0) {
      var companyName = this.lstLeads.find(x => x.LeadId == id).CompanyName;
      if (companyName == null) {
        companyName = this.lstLeads.find(x => x.LeadId == id).LeadName;
      }
      return companyName;
    }
  }
  getOpportunityName(id) {
    if (id && this.lstOpportunities.length > 0) {
      var opportunityName = this.lstOpportunities.find(x => x.DealId == id).DealName;
      if (opportunityName == null) {
        return '';
      }
      return opportunityName;
    }
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
    this.contactService.getContactInformation(this.entityType, this.service.Id, false).subscribe(data => {
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

  editServices(service) {
    this.dataShared.setValue(service);
    this.navigate('addservicemodal', true);
  }

  addNewContact() {
    this.selectedContact = null;
    this.contactInfo = new Contactinformation();
    this.toggle = true;
  }

  addNewService() {
    this.navigate('addservicemodal', true);
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
        this.selectedPipeIndex = this.listofPipeline.findIndex(x => x.PipelineId == this.service.PipelineId);
        if (this.selectedPipeIndex == -1) {
          this.selectedPipeIndex = 0;
          this.service.PipelineId = this.listofPipeline[this.selectedPipeIndex].PipelineId;
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
    contactInfo.EntityId = this.service.Id;
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
    this.dataShared.setValue(this.service.PipelineGroupId);
    this.router.navigate(['/funnel']);
  }


}
