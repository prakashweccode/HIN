import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Deal } from '../model/deal';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';
import { UserDetail } from '../login/login';
import { Users } from '../users/users';
import { Contactinformation, DealContact, DealContactNextStep } from '../contactinformation/contactinformation';
import { LeadGenType } from '../helper/LeadGenType';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { UsersService } from '../users/users.service';
import { NotyHelper } from '../helper/NotyHelper';
import { ListdealsService } from '../listdeals/listdeals.service';
import { Organization } from '../model/organization';
import { Timecost } from '../model/timecost';
import { Materialcost } from '../model/materialcost';
import { AddleadsService } from '../addleads/addleads.service';
import { Lead } from '../model/lead';
import { ModalService } from '../loader.service';
import { NgZone } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  endOfWeek,
  addMinutes,
} from 'date-fns';
interface RecurringEvent {
  title: string;
  color: any;
  start: Date;
  end: Date;
  timestart: Time;
  timeend: Time;
  rrule?: {
    freq: any;
    bymonth?: number;
    bymonthday?: number;
    byweekday?: any;
  };
}
import RRule from 'rrule';
import { WeekViewHourSegment, ViewPeriod } from 'calendar-utils';
import { CalendarView, CalendarEventTimesChangedEvent, CalendarMonthViewBeforeRenderEvent, CalendarWeekViewBeforeRenderEvent, CalendarDayViewBeforeRenderEvent } from 'angular-calendar';
import { Subject, fromEvent } from 'rxjs';
import { Gender } from '../model/gender';
import { AdduserService } from '../adduser/adduser.service';
import { NotesinfoService } from '../notesinfo/notesinfo.service';
import { NotesInformation } from '../notesinfo/notesinfo';
import { SfCalendarEvent, PipelineGroup, Pipeline, EventSchedule } from '../model/pipeline';
import { Todo } from '../todo/todo';
import { SfcalendarService } from '../sfcalendar/sfcalendar.service';
import { Officeemail } from '../model/officeemail';
import { finalize, takeUntil } from 'rxjs/operators';
import { Customdropdown } from '../customdropdown/customdropdown';
import * as moment from 'moment-timezone';
import { Time } from "ngx-bootstrap/timepicker/timepicker.models";
import { GraphService } from '../officeauth/graph.service';
import { AuthService } from '../officeauth/auth.service';
moment.tz.setDefault('Utc');
@Component({
  selector: 'app-opportunityview',
  templateUrl: './opportunityview.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./opportunityview.component.css']
})
export class OpportunityviewComponent implements OnInit {
  public wonToggle: boolean = false;
  reasonToggle: boolean = false;
  iconToggle: boolean = false;
  selectedPipeIndex = 0;
  dragToCreateActive = false;
  weekStartsOn: 0 = 0;
  public listPipeLineGroup: Array<PipelineGroup>;
  public listofPipeline: Array<Pipeline>;
  events: SfCalendarEvent[] = [];
  recurringEvents: RecurringEvent[] = [];
  currentDate: Date;
  activeDayIsOpen: boolean = false;
  listGender: Array<Gender> = [];
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  Users: Array<Users> = [];
  loggedUser: UserDetail;
  selectedUser: Users;
  chooseStartDate: Date;
  chooseEndDate: Date;
  addEventDate: Date;
  viewPeriod: ViewPeriod;
  public calendarFor: string;
  public nextStepDealContact: DealContact = new DealContact();
  timeCostUser: Users = new Users;
  contactInformations: Array<Contactinformation> = [];
  nextStepInformation: DealContactNextStep = new DealContactNextStep();
  dealContacts: Array<DealContact> = [];
  selectedDealContact = new DealContact();
  toggle: boolean = false;
  addDisabled: boolean = false;
  calendarToggle: boolean = false;
  selectedContact: Contactinformation;
  ContactDetails: Array<Contactinformation> = [];
  contactInfo: Contactinformation = new Contactinformation();
  timecost: Timecost = new Timecost();
  materialcost: Materialcost = new Materialcost();
  deal: Deal = new Deal();
  activeContainer: string = "tab1";
  owner: Users;
  organization: Organization;
  dealContact: DealContact = new DealContact();
  selectedContactInfo: Contactinformation = new Contactinformation();
  calendarContainer: string = "tab1";
  costContainer: string = "tab1";
  placeHolder: string = "Zoom";
  ownerName: string;
  lead: Lead = new Lead();
  user: UserDetail;
  timeArr: Array<string>;
  dealContactId: number;
  addNoteToggle: boolean = false;
  newNote: string;
  notesToggle: boolean = false;
  viewNoteDetails: string;
  listViewNotes: Array<any> = [];
  notesInfos: Array<NotesInformation> = [];
  emailInfos: Array<Officeemail> = [];
  entityTypeId: number;
  entityId: number;
  stepTypes: Array<Customdropdown> = [];
  entityType: number = LeadGenType.Deal;
  public entityNumber: string;
  editContactInfo: Contactinformation = new Contactinformation();
  public todoList: Array<Todo> = [];
  public listDealContactEvents: Array<DealContact> = [];
  public isNextStep: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private calendarService: SfcalendarService, public router: Router, public leadService: AddleadsService, public dealService: ListdealsService, public dataShared: Datashared, public noty: NotyHelper, private contactService: ContactinformationService, private userService: UsersService, private modalService: ModalService, public zone: NgZone, public addUserService: AdduserService, private notesService: NotesinfoService, private graphService: GraphService, private officeService: AuthService, public listDealService: ListdealsService) { }
  ngOnInit() {
    this.getPipeLineGroups();
    let clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.getGender();
    this.currentDate = new Date();
    this.user = JSON.parse(localStorage.getItem("userDetail"));
    let dealData = new Deal();
    this.getUsers();
    this.getStepTypesData();
    this.getRecurrenceEvents();
    
    dealData = this.dataShared.getValue();
    if (dealData) {
      this.deal = dealData;
      this.getLeadById(this.deal.LeadId);
      this.entityId = this.deal.DealId;
      this.entityNumber = this.deal.DealId.toString();
      //this.populateCustomFields(this.lead.LeadId);
      this.getDealContacts(this.deal.DealId, this.entityType);
      this.getContactInformation();
      this.getUserInformation();
      
      this.getPipeLine(this.deal.PipelineGroupId);
      this.LoadNotes(this.deal.DealId, LeadGenType.Deal);

    }
    else {
      this.router.navigate(['/listdeals']);
    }
    this.generateHours();
    this.loggedUser = JSON.parse(localStorage.getItem("userDetail"));
    this.ownerName = this.loggedUser.User.FirstName;
  }
  getRecurrenceEvents() {
    this.calendarService.getRecurrenceEvents().subscribe(data => {
      if (data) {
        data.forEach(recurrence => {
          switch (recurrence.RecurrenceTypeId) {
            case 1:
              this.recurringEvents.push({
                color: recurrence.EventColor,
                title: recurrence.EventName,
                start: recurrence.EventStartDate,
                end: recurrence.EventEndDate,
                timestart: recurrence.RecurrenceStartTime,
                timeend: recurrence.RecurrenceEndTime,
                rrule: {
                  freq: RRule.DAILY
                }
              });
              break;
            case 2:
              this.recurringEvents.push({
                color: recurrence.EventColor,
                title: recurrence.EventName,
                start: recurrence.EventStartDate,
                end: recurrence.EventEndDate,
                timestart: recurrence.RecurrenceStartTime,
                timeend: recurrence.RecurrenceEndTime,
                rrule: {
                  freq: RRule.WEEKLY,
                  byweekday: [RRule.MO, RRule.WE]
                }
              });
              break;
            case 3:
              this.recurringEvents.push({
                color: recurrence.EventColor,
                title: recurrence.EventName,
                start: recurrence.EventStartDate,
                end: recurrence.EventEndDate,
                timestart: recurrence.RecurrenceStartTime,
                timeend: recurrence.RecurrenceEndTime,
                rrule: {
                  freq: RRule.MONTHLY,
                  bymonthday: new Date(recurrence.RecursOn).getDay()
                }
              });
              break;
            case 4:
              this.recurringEvents.push({
                color: recurrence.EventColor,
                title: recurrence.EventName,
                start: recurrence.EventStartDate,
                end: recurrence.EventEndDate,
                timestart: recurrence.RecurrenceStartTime,
                timeend: recurrence.RecurrenceEndTime,
                rrule: {
                  freq: RRule.YEARLY,
                  bymonth: new Date(recurrence.RecurrenceStartDate).getMonth() + 1,
                  bymonthday: new Date(recurrence.RecurrenceStartDate).getDay()
                }
              });
              break;
          }
        });
      }
    });
  }
  async getDrive(): Promise<void> {
    await this.graphService.getDrive().then(x => {
    }, err => {
    });
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
        this.selectedPipeIndex = this.listofPipeline.findIndex(x => x.PipelineId == this.deal.PipelineId);
        if (this.selectedPipeIndex == -1) {
          this.selectedPipeIndex = 0;
          this.deal.PipelineId = this.listofPipeline[this.selectedPipeIndex].PipelineId;
        }
      });
    }
    
  }

  getPipeLineGroupName(id) {
    if (id) {
      if (this.listPipeLineGroup) {
        var name = this.listPipeLineGroup.find(x => x.PipelineGroupId == id).Name;
        return name;
      }
    }
    
  }

  getPipeLineName(id) {
    if (id) {
      if (this.listofPipeline) {
        var name = this.listofPipeline.find(x => x.PipelineId == id).Name;
        return name;
      }
    }
    
  }

  sortBy(prop: string) {
    return this.listofPipeline ? this.listofPipeline.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1) : [];
  }

  changeFormatDate(date) {
    if (date) {
      if (Object.prototype.toString.call(date) === "[object Date]")
        return date.getFullYear() + '-' + (date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? ('0' + (date.getDate())) : (date.getDate())) + 'T' + (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
      else {
        let clonedDate = new Date(date);
        return clonedDate.getFullYear() + '-' + (clonedDate.getMonth() < 10 ? ('0' + (clonedDate.getMonth() + 1)) : clonedDate.getMonth() + 1) + '-' + (clonedDate.getDate() < 10 ? ('0' + (clonedDate.getDate())) : (clonedDate.getDate())) + 'T' + (clonedDate.getHours() < 10 ? ('0' + clonedDate.getHours()) : clonedDate.getHours()) + ':' + (clonedDate.getMinutes() < 10 ? ('0' + clonedDate.getMinutes()) : clonedDate.getMinutes());
      }
      //return returnDate;
    }
  }
  bindNotes(Notes, dealcontact, index) {
    if (Notes) {
      let newNotes = Notes;
      if (newNotes.includes('^|^')) {
        return newNotes.split('^|^')[0].split('|~data~|')[2];
      }
      else {
        if (newNotes.includes('|~data~|')) {
          return newNotes.split('|~data~|')[2];
        }
        return Notes;
      }
    }

  }
  chooseDate() {
    if (this.calendarFor == 'contact') {
      this.selectedDealContact.StartDate = this.chooseStartDate;
      this.selectedDealContact.EndDate = this.chooseEndDate;
    }
    if (this.calendarFor == 'nextstep') {
      this.nextStepDealContact.CreatedOn = this.chooseStartDate;
    }
    this.calendarToggle = false;
  }
  dayClicked({ date, events }: { date: Date; events: SfCalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      let endDate = this.viewDate;
      let endDateCloned = new Date(endDate);
      endDateCloned.setHours(23);
      endDateCloned.setMinutes(59);
      this.chooseEndDate = endDateCloned;
    }
  }
  getGender() {
    this.addUserService.getgender().subscribe(data => {
      this.listGender = data;
    });
  }

  checkValidation(obj) {
    if (obj)
      return obj.invalid && (obj.dirty || obj.touched);
    else
      return false;
  }
  hourSegmentClicked(evt) {
    this.addEventDate = evt.date;
    //let startDate = this.addEventDate;
    //let startDateClone = new Date(startDate);
    let endDate = this.addEventDate;
    let endDateCloned = new Date(endDate);
    endDateCloned.setMinutes(endDate.getMinutes() + 30);
    this.chooseEndDate = endDateCloned;
  }
  checkReqValidation(obj) {
    if (obj)
      return obj.invalid;
    else
      return false;
  }

  viewNotes(dealContact) {
    if (dealContact.Notes && dealContact.Notes != null) {
      this.viewNoteDetails = dealContact.Notes;
      if (this.viewNoteDetails.includes('^|^')) {
        this.listViewNotes = this.viewNoteDetails.split('^|^');
      }
      else {
        this.listViewNotes.push(this.viewNoteDetails);
      }
    }
    else {
      this.listViewNotes = [];
    }
    this.notesToggle = true;
  }

  closenotesToggle() {
    this.listViewNotes = [];
    this.notesToggle = false;
  }

  editContactInfoPopup() {
    if (this.editContactInfo.Id > 0) {
      this.contactInfo = this.editContactInfo;
      this.toggle = true;
    }
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

  addCalendar() {
    this.navigate('sfcalendarmodal', true)
  }
  UpdateContactNextStep(dealContactNextStep) {
    if (dealContactNextStep) {
      dealContactNextStep.DealId = this.deal.DealId;
      this.contactService.addContactNextStep(dealContactNextStep, this.nextStepDealContact.Id).subscribe(data => {
        if (data) {
          dealContactNextStep = data;
          dealContactNextStep.IsSaved = true;
          this.noty.ShowNoty("Saved successfully!");
        }
      }, err => { }, () => { });
    }
  }
  openNextStep(dealContact) {
    if (dealContact.Id) {
      if (dealContact.nextStepToggle) {
        this.isNextStep = false;
        this.iconToggle = false;
      }
      else {
        //this.toggleAllNextSteps();
        this.dealContactNextStepToggle(dealContact);
        this.nextStepDealContact = dealContact;
      }
      dealContact.nextStepToggle = !dealContact.nextStepToggle;
      if (this.dealContacts.filter(x => x.nextStepToggle == false).length == 0) {
        this.iconToggle = true;
      }
    }
    else {
      this.noty.ShowNoty("Next step not available!");
    }
  }

  toggleAllNextSteps(iconStatus) {
    this.dealContacts.forEach(x => {
      if (iconStatus) {
        x.nextStepToggle = false;
        this.iconToggle = false;
      }
      else {
        x.nextStepToggle = true;
        this.iconToggle = true;
      }
    });
  }

  addDealContect() {
    this.currentDate = new Date();
    this.addDisabled = true;
    if (this.dealContacts.length != 0) {
      let dealContactCopy = JSON.stringify(this.dealContacts[this.dealContacts.length - 1]);
      let dealContactClone = <DealContact>JSON.parse(dealContactCopy);
      dealContactClone.Notes = "";
      dealContactClone.Id = 0;
      dealContactClone.CompletedStatusId = -1;
      dealContactClone.AssignedTo = this.user.User.UserId;
      dealContactClone.SalesMan = this.user.User.UserId;
      dealContactClone.IsSaved = false;
      //dealContactClone.DealContactNextStep = new DealContactNextStep();
      //dealContactClone.DealContactNextStep.IsSaved = false;
      this.dealContacts.push(dealContactClone);
      this.getContactInfoById(dealContactClone.ContactId, dealContactClone);
    }
    else {
      let cloned = new DealContact();
      //cloned.DealContactNextStep = new DealContactNextStep();
      cloned.IsSaved = false;
      //cloned.DealContactNextStep.IsSaved = false;
      cloned.AssignedTo = this.user.User.UserId;
      cloned.SalesMan = this.user.User.UserId;
      this.dealContacts.push(cloned);
    }
  }
  getContactInfoById(id, DealContact) {
    if (id > 0) {
      let selectedContactInfo = this.contactInformations.find(x => x.Id == id);
      //DealContact.CalendarInviteType = -1;
      if (selectedContactInfo) {
        DealContact.ContactTitle = selectedContactInfo.ContactTitle;
        DealContact.CellNumber = selectedContactInfo.CellNumber;
        DealContact.OfficeNumber = selectedContactInfo.OfficeNumber;
        DealContact.Email = selectedContactInfo.Email;
        DealContact.ZoomId = "";
        this.editContactInfo = selectedContactInfo;
      }
    }
    else {
      //DealContact.CalendarInviteType = -1;
      DealContact.ContactTitle = "";
    }
  }
  getNextStepInfoById(id, DealContactNextStep) {
    if (id > 0) {
      let selectedContactInfo = this.contactInformations.find(x => x.Id == id);
      //DealContact.CalendarInviteType = -1;
      if (selectedContactInfo) {
        DealContactNextStep.ContactTitle = selectedContactInfo.ContactTitle;
        DealContactNextStep.CellNumber = selectedContactInfo.CellNumber;
        DealContactNextStep.OfficeNumber = selectedContactInfo.OfficeNumber;
        DealContactNextStep.Email = selectedContactInfo.Email;
        DealContactNextStep.ZoomId = "";
        this.editContactInfo = selectedContactInfo;
      }
    }
    else {
      //DealContact.CalendarInviteType = -1;
      DealContactNextStep.ContactTitle = "";
    }
  }

  editLead(lead) {
    this.dataShared.setPermissionBaseValue("6.5.8")
    this.dataShared.setValue(lead);
    this.navigate('addleadsmodal', true);
    //this.router.navigate(['/addleads']);
  }
  OpenCalendarPopup(dealContact) {
    this.selectedDealContact = dealContact;
    this.calendarToggle = true;
  }
  closeCalendarToggle() {
    this.calendarToggle = false;
  }
  addNewNote(dealContactId) {
    this.addNoteToggle = true;
    this.dealContactId = dealContactId;
  }
  closeNewNote() {
    this.addNoteToggle = false;
    this.dealContactId = null;
    this.newNote = '';
  }
  SaveNewNote() {
    if (this.dealContactId && this.newNote) {
      this.contactService.UpdateDealContactNote(this.dealContactId, this.newNote).subscribe(data => {
        if (data) {
          let objIndex = this.dealContacts.findIndex((obj => obj.Id == data.Id));
          this.dealContacts[objIndex].Notes = data.Notes;
          this.closeNewNote();
          this.noty.ShowNoty("Saved successfully!");
        }
      }, err => { }, () => { });
    }
  }
  //changeFormatDate(date) {
  //  if (date)
  //    return date.split(':')[0] + ':' + date.split(':')[1];
  //}

  getLeadById(leadId) {
    if (leadId) {
      this.leadService.getLeadById(leadId).subscribe(data => {
        this.lead = data;
      });
    }
    
  }

  closeToggle() {
    this.selectedContact = null;
    this.toggle = false;
  }

  cancelReasonToggle() {
    this.deal.CancelReason = '';
    this.reasonToggle = false;
  }

  addNewOpportunity() {
    this.navigate('adddealsmodal', true);
    //[outlets : { modal: ['/adddeals'] }]
  }
  //DealContactChange(dealContactId) {
  //  if (dealContactId > 0) {
  //    this.selectedDealContact = this.dealContacts.find(x => x.Id == dealContactId);
  //    if (this.selectedDealContact.AssignedTo)
  //      this.getUserNameById(this.selectedDealContact.AssignedTo);
  //  }
  //}
  timeCostUserChange(dealContact, userId) {
    if (userId) {
      this.timeCostUser = this.Users.find(x => x.UserId == userId);
      dealContact.timecost.Skill = this.timeCostUser.Skills;
      dealContact.timecost.Cost = this.timeCostUser.CostPerHour;
      //dealContact.timecost = this.timecost;
    }
  }
  clearSelectedContact() {
    this.selectedContact = null;
    this.contactInfo = new Contactinformation();
  }
  addNewContact() {
    this.selectedContact = null;
    this.contactInfo = new Contactinformation();
    this.toggle = true;
  }
  contactSearch(evt) {
    if (evt.target.value.length > 2) {
      this.contactService.getContactsByName(evt.target.value).subscribe(data => {
        this.ContactDetails = data;
      }, err => {
        this.ContactDetails = [];
      }, () => { });
    }
    else {
      this.ContactDetails = [];
    }
  }
  UpdateStatus(statusId) {
    if (statusId && (statusId == 3 || statusId == 4)) {
      this.dataShared.setValue(statusId);
      this.reasonToggle = true;
    }
    else if (statusId && statusId == 1) {
      this.wonToggle = true;
    }
    else {
      this.dealService.updateStatusId(this.deal.DealId, statusId).subscribe(data => {
        if (data) {
          this.deal = data;
          this.noty.ShowNoty("Deal status updated !!!");
        }
      }, err => { }, () => { });
    }
  }

  saveCancelReason() {
    this.deal.StatusId = this.dataShared.getValue();
    this.listDealService.saveCancelReason(this.deal).subscribe(data => {
      this.reasonToggle = false;
      this.noty.ShowNoty("Updated successfully!");
    }, err => { }, () => { });
  }

  getStepTypesData() {
    this.calendarService.getStepTypesData().subscribe(data => {
      if (data)
        this.stepTypes = data;
      this.getTodoEvents();
    }, err => { }, () => { });
  }
  getTodoEvents() {
    this.calendarService.calendarEvents().subscribe(data => {
      if (data) {
        let arrEvents = Array<SfCalendarEvent>();
        this.todoList = data.Item1;
        for (let i = 0; i < this.todoList.length; i++) {
          arrEvents.push({
            id: this.todoList[i].Id,
            actionType: "todo",
            start: new Date(this.todoList[i].StartDate),
            end: new Date(this.todoList[i].EndDate),
            title: "Todo : " + this.todoList[i].TodoName,
            color: {
              primary: (this.todoList[i].Color ? this.todoList[i].Color : '#e797ad'),
              secondary: (this.todoList[i].Color ? this.todoList[i].Color : '#f7dce4')
            },
            draggable: true,
            officeData: null,
            resizable: {
              beforeStart: true, // this allows you to configure the sides the event is resizable from
              afterEnd: true,
            }
          });
        }
        this.listDealContactEvents = data.Item2;
        for (let i = 0; i < this.listDealContactEvents.length; i++) {
          let listofStepType = this.stepTypes.find(x => x.DropDownId == this.listDealContactEvents[i].StepTypeId);
          if (listofStepType) {
            let stepType = listofStepType.DropDownName;
            arrEvents.push({
              id: this.listDealContactEvents[i].Id,
              actionType: "deal",
              start: new Date(this.listDealContactEvents[i].StartDate),
              end: new Date(this.listDealContactEvents[i].EndDate),
              title: "Opportunity : " + stepType + " " + (this.listDealContactEvents[i].ContactName ? this.listDealContactEvents[i].ContactName : ''),
              color: {
                primary: (this.listDealContactEvents[i].Color ? this.listDealContactEvents[i].Color : '#e797ad'),
                secondary: (this.listDealContactEvents[i].Color ? this.listDealContactEvents[i].Color : '#f7dce4')
              },
              draggable: true,
              officeData: null,
              resizable: {
                beforeStart: true, // this allows you to configure the sides the event is resizable from
                afterEnd: true,
              }
            });
          }
        }
        this.events = arrEvents;
        this.recurringEvents.forEach((event) => {
          let startHour = parseInt(event.timestart.toString().split(':')[0]);
          let startMinutes = parseInt(event.timestart.toString().split(':')[1]);
          let startSeconds = parseInt(event.timestart.toString().split(':')[2]);
          let endHour = parseInt(event.timeend.toString().split(':')[0]);
          let endMinutes = parseInt(event.timeend.toString().split(':')[1]);
          let endSeconds = parseInt(event.timeend.toString().split(':')[2]);
          let startDate = new Date(new Date(event.start).setUTCHours(startHour, startMinutes, startSeconds));
          let endDate = new Date(new Date(event.end).setUTCHours(endHour, endMinutes, endSeconds));
          //let startHour: number = isNaN(event.timestart.hour) ? parseInt(event.timestart.hour) : event.timestart.hour;
          const rule: RRule = new RRule({
            ...event.rrule,
            dtstart: startDate,
            //interval: 1,
            until: endDate,
          });
          const { title, color } = event;
          rule.all().forEach((date) => {
            this.events.push({
              title,
              color,
              start: moment(date).local(true).toDate(),
              end: moment(date.setUTCHours(date.getUTCHours() + 2)).local(true).toDate(),
              officeData: null
            });
          });
        });
      }
    }, err => { }, () => { });
  }
  UpdateTodoSchedule(id, todoSchedule) {
    if (id) {
      this.calendarService.UpdateTodoSchedule(id, todoSchedule).subscribe(data => {
        if (data) {

        }
      }, err => { }, () => { });
    }
  }
  UpdateOppStepsSchedule(id, eventSchedule) {
    if (id) {
      this.calendarService.UpdateOppStepsSchedule(id, eventSchedule).subscribe(data => {
        if (data) {

        }
      }, err => { }, () => { });
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    //switch (event.actionType) {
    //  case 'deal':
    //    let dealSchedule = new EventSchedule();
    //    dealSchedule.start = newStart.toLocaleString();
    //    dealSchedule.end = newEnd.toLocaleString();
    //    this.UpdateOppStepsSchedule(event.id, dealSchedule);
    //    break;
    //  case 'todo':
    //    let todoSchedule = new EventSchedule();
    //    todoSchedule.start = newStart.toLocaleString();
    //    todoSchedule.end = newEnd.toLocaleString();
    //    this.UpdateTodoSchedule(event.id, todoSchedule);
    //    break;
    //  default:
    //    this.chooseStartDate = newStart;
    //    this.chooseEndDate = newEnd;
    //    break;
    //}
    this.refresh.next();
  }

  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {

    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          const dragToSelectEvent: SfCalendarEvent = {
            color: {
              primary: '#CCCCCC',
              secondary: '#82c2cf'
            },
            actionType: "newevent",
            officeData: null,
            id: this.events.length,
            title: 'New',
            start: this.chooseStartDate,
            end: this.chooseEndDate,
            meta: {
              tmpEvent: true,
            },
            draggable: true,
            resizable: {
              beforeStart: true, // this allows you to configure the sides the event is resizable from
              afterEnd: true,
            }
          };
          this.events = [...this.events, dragToSelectEvent];
          let lastId = this.events.reverse().find(f => f.actionType == 'newevent').id
          let newEvent = this.events.filter(item => item.actionType == 'newevent' && item.id == lastId);
          if (newEvent.length > 0) {
            this.events = this.events.filter(item => item.actionType != 'newevent');
            this.events.push(newEvent[0]);
          }

          this.dragToCreateActive = false;
          //this.refresh();
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = this.ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );

        const daysDiff =
          this.floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;
        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          this.chooseStartDate = segment.date;
          this.chooseEndDate = newEnd;
        }
      });
  }

  floorToNearest(amount: number, precision: number) {
    return Math.floor(amount / precision) * precision;
  }

  ceilToNearest(amount: number, precision: number) {
    return Math.ceil(amount / precision) * precision;
  }

  saveContactInfo(contactInfo) {
    contactInfo.Type = LeadGenType.Deal;
    contactInfo.EntityId = this.deal.DealId;
    if (!contactInfo.Id) {
      this.contactService.addContactInfo(contactInfo).subscribe(data => {
        if (data) {
          this.selectedContact = null;
          //this.getDealContacts(this.deal.DealId);
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
          //this.getDealContacts(this.deal.DealId);
          this.getContactInformation();
          this.toggle = false;
          this.noty.ShowNoty("Contact information saved !!!");
        }
      }, err => { }, () => { });
    }
  }
  dealContactNextStepToggle(dealContact) {
    if (dealContact.Id > 0) {
      this.contactService.getDealContactNextStep(dealContact.Id).subscribe(data => {
        if (data) {
          this.nextStepInformation = data;
          this.nextStepInformation.IsSaved = true;
          this.isNextStep = true;
        }
        else {
          this.nextStepInformation = new DealContactNextStep();
          this.nextStepInformation.CreatedOn = new Date();
          this.nextStepInformation.IsSaved = false;
          this.isNextStep = true;
        }
      }, err => { }, () => { });
    }
    else {
      this.nextStepInformation = new DealContactNextStep();
      this.nextStepInformation.CreatedOn = new Date();
      this.nextStepInformation.IsSaved = false;
      this.isNextStep = true;
    }
  }

  SaveTimeCost(timecost) {
    this.contactService.SaveTimeCost(timecost, this.nextStepDealContact.Id).subscribe(data => {
      if (data) {
        //this.selectedContact = null;
        //this.getDealContacts(this.deal.DealId);
        //this.toggle = false;
        this.noty.ShowNoty("Time cost saved !!!");
      }
    }, err => { }, () => { });
  }
  SaveMaterialCost(materialcost) {
    this.contactService.SaveMaterialCost(materialcost, this.nextStepDealContact.Id).subscribe(data => {
      if (data) {
        //this.selectedContact = null;
        //this.getDealContacts(this.deal.DealId);
        //this.toggle = false;
        this.noty.ShowNoty("Material cost saved !!!");
      }
    }, err => { }, () => { });
  }

  getDealContacts(entityId, entityType) {
    if (entityId) {
      this.contactService.getDealContacts(entityId, entityType).subscribe(data => {
        if (data != null) {
          this.dealContacts = data;
          for (let i = 0; i < this.dealContacts.length; i++) {
            if (this.dealContacts[i].Id > 0) {
              this.dealContacts[i].IsSaved = true;
            }
          }
        }
      }, err => { }, () => { });
    }
  }

  getMaterialCost(dealContact) {
    if (this.nextStepDealContact.Id > 0) {
      this.contactService.GetMaterialCost(dealContact.Id).subscribe(data => {
        if (data) {
          dealContact.materialcosts = [];
          dealContact.materialcosts = data;
          dealContact.timecosts.push(new Materialcost());
        }
        else {
          dealContact.materialcosts = [];
          dealContact.timecosts.push(new Materialcost());
        }
      }, err => { }, () => { });
    }
    else {
      dealContact.materialcosts = [];
      dealContact.timecosts.push(new Materialcost());
    }
  }

  getTimeCost(dealContact) {
    if (this.nextStepDealContact.Id > 0) {
      this.contactService.GetTimeCost(dealContact.Id).subscribe(data => {
        if (data) {
          dealContact.timecosts = [];
          dealContact.timecosts = data;
          dealContact.timecosts.push(new Timecost());
        }
        else {
          dealContact.timecosts = [];
          dealContact.timecosts.push(new Timecost());
        }
      }, err => { }, () => { });
    }
    else {
      dealContact.timecosts = [];
      dealContact.timecosts.push(new Timecost());
    }

  }
  UpdateDealContact(dealContact) {
    dealContact.DealId = this.deal.DealId;
    this.contactService.UpdateDealContact(dealContact).subscribe(data => {
      if (data) {
        this.selectedDealContact = data;
        //dealContact.IsSaved = true;
        //this.dealContacts.push(dealContact);
        this.getDealContacts(this.deal.DealId, this.entityType);
        this.addDisabled = false;
      }
      this.noty.ShowNoty("Deal information saved !!!");
    }, err => { }, () => { });
  }
  editDealFromDrag(deal, permission) {
    this.dataShared.setPermissionBaseValue(permission);
    this.dataShared.setValue(deal);
    this.navigate('adddealsmodal', true);
  }
  cancel() {
    this.dataShared.setEntityValue(this.entityType);
    this.dataShared.setValue(this.deal.PipelineGroupId);
    this.router.navigate(['/funnel']);
  }

  getCalendarInviteTypeName(id) {
    if (id) {
      var status = "";
      status = id == 1 ? "Zoom Id" : id == 2 ? "Cell Number" : id == 3 ? "Email" : id == 4 ? "Office Number" : "";
      return status;
    }
  }

  getContactInformation() {
    this.contactService.getContactInformation(LeadGenType.Deal, this.deal.DealId, false).subscribe(data => {
      if (data != null) {
        this.contactInformations = data;
        if (this.contactInformations.length == 1) {
          this.selectedContactInfo = this.contactInformations[0];
        }
      }
    }, err => { }, () => { });
  }
  getUserInformation() {
    if (this.deal.Owner) {
      this.userService.getUserById(this.deal.Owner).subscribe(data => {
        if (data != null) {
          this.owner = data;
        }
      }, err => { }, () => { });
    }
  }

  getUserNameById(userId) {
    if (userId) {
      this.userService.getUserById(userId).subscribe(data => {
        if (data != null) {
          this.selectedUser = data;
        }
      }, err => { }, () => { });
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.Users = data;
    }, err => {
      this.Users = [];
    }, () => { });

  }
  getOrganizationInformation(id) {
    if (id != 0 || id != null) {
      this.userService.GetOrganizationById(this.deal.OrganizationId).subscribe(data => {
        if (data != null) {
          this.organization = data;
        }
      }, err => { }, () => { });
    }
  }
  //addContact() {
  //  let contactInformation = new Contactinformation();
  //  contactInformation.ContactName = "Demo";
  //  this.contactInformations.push(contactInformation);
  //}
  openModal() {
    //this.modalService.show(AdddealsComponent)
  }
  generateHours() {
    var d = new Date(); //get a date object
    d.setHours(0, 0, 0, 0); //reassign it to today's midnight
    var date = d.getDate();
    var timeArr = [];
    while (date == d.getDate()) {
      let hours: any = d.getHours()
      let minute: any = d.getMinutes();
      hours = hours == 0 ? 12 : hours; //if it is 0, then make it 12
      var ampm = "am";
      ampm = hours > 12 ? "pm" : "am";
      hours = hours > 12 ? hours - 12 : hours; //if more than 12, reduce 12 and set am/pm flag
      hours = ("0" + hours).slice(-2); //pad with 0
      minute = ("0" + d.getMinutes()).slice(-2); //pad with 0
      timeArr.push(hours + ":" + minute + " " + ampm);
      d.setMinutes(d.getMinutes() + 120); //increment by 60 minutes
    }
    this.timeArr = timeArr;
  }
  LoadNotes(entityId, entityTypeId) {
    this.notesService.LoadNotes(entityId, entityTypeId).subscribe(data => {
      if (data) {
        this.notesInfos = data;
      }
    }, err => { }, () => { });
  }

  updateCalendarEvents(
    viewRender:
      | CalendarMonthViewBeforeRenderEvent
      | CalendarWeekViewBeforeRenderEvent
      | CalendarDayViewBeforeRenderEvent
  ): void {
    if (
      !this.viewPeriod ||
      !moment(this.viewPeriod.start).isSame(viewRender.period.start) ||
      !moment(this.viewPeriod.end).isSame(viewRender.period.end)
    ) {
      this.viewPeriod = viewRender.period;
      this.events = [];
      this.getTodoEvents();
      this.cdr.detectChanges();
    }
  }

  async signIn(): Promise<void> {
    if (!this.authenticated)
      await this.officeService.signIn();
    else {
    }
  }
  get authenticated(): boolean {
    return this.officeService.authenticated;
  }
  async signOut(): Promise<void> {
    await this.officeService.signOut();
  }
  async getCalendars(): Promise<void> {
    let calendars = await this.graphService.getCalendars();
  }




  saveWonAmount(evt) {
    if (evt) {
      this.deal = evt;
      this.noty.ShowNoty("Deal status updated !!!");
      this.wonToggle = false;      
    }
  }

  closeError() {
    this.wonToggle = false;
  }


}
