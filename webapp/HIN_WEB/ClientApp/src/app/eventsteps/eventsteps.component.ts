import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contactinformation } from '../contactinformation/contactinformation';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { Datashared } from '../helper/datashared';
import { LeadGenType } from '../helper/LeadGenType';
import { NotyHelper } from '../helper/NotyHelper';
import { ListdealsService } from '../listdeals/listdeals.service';
import { ModalService } from '../loader.service';
import { Events } from '../model/event';
import { Officeemail } from '../model/officeemail';
import { Pipeline, PipelineGroup } from '../model/pipeline';
import { NotesInformation } from '../notesinfo/notesinfo';
import { NotesinfoService } from '../notesinfo/notesinfo.service';
import { SfcalendarService } from '../sfcalendar/sfcalendar.service';

@Component({
  selector: 'app-eventsteps',
  templateUrl: './eventsteps.component.html',
  styleUrls: ['./eventsteps.component.css']
})
export class EventstepsComponent implements OnInit {
  emailInfos: Array<Officeemail> = [];
  notesInfos: Array<NotesInformation> = [];
  activeContainer: string = "tab1";
  contactInformations: Array<Contactinformation> = [];
  selectedContactInfo: Contactinformation = new Contactinformation();
  toggle: boolean = false;
  selectedContact: Contactinformation;
  contactInfo: Contactinformation = new Contactinformation();
  public events: Events = new Events();
  public listPipeLineGroup: Array<PipelineGroup>;
  public listofPipeline: Array<Pipeline>;
  selectedPipeIndex = 0;
  public entityType: number = LeadGenType.Event;
  public entityId: number;
  public entityNumber: string;

  constructor(private notesService: NotesinfoService, private calendarService: SfcalendarService, public dataShared: Datashared, public router: Router, private contactService: ContactinformationService, private modalService: ModalService, public noty: NotyHelper, public dealService: ListdealsService) { }

  ngOnInit() {
    this.getPipeLineGroups();
    var eventData = new Events();
    eventData = this.dataShared.getValue();
    if (eventData) {
      this.events = eventData;
      this.entityId = this.events.Id;
      this.entityNumber = this.events.EventNumber;
      this.getPipeLine(this.events.PipelineGroupId);
      this.LoadNotes(this.events.Id, this.entityType);
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

  addNewContact() {
    this.selectedContact = null;
    this.contactInfo = new Contactinformation();
    this.toggle = true;
  }
  addNewEvent() {
    this.navigate('addeventmodal', true);
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
  editEvent(events) {
    this.dataShared.setValue(events);
    this.navigate('addeventmodal', true);
  }
  getPipeLineGroupName(id) {
    if (this.listPipeLineGroup) {
      var name = this.listPipeLineGroup.find(x => x.PipelineGroupId == id).Name;
      return name;
    }
  }
  getPipeLineGroups() {
    this.dealService.getPipeLineGroup().subscribe(data => {
      this.listPipeLineGroup = data;
    });
  }
  sortBy(prop: string) {
    return this.listofPipeline ? this.listofPipeline.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1) : [];
  }
  getPipeLine(id) {
    if (id) {
      this.dealService.getPipeLineByPipeLineGroupId(id).subscribe(data => {
        this.listofPipeline = data;
        this.listofPipeline = this.sortBy('DisplayOrder');
        this.selectedPipeIndex = this.listofPipeline.findIndex(x => x.PipelineId == this.events.PipelineId);
        if (this.selectedPipeIndex == -1) {
          this.selectedPipeIndex = 0;
          this.events.PipelineId = this.listofPipeline[this.selectedPipeIndex].PipelineId;
        }
      });
    }
  }

  saveContactInfo(contactInfo) {
    contactInfo.Type = this.entityType;
    contactInfo.EntityId = this.events.Id;
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

  getContactInformation() {
    this.contactService.getContactInformation(this.entityType, this.events.Id, false).subscribe(data => {
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
  closeToggle() {
    this.selectedContact = null;
    this.toggle = false;
  }

  cancel() {
    this.dataShared.setEntityValue(this.entityType);
    this.dataShared.setValue(this.events.PipelineGroupId);
    this.router.navigate(['/funnel']);
  }


}
