import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { Todo } from '../todo/todo';
import { SfcalendarService } from './sfcalendar.service';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Router } from '@angular/router';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { DealContact, Contactinformation, DealContactNextStep } from '../contactinformation/contactinformation';
import { ListdealsService } from '../listdeals/listdeals.service';
import { AdddealsService } from '../adddeals/adddeals.service';
import { Deal } from '../model/deal';
import { Datashared } from '../helper/datashared';
import { TodoService } from '../todo/todo.service';
import { PipelineGroup, Pipeline, SfCalendarEvent, EventSchedule } from '../model/pipeline';
import { Users } from '../users/users';
import { NotyHelper } from '../helper/NotyHelper';
import { UsersService } from '../users/users.service';
import { LeadGenType } from '../helper/LeadGenType';
import { ModalService } from '../loader.service';
import { GraphService } from '../officeauth/graph.service';
import { Customdropdown } from '../customdropdown/customdropdown';
import { AuthService } from '../officeauth/auth.service';
import { Services } from '../model/services';
import { JobService } from '../addservice/job.service';

@Component({
  selector: 'app-sfcalendar',
  templateUrl: './sfcalendar.component.html',
  styleUrls: ['./sfcalendar.component.css']
})

export class SfcalendarComponent implements OnInit {
  //public stepTypes: any = [];
  clientTimeZone: any;
  modalEmpty: boolean = true;
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  addEventDate: Date;
  events: SfCalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  public lstService: Array<Services> = [];
  dealInfo: Deal = new Deal();
  todoInfo: Todo = new Todo();
  serviceInfo: Services = new Services();
  menuTopLeftPosition = { x: '0', y: '0' }
  chooseStartDate: Date;
  chooseEndDate: Date;
  officeToggle: boolean;
  stepTypes: Array<Customdropdown> = [];
  constructor(public jobService: JobService, public dataShared: Datashared, private modalService: ModalService, private noty: NotyHelper, private userService: UsersService, public listDealService: ListdealsService, public todoService: TodoService, public dataHelper: Datashared, private calendarService: SfcalendarService, public router: Router, public contactService: ContactinformationService, public dealService: AdddealsService, private graphService: GraphService, private officeService: AuthService) { }
  public todoList: Array<Todo> = [];
  public dealContact: Array<DealContact> = [];
  public dealContactNextSteps: Array<DealContactNextStep> = [];
  activeDayIsOpen: boolean = false;
  addEvent: boolean = false;
  toggle: boolean = false;
  dealToggle: boolean = false;
  public todo: Todo = new Todo;
  public Users: Array<Users> = [];
  listPipeLineGroup: Array<PipelineGroup>;
  public listofPipeline: Array<Pipeline>;
  public listOpportunities: Array<Deal> = [];
  public listContacts: Array<Contactinformation> = [];
  public newDealContact: DealContact = new DealContact();
  public calendars: any;
  public officeInfo: any;
  public calendarEvents: any;
  selectedPipeIndex = 0;
  async ngOnInit() {
    this.clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var buttonShow = this.dataShared.getValue();
    if (buttonShow == "true") {
      this.modalEmpty = false;
    }
    else {
      this.modalEmpty = true;
    }
    this.getStepTypesData();
    this.getPipeLineGroup();
    this.getUsers();
    this.getAllOpportunity();
    //this.calendars = await this.graphService.getCalendars();
    this.eventUpdate();
  }
  getStepTypesData() {
    this.calendarService.getStepTypesData().subscribe(data => {
      if (data)
        this.stepTypes = data;
      this.getTodoEvents();
    }, err => { }, () => { });
  }
  eventUpdate() {
    this.getTodoEvents();
    if (this.calendars && this.calendars.value && this.calendars.value.length > 0) {
      this.calendars.value.forEach(async x => {
        if (x.isDefaultCalendar) {
          this.calendarEvents = await this.getCalendarEvents(x.id);
          if (this.calendarEvents && this.calendarEvents.value && this.calendarEvents.value.length > 0) {
            this.calendarEvents.value.forEach(y => {
              this.addCalendarEvent(new Date(y.start.dateTime), new Date(y.end.dateTime), y.id, "office365", y.subject, y);
            });

          }

        }
      });
    }
  }
  async getCalendarbyId(id) {
    return await this.graphService.getCalendar(id);
  }
  //getDateFormat(date) {
  //  return 
  //}
  async getCalendarEvents(id) {
    let date = new Date(this.viewDate);
    date.setUTCMonth(-1);
    return await this.graphService.getCalendarEvents(id, (date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate()), this.clientTimeZone);
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

  getAllOpportunity() {
    this.listDealService.getAllOpportunity().subscribe(data => {
      if (data)
        this.listOpportunities = data;
    }, err => { }, () => { });
  }
  getDealContacts(dealId) {
    this.contactService.getContactInformation(LeadGenType.Deal, dealId, false).subscribe(data => {
      if (data)
        this.listContacts = data;
    }, err => { }, () => { });
  }
  getUsers() {
    this.userService.getUsers().subscribe(data => {
      if (data) {
        this.Users = data;
      }
    }, err => { }, () => { });
  }
  saveTodo(todo) {
    this.todoService.saveTodo(todo).subscribe(data => {
      if (data) {
        this.closeToggle();
        this.noty.ShowNoty("Data saved successfully!")
        //this.router.navigate(["/todolist"]);
        this.getTodoEvents();
      }
    }, err => { }, () => { });
  }
  saveDealEvent(dealContact) {
    this.contactService.SaveDealContact(dealContact).subscribe(data => {
      if (data) {
        this.closeDealToggle();
        this.noty.ShowNoty("Data saved successfully!")
        //this.router.navigate(["/todolist"]);
        this.getTodoEvents();
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
  getPipeLineGroup() {
    this.listDealService.getPipeLineGroup().subscribe(data => {
      this.listPipeLineGroup = data;
    });
  }

  getPipeLineByPipeLineGroupId(id) {
    if (id) {
      this.listDealService.getPipeLineByPipeLineGroupId(id).subscribe(data => {
        this.listofPipeline = data;
        this.listofPipeline = this.sortBy('DisplayOrder');
        this.selectedPipeIndex = this.listofPipeline.findIndex(x => x.PipelineId == this.todo.PipelineId);
        if (this.selectedPipeIndex == -1) {
          this.selectedPipeIndex = 0;
          this.todo.PipelineId = this.listofPipeline[this.selectedPipeIndex].PipelineId;
        }
      });
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
  colorChange(colorCode) {
    this.todo.Color = colorCode;
  }
  dealColorChange(colorCode) {
    this.newDealContact.Color = colorCode;
  }
  closeEventAdd() {
    this.addEvent = false;
  }

  closeToggle() {
    this.addEventDate = null;
    this.toggle = false;
  }
  closeDealToggle() {
    this.addEventDate = null;
    this.dealToggle = false;
  }

  closeOfficeToggle() {
    this.addEventDate = null;
    this.officeToggle = false;
  }
  hoursRightClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.menuTopLeftPosition.x = evt.clientX + 'px';
    this.menuTopLeftPosition.y = (evt.clientY + 10) + 'px';
    evt.target.click();
    this.addEvent = true;
  }
  hourSegmentClicked(evt) {
    this.addEventDate = evt.date;
    this.addEvent = false;
    if (!this.modalEmpty) {
      let startDate = this.addEventDate;
      let startDateClone = new Date(startDate);
      let endDate = this.addEventDate;
      let endDateCloned = endDate;
      endDateCloned.setMinutes(endDate.getMinutes() + 30);
      this.chooseStartDate = startDateClone;
      this.chooseEndDate = endDateCloned;

    }
  };
  addCalendarEvent(start, end, id, type, title, officeData) {
    this.events.push({
      id: id,
      actionType: type,
      start: new Date(start),
      end: new Date(end),
      title: "Office365: " + title,
      color: {
        primary: '#CCCCCC',
        secondary: '#FAE3E3'
      },
      draggable: false,
      officeData: officeData
    });
    this.refresh.next();
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
        this.dealContact = data.Item2;
        for (let i = 0; i < this.dealContact.length; i++) {
          let listofStepType = this.stepTypes.find(x => x.DropDownId == this.dealContact[i].StepTypeId);
          if (listofStepType) {
            let stepType = listofStepType.DropDownName;
            arrEvents.push({
              id: this.dealContact[i].DealId,
              actionType: "deal",
              start: new Date(this.dealContact[i].StartDate),
              end: new Date(this.dealContact[i].EndDate),
              title: "Opportunity : " + stepType + " " + (this.dealContact[i].ContactName ? this.dealContact[i].ContactName : ''),
              color: {
                primary: (this.dealContact[i].Color ? this.dealContact[i].Color : '#e797ad'),
                secondary: (this.dealContact[i].Color ? this.dealContact[i].Color : '#f7dce4')
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
              title: "Appointment : " + (this.lstService[i].ServiceName ? this.lstService[i].ServiceName : ''),
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

  addNewTodo() {
    if (this.addEventDate) {
      let startDate = this.addEventDate;
      let startDateClone = new Date(startDate);
      let endDate = this.addEventDate;
      let endDateCloned = endDate;
      endDateCloned.setMinutes(endDate.getMinutes() + 30);
      this.todo.StartDate = startDateClone;
      this.todo.EndDate = endDateCloned;
    }
    this.navigate('todomodal', true);
    this.addEvent = false;
  }


  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  addDeal() {
    if (this.addEventDate) {
      let startDate = this.addEventDate;
      let startDateClone = new Date(startDate);
      let endDate = this.addEventDate;
      let endDateCloned = endDate;
      endDateCloned.setMinutes(endDate.getMinutes() + 30);
      this.newDealContact.StartDate = startDateClone;
      this.newDealContact.EndDate = endDateCloned;
    }
    this.navigate('adddealsmodal', true);
    this.addEvent = false;
  }
  handleEvent(action: string, event: SfCalendarEvent): void {
    if (event.actionType == "deal") {
      this.dealService.getDealById(event.id).subscribe(data => {
        if (data) {
          this.dealInfo = data;
          this.dataHelper.setValue(this.dealInfo);
          this.router.navigate(['/opportunityview']);
        }
      }, err => { }, () => { });
    }
    else if (event.actionType == "todo") {
      this.todoService.getTodoById(event.id).subscribe(data => {
        if (data) {
          this.todoInfo = data;
          this.dataHelper.setValue(this.todoInfo);
          this.dataHelper.setPermissionBaseValue("6.4");
          this.router.navigate(['/todo']);
        }
      }, err => { }, () => { });
    }
    else if (event.actionType == "office365") {
      this.officeInfo = event;
      console.log(this.officeInfo);
      this.officeToggle = true;
    }
    else if (event.actionType == "service") {
      if (event.id) {
        this.jobService.getServiceById(event.id).subscribe(data => {
          if (data) {
            this.serviceInfo = data;
            this.dataHelper.setValue(this.serviceInfo);
            this.router.navigate(['/editservice']);
          }
        }, err => { }, () => { });
      }
    }
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
    }
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
    //    break;
    //}
    this.refresh.next();
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
    this.calendars = await this.graphService.getCalendars();
  }


}
