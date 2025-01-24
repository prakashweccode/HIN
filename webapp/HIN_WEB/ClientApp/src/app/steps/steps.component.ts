import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
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
import { PartCatalog } from '../model/addpartcatalog';
import { Services } from '../model/services';
moment.tz.setDefault('Utc');

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  public loConfig: any = {
    height: '',
    addButtonTitle: 'Add New',
    addButtonClass: 'custom-list-btn-one',
    selectClass: 'custom-list-select-one',
    displayField: 'Description',
    placeholder: 'select',
    editButtonTitle: 'Edit',
    editButtonClass: 'custom-list-btn-one',
    addButtonText: '',
    editButtonText: '',
    addButtonIconClass: 'fa fa-plus',
    editButtonIconClass: 'fa fa-pencil',
  };
  @Input() entityType: number;
  @Input() entityId: number;
  @Input() useCustomApi: boolean;
  @Input() disableSalesMan: boolean;
  @Input() getApi: string;
  @Input() PostApi: string;
  public loEntity: number;  
  iconToggle: boolean = false;
  dragToCreateActive = false;
  weekStartsOn: 0 = 0;
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
  public lstService: Array<Services> = [];
  public dealContactNextSteps: Array<DealContactNextStep> = [];
  selectedDealContact = new DealContact();
  toggle: boolean = false;
  addDisabled: boolean = false;
  calendarToggle: boolean = false;
  selectedContact: Contactinformation;
  ContactDetails: Array<Contactinformation> = [];
  contactInfo: Contactinformation = new Contactinformation();
  //timecost: Array<Timecost> = [];
  //materialcost: Array<Materialcost> = [];
  deal: Deal = new Deal();
  activeContainer: string = "tab1";
  owner: Users;
  organization: Organization;
  dealContact: DealContact = new DealContact();
  selectedContactInfo: Contactinformation = new Contactinformation();
  calendarContainer: string = "tab1";
  costContainer: string = "tab2";
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
  stepTypes: Array<Customdropdown> = [];
  editContactInfo: Contactinformation = new Contactinformation();
  public todoList: Array<Todo> = [];
  public listDealContactEvents: Array<DealContact> = [];
  public isNextStep: boolean = false;
  public products: Array<PartCatalog> = [];
  constructor(private cdr: ChangeDetectorRef, private calendarService: SfcalendarService, public router: Router, public leadService: AddleadsService, public dealService: ListdealsService, public dataShared: Datashared, public noty: NotyHelper, private contactService: ContactinformationService, private userService: UsersService, private modalService: ModalService, public zone: NgZone, public addUserService: AdduserService, private notesService: NotesinfoService, private graphService: GraphService, private officeService: AuthService) { }

  ngOnInit() {
    this.loEntity = this.entityType == 29 ? 3 : 1;
    let clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.getGender();
    this.currentDate = new Date();
    this.user = JSON.parse(localStorage.getItem("userDetail"));
    let dealData = new Deal();
    this.getUsers();
    this.getProducts();
    this.getStepTypesData();
    this.getRecurrenceEvents();
    //this.entityId = this.deal.DealId;
    this.getDealContacts(this.entityId, this.entityType);
    this.getContactInformation();
    this.getUserInformation();
    this.LoadNotes(this.entityId, this.entityType);
    this.generateHours();
    this.loggedUser = JSON.parse(localStorage.getItem("userDetail"));
    this.ownerName = this.loggedUser.User.FirstName;
  }

  editSteps() {
    this.dealContacts.forEach(_x => {
      _x.IsSaved = false;
      _x.nextStep.IsSaved = false;
    });
  }

  selectedPreActionNote(evt, dealContact) {
    if (evt) {
      dealContact.QuickNotes = evt.Id;
      dealContact.Notes = evt.Description;
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

  navigate(path, ismodel) {
    if (ismodel) {
      this.modalService.show(null);
      this.router.navigate([{ outlets: { modal: [path] } }]);
    }
    else {
      this.router.navigate(['/' + path]);
    }
  }


  addNewVendor() {
    this.navigate('addvendormodal', true);
  }

  addNewLead() {
    this.navigate('addleadsmodal', true);
  }

  cancel() {
    this.router.navigate(['/funnel']);
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

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.Users = data;
    }, err => {
      this.Users = [];
    }, () => { });

  }
  getProducts() {
    this.notesService.GetProducts().subscribe(data => {
      this.products = data;
    }, err => {
      this.products = [];
    }, () => { });

  }
  populatePrice(evt, materialCost) {
    if (evt) {
      let selectedProduct = this.products.find(x => x.Id == evt.target.value);
      materialCost.Price = selectedProduct.SalesPrice;
    }
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

  getCalendarInviteTypeName(id) {
    if (id) {
      var status = "";
      status = id == 1 ? "Zoom Id" : id == 2 ? "Cell Number" : id == 3 ? "Email" : id == 4 ? "Office Number" : id == 5 ? "Other" : "";
      return status;
    }
  }

  getContactInformation() {
    this.contactService.getContactInformation(this.entityType, this.entityId, false).subscribe(data => {
      if (data != null) {
        this.contactInformations = data;
        if (this.contactInformations.length == 1) {
          this.selectedContactInfo = this.contactInformations[0];
        }
      }
    }, err => { }, () => { });
  }

  UpdateDealContact(dealContact) {
    dealContact.DealId = this.entityId;
    dealContact.EntityTypeId = this.entityType;
    this.contactService.UpdateDealContact(dealContact).subscribe(data => {
      if (data) {
        this.selectedDealContact = data;
        this.getDealContacts(this.entityId, this.entityType);
        //this.dealContactNextStepToggle(data);
        this.addDisabled = false;
      }
      this.noty.ShowNoty("Information saved successfully.");
    }, err => { }, () => { });
  }

  getMaterialCost(dealContact) {
    if (this.nextStepDealContact.Id > 0) {
      this.contactService.GetMaterialCost(dealContact.Id).subscribe(data => {
        if (data) {
          dealContact.materialcosts = [];
          dealContact.materialcosts = data;
          dealContact.materialcosts.push(new Materialcost());
        }
        else {
          dealContact.materialcosts = [];
          dealContact.materialcosts.push(new Materialcost());
        }
      }, err => { }, () => { });
    }
    else {
      dealContact.materialcosts = [];
      dealContact.materialcosts.push(new Materialcost());
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
  calculateTotalTimeCost(totalTime, cost) {
    if (totalTime && cost) {
      return (cost * (totalTime / 60));
    }
    else return 0;
  }
  getDealContacts(entityId, entityType) {
    if (entityId) {
      this.contactService.getDealContacts(entityId, entityType).subscribe(data => {
        if (data != null) {
          this.dealContacts = data;
          for (let i = 0; i < this.dealContacts.length; i++) {
            if (this.dealContacts[i].Id > 0) {
              this.dealContactNextStepToggle(this.dealContacts[i]);
              this.dealContacts[i].IsSaved = true;
            }
          }
        }
      }, err => { }, () => { });
    }
  }

  SaveTimeCost(timecost, dealContactId, timeCosts) {
    if (isNaN(timecost.Cost)) {
      timecost.Cost = 0;
    }
    else {
      timecost.Cost = Number.parseInt(timecost.Cost);
    }
    this.contactService.SaveTimeCost(timecost, dealContactId).subscribe(data => {
      if (data) {
        timecost = data;
        let newTimeCost = timeCosts.filter(x => x.Id == 0);
        if (newTimeCost.length == 0)
          timeCosts.push(new Timecost());
        this.noty.ShowNoty("Time cost saved !!!");
      }
      else
        this.noty.ShowNoty("Time cost saved !!!");
    }, err => { }, () => { });
  }
  SaveMaterialCost(materialcost, dealContactId, materialCosts) {
    if (isNaN(materialcost.Price)) {
      materialcost.Price = 0;
    }
    else {
      materialcost.Price = Number.parseInt(materialcost.Price);
    }
     
    this.contactService.SaveMaterialCost(materialcost, dealContactId).subscribe(data => {
      if (data) {
        materialcost = data;
        let newMaterialCost = materialCosts.filter(x => x.Id == 0);
        if (newMaterialCost.length == 0)
          materialCosts.push(new Materialcost());
        this.noty.ShowNoty("Material cost saved !!!");
      }
      else
        this.noty.ShowNoty("Material cost saved !!!");
    }, err => { }, () => { });
  }

  dealContactNextStepToggle(dealContact) {
    this.currentDate = new Date();
    if (dealContact.Id > 0) {
      dealContact.nextStep = new DealContactNextStep();
      this.nextStepDealContact = dealContact;
      this.contactService.getDealContactNextStep(dealContact.Id).subscribe(data => {
        if (data) {
          dealContact.nextStep = data;
          dealContact.nextStep.IsSaved = true;
          this.isNextStep = true;
        }
        else {
          dealContact.nextStep = new DealContactNextStep();
          dealContact.DealContactId = dealContact.Id;
          dealContact.nextStep.StartDate = new Date();
          let endDateClone = new Date();
          endDateClone.setMinutes(this.currentDate.getMinutes() + 30);
          dealContact.nextStep.EndDate = endDateClone;
          dealContact.nextStep.IsSaved = false;
          dealContact.nextStep.ContactId = dealContact.ContactId;
          dealContact.nextStep.AssignedTo = dealContact.AssignedTo;
          dealContact.nextStep.CalendarInviteType = dealContact.CalendarInviteType;
          dealContact.nextStep.ZoomId = dealContact.ZoomId;
          dealContact.nextStep.CellNumber = dealContact.CellNumber;
          dealContact.nextStep.Email = dealContact.Email;
          dealContact.nextStep.OfficeNumber = dealContact.OfficeNumber;
          dealContact.nextStep.Other = dealContact.Other;
          dealContact.nextStep.Salesman = dealContact.Salesman;
          dealContact.nextStep.StatusId = dealContact.StatusId;
          this.isNextStep = true;
        }
      }, err => { }, () => { });
    }
    else {
      dealContact.nextStep = new DealContactNextStep();
      dealContact.nextStep.StartDate = new Date();
      let endDateClone = new Date();
      endDateClone.setMinutes(this.currentDate.getMinutes() + 30);
      dealContact.nextStep.EndDate = endDateClone;
      dealContact.nextStep.IsSaved = false;
      this.isNextStep = true;
    }
  }

  saveContactInfo(contactInfo) {
    contactInfo.Type = this.entityType;
    contactInfo.EntityId = this.entityId;
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

  timeCostUserChange(timeCost, evt) {
    if (evt) {
      let selectedOptions = evt.target['options'];
      let selectedIndex = selectedOptions.selectedIndex;
      let selectElementText = selectedOptions[selectedIndex].text;
      this.timeCostUser = this.Users.find(x => x.UserId == evt.target.value);
      timeCost.Skill = this.timeCostUser.Skills;
      timeCost.Cost = this.timeCostUser.CostPerHour;
      timeCost.Name = evt.target.value;
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
    this.dealService.updateStatusId(this.entityId, statusId).subscribe(data => {
      if (data) {
        this.deal = data;
        this.noty.ShowNoty("Deal status updated !!!");
      }
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
            //cssClass: 'w3-secondary w3-round-large w3-text-white',
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
              id: this.listDealContactEvents[i].DealId,
              actionType: "deal",
              start: new Date(this.listDealContactEvents[i].StartDate),
              end: new Date(this.listDealContactEvents[i].EndDate),
              title: "Opportunity : " + stepType + " " + (this.listDealContactEvents[i].ContactName ? this.listDealContactEvents[i].ContactName : ''),
              color: {
                primary: (this.listDealContactEvents[i].Color ? this.listDealContactEvents[i].Color : '#e797ad'),
                secondary: (this.listDealContactEvents[i].Color ? this.listDealContactEvents[i].Color : '#f7dce4')
              },
              //cssClass: 'w3-primary w3-round-large w3-text-white',
              draggable: true,
              officeData: null,
              resizable: {
                beforeStart: true, // this allows you to configure the sides the event is resizable from
                afterEnd: true,
              }
            });
          }
        }
        this.dealContactNextSteps = data.Item3 ? data.Item3 : [];
        for (let i = 0; i < this.dealContactNextSteps.length; i++) {
          let listOfStepType = this.stepTypes.find(x => x.DropDownId == this.dealContactNextSteps[i].StepTypeId);
          if (listOfStepType) {
            let stepType = listOfStepType.DropDownName;
            arrEvents.push({
              id: this.dealContactNextSteps[i].DealId,
              actionType: "deal",
              start: new Date(this.dealContactNextSteps[i].StartDate),
              end: new Date(this.dealContactNextSteps[i].EndDate),
              title: "Opportunity : " + stepType + " " + (this.dealContactNextSteps[i].ContactName ? this.dealContactNextSteps[i].ContactName : ''),
              color: {
                primary: (this.dealContactNextSteps[i].ColorCode ? this.dealContactNextSteps[i].ColorCode : '#e797ad'),
                secondary: (this.dealContactNextSteps[i].ColorCode ? this.dealContactNextSteps[i].ColorCode : '#f7dce4')
              },
              //cssClass: 'w3-primary w3-round-large w3-text-white',
              draggable: true,
              officeData: null,
              resizable: {
                beforeStart: true, // this allows you to configure the sides the event is resizable from
                afterEnd: true,
              }
            });
          }
          //let stepType = this.stepTypes.find(x => x.DropDownId == this.dealContactNextSteps[i].StepTypeId).DropDownName;

        }
        this.lstService = data.Item4 ? data.Item4 : [];
        for (let i = 0; i < this.lstService.length; i++) {
          //let listOfStepType = this.stepTypes.find(x => x.DropDownId == this.dealContactNextSteps[i].StepTypeId);
          //if (listOfStepType) {
          //let stepType = listOfStepType.DropDownName;
          arrEvents.push({
            id: this.lstService[i].Id,
            actionType: "service",
            start: new Date(this.lstService[i].StartDate),
            end: new Date(this.lstService[i].EndDate),
            title: "Service : " + (this.lstService[i].ServiceName ? this.lstService[i].ServiceName : ''),
            color: {
              primary: (this.lstService[i].Color ? this.lstService[i].Color : '#e797ad'),
              secondary: (this.lstService[i].Color ? this.lstService[i].Color : '#f7dce4')
            },
            //cssClass: 'w3-primary w3-round-large w3-text-white',
            draggable: true,
            officeData: null,
            resizable: {
              beforeStart: true, // this allows you to configure the sides the event is resizable from
              afterEnd: true,
            }
          });
          //}
          //let stepType = this.stepTypes.find(x => x.DropDownId == this.dealContactNextSteps[i].StepTypeId).DropDownName;

        }
        this.events = arrEvents;
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


  addDealContect() {
    this.currentDate = new Date();
    this.addDisabled = true;
    if (this.dealContacts.length != 0) {
      let dealContactCopy = JSON.stringify(this.dealContacts[this.dealContacts.length - 1]);
      let dealContactClone = <DealContact>JSON.parse(dealContactCopy);
      dealContactClone.Notes = "";
      dealContactClone.QuickNotes = null;
      dealContactClone.Id = 0;
      dealContactClone.CompletedStatusId = 3;
      dealContactClone.AssignedTo = this.user.User.UserId;
      dealContactClone.SalesMan = this.user.User.UserId;
      dealContactClone.IsSaved = false;
      dealContactClone.StartDate = this.currentDate;
      let endDateClone = new Date();
      endDateClone.setMinutes(this.currentDate.getMinutes() + 30);
      dealContactClone.EndDate = endDateClone;
      this.dealContacts.push(dealContactClone);
      this.getContactInfoById(dealContactClone.ContactId, dealContactClone);
    }
    else {
      let cloned = new DealContact();
      cloned.IsSaved = false;
      cloned.CompletedStatusId = 3;
      cloned.AssignedTo = this.user.User.UserId;
      cloned.SalesMan = this.user.User.UserId;
      cloned.StartDate = this.currentDate;
      let endDateClone = new Date();
      cloned.QuickNotes = null;
      endDateClone.setMinutes(this.currentDate.getMinutes() + 30);
      cloned.EndDate = endDateClone;
      this.dealContacts.push(cloned);
    }
  }
  getContactInfoById(id, DealContact) {
    if (id > 0) {
      let selectedContactInfo = this.contactInformations.find(x => x.Id == id);
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
      DealContact.ContactTitle = "";
    }
  }
  getNextStepInfoById(id, DealContactNextStep) {
    if (id > 0) {
      let selectedContactInfo = this.contactInformations.find(x => x.Id == id);
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
      DealContactNextStep.ContactTitle = "";
    }
  }


  OpenCalendarPopup(data, calendarFor) {
    if (calendarFor == 'contact')
      this.selectedDealContact = data;
    else
      this.nextStepInformation = data;
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

  getLeadById(leadId) {
    this.leadService.getLeadById(leadId).subscribe(data => {
      this.lead = data;
    });
  }

  closeToggle() {
    this.selectedContact = null;
    this.toggle = false;
  }

  addCalendar() {
    this.navigate('sfcalendarmodal', true)
  }
  UpdateContactNextStep(dealContactNextStep) {
    if (dealContactNextStep) {
      dealContactNextStep.DealId = this.entityId;
      this.contactService.addContactNextStep(dealContactNextStep, this.nextStepDealContact.Id).subscribe(data => {
        if (data) {
          dealContactNextStep = data;
          dealContactNextStep.IsSaved = true;
          this.nextStepInformation = dealContactNextStep;
          this.noty.ShowNoty("Saved successfully!");
        }
      }, err => { }, () => { });
    }
  }
  openNextStep(dealContact) {
    if (dealContact.Id) {
      this.getTimeCost(dealContact);
      if (dealContact.nextStepToggle) {
        this.isNextStep = false;
        this.iconToggle = false;
      }
      else {
        //dealContact.nextStep = new DealContactNextStep();
        //dealContact.nextStep.CreatedOn = new Date();
        //this.dealContactNextStepToggle(dealContact);
        //this.nextStepDealContact = dealContact;
      }
      dealContact.nextStepToggle = !dealContact.nextStepToggle;
      if (this.dealContacts.filter(x => x.nextStepToggle == false).length == 0) {
        this.iconToggle = true;
      }
    }
    else {
      this.noty.ShowNoty("Information not available!");
    }
  }

  editContactInfoPopup() {
    if (this.editContactInfo.Id > 0) {
      this.contactInfo = this.editContactInfo;
      this.toggle = true;
    }
  }


  changeFormatDate(date) {
    date = date ? date : new Date();
    if (date) {
      if (Object.prototype.toString.call(date) === "[object Date]")
        return date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? ('0' + (date.getDate())) : (date.getDate())) + 'T' + (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
      else {
        let clonedDate = new Date(date);
        return clonedDate.getFullYear() + '-' + ((clonedDate.getMonth() + 1) < 10 ? ('0' + (clonedDate.getMonth() + 1)) : clonedDate.getMonth() + 1) + '-' + (clonedDate.getDate() < 10 ? ('0' + (clonedDate.getDate())) : (clonedDate.getDate())) + 'T' + (clonedDate.getHours() < 10 ? ('0' + clonedDate.getHours()) : clonedDate.getHours()) + ':' + (clonedDate.getMinutes() < 10 ? ('0' + clonedDate.getMinutes()) : clonedDate.getMinutes());
      }
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

  bindNextStepNotes(Notes) {
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
      this.nextStepInformation.StartDate = this.chooseStartDate;
      this.nextStepInformation.EndDate = this.chooseEndDate;
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
}
