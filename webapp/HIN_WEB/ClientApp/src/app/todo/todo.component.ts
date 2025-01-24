import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Todo, Importance } from './todo';
import { Datashared } from '../helper/datashared';
import { TodoService } from './todo.service';
import { NotyHelper } from '../helper/NotyHelper';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users';
import { Pipeline, PipelineGroup, SfCalendarEvent } from '../model/pipeline';
import { ListdealsService } from '../listdeals/listdeals.service';
import { ModalService } from '../loader.service';
import { DropDownNotesType, LeadGenType } from '../helper/LeadGenType';
import { CustomsectionComponent } from '../customsection/customsection.component';
import { CustomProperty, CustomPropertyValues } from '../custom-fields/custom-fields';
import { Pipelinegrouptypeid } from '../helper/pipelinegrouptypeid';
import { AddeventshowService } from '../addeventshow/addeventshow.service';
import { Vendor } from '../model/vendor';
import { RecurrenceType, Days, Recurrence, RecurrenceDays, RecurrenceTuple } from '../model/AppointmentRecurrence';
import { Contactinformation, DealContact } from '../contactinformation/contactinformation';
import { SfcalendarService } from '../sfcalendar/sfcalendar.service';
import { Customdropdown } from '../customdropdown/customdropdown';
import * as moment from 'moment-timezone';
moment.tz.setDefault('Utc');
import { WeekViewHourSegment, ViewPeriod } from 'calendar-utils';
import { Leadgenentitytype } from '../model/leadgenentitytype';
import { AddgroupService } from '../addgroup/addgroup.service';
import { UserGroups } from '../addgroup/addgroup';
import { UserDetail } from '../login/login';
import { ContactinformationService } from '../contactinformation/contactinformation.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  public loEntity: number = DropDownNotesType.LocationTitle;
  public loConfig: any = {
    height: '',
    addButtonTitle: 'Add New',
    addButtonClass: 'w3-col s1 w3-button w3-input w3-border w3-secondary w3-margin-top-large w3-padding-small w3-round-bottom-right-0 w3-round-top-right-0',
    selectClass: 'w3-col s10 w3-full w3-input w3-border w3-round-bottom-right-0 w3-round-top-right-0 w3-round-bottom-left-0 w3-round-top-left-0',
    displayField: 'Description',
    placeholder: 'select',
    editButtonTitle: 'Edit',
    editButtonClass: 'w3-col s1 w3-button w3-input w3-border w3-secondary w3-margin-top-large w3-padding-small w3-round-bottom-left-0 w3-round-top-left-0',
    addButtonText: '',
    editButtonText: '',
    addButtonIconClass: 'fa fa-plus',
    editButtonIconClass: 'fa fa-pencil',
  };
  @ViewChildren(CustomsectionComponent) public CustomFieldSection: QueryList<CustomsectionComponent>;
  customFields: Array<CustomProperty> = [];
  vendorList: Array<Vendor> = [];
  customFieldValues: Array<CustomPropertyValues> = [];

  todoLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  todoRightCustomFieldValues: Array<CustomPropertyValues> = [];
  public activeContainer = '';

  addCustomToggle: boolean = false;
  public todo: Todo = new Todo;
  public Users: Array<Users> = [];
  public listImportance: Array<Importance> = [];
  entityTypeId: number;
  entityId: number;
  todoEntityType: number = LeadGenType.Todo;
  listPipeLineGroup: Array<PipelineGroup> = [];
  public listofPipeline: Array<Pipeline> = [];
  public recurrence: Recurrence = new Recurrence();
  public listRecurrenceDays: Array<RecurrenceDays> = [];
  selectedPipeIndex = 0;
  isRecurrence: boolean = false;
  frequency: number;
  days: Array<Days> = [];
  recurrenceTypes: Array<RecurrenceType> = [];
  selectedDealContact = new DealContact();
  calendarToggle: boolean = false;
  public calendarFor: string;
  events: SfCalendarEvent[] = [];
  public todoList: Array<Todo> = [];
  public listDealContactEvents: Array<DealContact> = [];
  stepTypes: Array<Customdropdown> = [];
  viewPeriod: ViewPeriod;
  basePermissionCheck: any;
  entityTodoName: number;
  entityTodoValue: number;
  public lstGroups: Array<UserGroups>;
  loggedUser: UserDetail;
  contactInformations: Array<Contactinformation> = [];

  constructor(private contactService: ContactinformationService, private cdr: ChangeDetectorRef, private router: Router, private dataHelper: Datashared, private modalService: ModalService, private todoService: TodoService, private noty: NotyHelper, private userService: UsersService, public listDealService: ListdealsService, public addEventShowService: AddeventshowService, private calendarService: SfcalendarService, private notyHelper: NotyHelper, public addGroupService: AddgroupService) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem("userDetail"));
    this.getUserGroups();
    this.getVenodeList();
    this.getPipeLineGroup();
    this.getUsers();
    this.getImportance();

    this.getDays();
    this.getRecurrenceType();
    let todo = this.dataHelper.getValue();
    if (todo) {
      this.todo = todo;
      this.getTodoById(this.todo.Id);
      this.activeContainer = 'tabContacts'
      this.entityId = this.todo.Id;
      this.entityTodoName = this.todo.EntityTypeId;
      this.entityTodoValue = this.todo.EntityId;
      this.getPipeLineByPipeLineGroupId(this.todo.PipelineGroupId);
      if (this.todo.IsRecurrence) {
        this.getRecurrenceData(this.todo.RecurrenceId);
      }

    }
    else {
      this.getLastIndentId("T");
      this.todo.AssignedTo = this.loggedUser.User.UserId
      this.todo.CompletedBy = 3;
      this.todo.StartDate = new Date();
      this.todo.EndDate = new Date();
      this.todo.EndDate.setMinutes(this.todo.EndDate.getMinutes() + 30);
    }
    var pipelineData = this.dataHelper.getPipelineValue();
    if (pipelineData) {
      this.todo.PipelineGroupId = pipelineData.pipelineGroupId;
      this.todo.PipelineId = pipelineData.pipeline.PipelineId;
      this.getPipeLineByPipeLineGroupId(this.todo.PipelineGroupId);
    }
    this.basePermissionCheck = this.dataHelper.getPermissionBaseValue();
    if (!this.basePermissionCheck) {
      this.basePermissionCheck = "5.2";
    }
  }
  getContactInformation(entityType, entityId) {
    this.contactService.getContactInformation(entityType, entityId, false).subscribe(data => {
      if (data != null)
        this.contactInformations = data;
    }, err => { }, () => { });
  }
  getTodoById(id) {
    this.todoService.getTodoById(id).subscribe(data => {
      if (data) {
        this.todo = data;
        this.getContactInformation(LeadGenType.Todo, this.todo.Id);
      }
    },err => { }, () => { });
  }

  getLastIndentId(firstLetter) {
    this.contactService.getNewEntityId('Todo', firstLetter).subscribe(data => {
      if (data) {
        this.todo.TodoNumber = data.EntityNumber;
      }
    }, err => { }, () => { });
  }
  selectedLocationTitle(evt) {
    if (evt) {
      this.todo.LocationTitle = evt;
    }
  }

  updateDonestatus(id) {
    this.todoService.updateTodoStatus(id).subscribe(data => {
      if (data) {
        this.router.navigate(['/todolist']);
        this.todo = data;
      }
      
    }, err => { }, () => { });
  }

  getUserGroups() {
    this.addGroupService.GetUserGroups().subscribe(data => {
      if (data)
        this.lstGroups = data;
      if (!this.todo.SecurityGroupId || this.todo.SecurityGroupId < 1) {
        if (this.lstGroups.length > 0) {
          var adminGroup = this.lstGroups.find(x => x.Name == "admin");
          if (adminGroup) {
            this.todo.SecurityGroupId = adminGroup.UserGroupId;
          }
        }
      }
    }, err => { });
  }

  selectAssignedValue(evt) {
    this.todo.AssignedTo = evt.Id;
    this.todo.AssignedName = evt.Name;
    this.todo.AssignedType = evt.Type;
  }

  sendEntityValue(evt) {
    this.todo.EntityTypeId = evt;
  }
  sendEntityType(evt) {
    this.todo.EntityId = evt;
  }
  getRecurrenceData(recurrenceId) {
    this.todoService.getRecurrenceData(recurrenceId).subscribe(data => {
      if (data) {
        let newRecurenceData = new Recurrence();
        newRecurenceData = data.Item1;
        this.recurrence = newRecurenceData;
        this.frequency = this.recurrence.RecurrenceTypeId;
        this.listRecurrenceDays = data.Item2;
      }
    }, err => { }, () => { });
  }
  getDays() {
    this.todoService.getDays().subscribe(data => {
      if (data) {
        this.days = data;
      }
    }, err => { }, () => { });
  }
  getRecurrenceType() {
    this.todoService.getRecurrenceType().subscribe(data => {
      if (data) {
        this.recurrenceTypes = data;
      }
    }, err => { }, () => { });
  }
  handleFrequencyChange(evt) {
    if (evt.target.checked) {
      this.frequency = evt.target.value;
    }
  }
  selectWeekDays(evt) {
    if (evt.target.checked) {
      let recurrenceDays = new RecurrenceDays();
      recurrenceDays.DayId = evt.target.value;
      this.listRecurrenceDays.push(recurrenceDays);
    }
    else {
      this.listRecurrenceDays = this.listRecurrenceDays.filter(x => x.DayId !== evt.target.value);
    }
  }
  getVenodeList() {
    this.addEventShowService.getVendor().subscribe(data => {
      this.vendorList = data;
    }, err => { }, () => { });
  }
  changeFormatDate(date) {
    if (date)
      return date.split(':')[0] + ':' + date.split(':')[1];
  }


  calendarFormatDate(date) {
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
  FormatDate(date) {
    if (date) {
      if (Object.prototype.toString.call(date) === "[object Date]")
        return date.getFullYear() + '-' + (date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? ('0' + (date.getDate())) : (date.getDate()));
      else {
        let clonedDate = new Date(date);
        return clonedDate.getFullYear() + '-' + (clonedDate.getMonth() < 10 ? ('0' + (clonedDate.getMonth() + 1)) : clonedDate.getMonth() + 1) + '-' + (clonedDate.getDate() < 10 ? ('0' + (clonedDate.getDate())) : (clonedDate.getDate()));
      }
      //return returnDate;
    }
  }

  colorChange(colorCode) {
    this.todo.Color = colorCode;
  }
  cancel() {
    this.router.navigate(['/todolist']);
  }
  backToFunnel() {
    this.router.navigate(['/funnel']);
  }
  backToCalendar() {
    this.router.navigate(['/sfcalendar']);
  }
  getUsers() {
    this.userService.getUsers().subscribe(data => {
      if (data) {
        this.Users = data;
      }
    }, err => { }, () => { });
  }
  getImportance() {
    this.todoService.getImportance().subscribe(data => {
      if (data) {
        this.listImportance = data;
      }
    }, err => { }, () => { });
  }

  //getLeadGenType() {
  //  this.todoService.getLeadGenType().subscribe(data => {
  //    if (data) {
  //      this.listLeadGenType = data;
  //    }
  //  }, err => {

  //  }, () => {

  //  });
  //}

  //getEntityName(evt) {
  //  if (evt) {
  //    let entityTypeId = evt.target.value;
  //    this.todoService.getEntityName(entityTypeId, 1).subscribe(data => {
  //      if (data) {
  //        this.listEntityName = data;
  //      }
  //    }, err => {

  //    }, () => {

  //    });
  //  }

  //}

  navigate(path, ismodel) {
    if (ismodel) {
      this.modalService.show(null);
      this.router.navigate([{ outlets: { modal: [path] } }]);
    }
    else {
      this.router.navigate(['/' + path]);
    }
  }

  saveTodo(todo) {
    if (!this.todo.StartDate || !this.todo.EndDate) {
      this.notyHelper.ShowNoty("Please fill start date and end date field");
    }
    else {
      let requestBody: RecurrenceTuple = new RecurrenceTuple();
      if (todo.IsRecurrence && this.recurrence) {
        this.recurrence.RecurrenceTypeId = this.frequency;
        requestBody.Item1 = this.recurrence;
        requestBody.Item2 = this.listRecurrenceDays;
        this.todoService.saveRecurrence(requestBody).subscribe(data => {
          if (data) {
            this.recurrence = data.Item1;
            this.listRecurrenceDays = data.Item2;
            todo.RecurrenceId = this.recurrence.Id;
            todo.IsRecurrence = true;
            this.todoService.saveTodo(todo).subscribe(data => {
              if (data) {
                this.todo = data;
                //this.CustomFieldSection.forEach(x => x.SaveCustomFieldValues(data.Id));
                this.CustomFieldSection.forEach(x => {
                  x.SaveCustomFieldValues(data.Id)
                });
                this.noty.ShowNoty("Todo saved successfully!");
                this.router.navigate([{ outlets: { modal: null } }]);
                //this.router.navigate(["/todolist"]);
              }
            }, err => { }, () => { });
          }
        });
      }
      else {
        this.todoService.saveTodo(todo).subscribe(data => {
          if (data) {
            this.todo = data;
            //this.CustomFieldSection.forEach(x => x.SaveCustomFieldValues(data.Id));
            this.CustomFieldSection.forEach(x => {
              x.SaveCustomFieldValues(data.Id)
            });
            this.noty.ShowNoty("Todo saved successfully!");
            this.router.navigate([{ outlets: { modal: null } }]);
            //this.router.navigate(["/todolist"]);
          }
        }, err => { }, () => { });
      }
    }
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
      this.listPipeLineGroup = data.filter(x => x.PipelineGroupType == Pipelinegrouptypeid.Todo);
    });
  }

  getPipeLineByPipeLineGroupId(id) {
    if (id == -1) {
      this.addNewFunnel();
    }
    else {
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
    

  }

  sortBy(prop: string) {
    return this.listofPipeline ? this.listofPipeline.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1) : [];
  }


  addTodoCustomFields() {
    this.addCustomToggle = true;
    this.entityTypeId = LeadGenType.Todo;
  }

  saveSuccess(evt) {
    if (evt) {
      this.addCustomToggle = false;
    }
  }
  dataExist(evt) {
    if (evt) {
      this.noty.ShowNoty("Column already exist!");
    }
  }
  closeError() {
    this.addCustomToggle = false;
  }
  addTodo() {
    this.dataHelper.setPermissionBaseValue(this.basePermissionCheck);
    this.navigate('todomodal', true);
  }

  OpenCalendarPopup(todo) {
    this.selectedDealContact = todo;
    this.calendarToggle = true;
  }
  close(data) {
    this.calendarToggle = data;
  }
  selectStartDate(data) {
    this.todo.StartDate = data;
  }
  selectEndDate(data) {
    this.todo.EndDate = data;
  }
  addNewFunnel() {
    this.navigate('pipelinemodal', true);
  }
   
}
