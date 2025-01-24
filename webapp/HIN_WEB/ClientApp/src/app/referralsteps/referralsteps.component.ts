import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contactinformation } from '../contactinformation/contactinformation';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { Datashared } from '../helper/datashared';
import { LeadGenType } from '../helper/LeadGenType';
import { NotyHelper } from '../helper/NotyHelper';
import { ListdealsService } from '../listdeals/listdeals.service';
import { ModalService } from '../loader.service';
import { Officeemail } from '../model/officeemail';
import { Pipeline, PipelineGroup } from '../model/pipeline';
import { Referral } from '../model/referral';
import { NotesInformation } from '../notesinfo/notesinfo';
import { NotesinfoService } from '../notesinfo/notesinfo.service';
import { SfcalendarService } from '../sfcalendar/sfcalendar.service';

@Component({
  selector: 'app-referralsteps',
  templateUrl: './referralsteps.component.html',
  styleUrls: ['./referralsteps.component.css']
})
export class ReferralstepsComponent implements OnInit {
  emailInfos: Array<Officeemail> = [];
  notesInfos: Array<NotesInformation> = [];
  activeContainer: string = "tab1";
  contactInformations: Array<Contactinformation> = [];
  selectedContactInfo: Contactinformation = new Contactinformation();
  toggle: boolean = false;
  selectedContact: Contactinformation;
  contactInfo: Contactinformation = new Contactinformation();
  public entityType: number = LeadGenType.Referral;
  public entityNumber: string;
  public entityId: number;
  selectedPipeIndex = 0;
  public listPipeLineGroup: Array<PipelineGroup>;
  public listofPipeline: Array<Pipeline>;
  public referral: Referral = new Referral();
  constructor(private notesService: NotesinfoService, private calendarService: SfcalendarService, public dataShared: Datashared, public router: Router, private contactService: ContactinformationService, public dealService: ListdealsService, private modalService: ModalService, public noty: NotyHelper) { }

  ngOnInit() {
    this.getPipeLineGroups();
    var referralData = new Referral();
    referralData = this.dataShared.getValue();
    if (referralData) {
      this.referral = referralData;
      this.entityId = this.referral.ReferralId;
      this.entityNumber = this.referral.ReferralNumber;
      this.getPipeLine(this.referral.PipelineGroupId);
      this.LoadNotes(this.referral.ReferralId, this.entityType);
    }
    else {
      this.router.navigate(['/listreferral']);
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
    this.contactService.getContactInformation(this.entityType, this.referral.ReferralId, false).subscribe(data => {
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

  addNewContact() {
    this.selectedContact = null;
    this.contactInfo = new Contactinformation();
    this.toggle = true;
  }


  addNewReferral() {
    this.navigate('addreferralmodal', true);
  }

  editReferral(referral) {
    this.dataShared.setValue(referral);
    this.navigate('addreferralmodal', true);
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
        this.selectedPipeIndex = this.listofPipeline.findIndex(x => x.PipelineId == this.referral.PipelineId);
        if (this.selectedPipeIndex == -1) {
          this.selectedPipeIndex = 0;
          this.referral.PipelineId = this.listofPipeline[this.selectedPipeIndex].PipelineId;
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
    contactInfo.EntityId = this.referral.ReferralId;
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
    this.dataShared.setValue(this.referral.PipelineGroupId);
    this.router.navigate(['/funnel']);
  }



}
