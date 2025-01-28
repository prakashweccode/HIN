import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';
import { PipelineGroup, Pipeline } from '../model/pipeline';
import { Deal } from '../model/deal';
import { NotyHelper } from '../helper/NotyHelper';
import { ListdealsService } from '../listdeals/listdeals.service';
import { Todo } from '../todo/todo';
import { TodoService } from '../todo/todo.service';
import { ModalService } from '../loader.service';
import { Vendor } from '../model/vendor';
import { Pipelinegrouptypeid } from '../helper/pipelinegrouptypeid';
import { Dealstatus, ServiceStatus } from '../helper/dealstatus';
import { Lead } from '../model/lead';
import { Partner } from '../model/partner';
import { Referral } from '../model/referral';
import { AddreferralService } from '../addreferral/addreferral.service';
import { AddpartnerService } from '../addpartner/addpartner.service';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users';
import { User } from 'oidc-client';
import { LeadGenType } from '../helper/LeadGenType';
import { AssignednameService } from '../assignedname/assignedname.service';
import { Assignedname } from '../assignedname/assignedname';
import { Filterfunneltype } from '../model/filterfunneltype';
import { AdddealsService } from '../adddeals/adddeals.service';
import { DealContact, DealContactNextStep } from '../contactinformation/contactinformation';
import { Services } from '../model/services';
import { JobService } from '../addservice/job.service';
import { Events } from '../model/event';
import { AddeventService } from '../addevent/addevent.service';
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})

export class AgendaComponent implements OnInit {
  reasonToggle: boolean = false;
  public wonToggle: boolean = false;
  public userId: number = 0;
  public dropDownToggle: boolean = false;
  public entityTypeId: number;
  public staticFilter: any;
  public orderBy: any;
  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public dragElement: Deal;
  public dragTodoElement: Todo;
  public dropTodoElement: Pipeline;
  public dragVendorElement: Vendor;
  public dropVendorElement: Pipeline;
  public dragLeadElement: Lead;
  public dropLeadElement: Pipeline;
  public dragPartnerElement: Partner;
  public dropPartnerElement: Pipeline;
  public dragReferralElement: Referral;
  public dropReferralElement: Pipeline;
  public dragEventElement: Events;
  public dropEventElement: Pipeline;

  public dragServiceElement: Services;
  public dropServiceElement: Pipeline;

  public dropElement: Pipeline;
  public apiUrl: string;
  public pageSize: number;
  public isResponsive: boolean;
  public isSearchEnabled: boolean;
  public isPaginationEnabled: boolean;
  public actions: Array<any>;
  public pageLengthOptions: Array<number>;
  activeContainer: string = "tab10";
  order: string;
  reverse: boolean;
  todoOrder: boolean;
  todoReverse: boolean;
  toggle: boolean = false;
  public cancelReason: string;
  public cancelReasonId: number;
  public serviceCancelReasonId: number;
  public pipeLineGroupTypeId = Pipelinegrouptypeid;
  public listPipeLineGroup: Array<PipelineGroup>;
  public listPipeLineByTypeId: Array<PipelineGroup>;
  public listofPipeline: Array<Pipeline>;
  public pipelineGroupId: number;
  public dealList: Array<Deal>;
  public dealContact: Array<DealContact>;
  public dealContactNextStep: Array<DealContactNextStep>;
  public vendorTodoList: Array<Todo>;
  public vendorList: Array<Vendor>;
  public partnerList: Array<Partner>;
  public referralList: Array<Referral>;
  public eventList: Array<Events>;

  public serviceList: Array<Services>;

  public leadList: Array<Lead>;
  public todoList: Array<Todo>;
  public filterByStatusById: number = 6;
  public filterByServiceStatusById: number = 1;
  public filterServiceStatus = ServiceStatus;
  public filterByStatus = Dealstatus;
  public filterFunnelType: Filterfunneltype = new Filterfunneltype();
  public assignedTo: number;
  assignedNames: Array<Assignedname> = [];
  selectedAssignedName: Assignedname = new Assignedname();
  users: Array<Users> = [];
  constructor(public router: Router, public dataShared: Datashared, public addreferralService: AddreferralService, public addDealService: AdddealsService, public addpartnerService: AddpartnerService, private modalService: ModalService, public listDealService: ListdealsService, public todoService: TodoService, public noty: NotyHelper, private userService: UsersService, public assigneNameService: AssignednameService, public jobService: JobService, public addEventService: AddeventService) { }

  ngOnInit() {
    
    this.getUserandPartnerName();
    this.getUsers();
    let userData = JSON.parse(localStorage.getItem("userDetail"));
    this.userId = userData.User.UserId;
    this.pipelineGroupId = this.dataShared.getValue();
    this.entityTypeId =this.dataShared.getEntityValue();
    switch (this.entityTypeId) {
      case 1:
        this.activeContainer = "tab7";
        this.getPipeLineGroup('lead');
        break;
      case 2:
        this.activeContainer = "tab1";
        this.getPipeLineGroup('sales');
        break;
      case 4:
        this.activeContainer = "tab6";
        this.getPipeLineGroup('vendor');
        break;
      case 20:
        this.activeContainer = "tab9";
        this.getPipeLineGroup('referral');
        break;
      case 19:
        this.activeContainer = "tab8";
        this.getPipeLineGroup('partner');
        break;
      case 29:
        this.activeContainer = "service";
        this.getPipeLineGroup('service');
        break;
      case 30:
        this.activeContainer = "tab10";
        this.getPipeLineGroup('event');
        break;
      default:
        this.activeContainer = "tab10";
        this.getPipeLineGroup('event');
        break;
    }
    //getPipeLineByTypeId(pipeLineGroupTypeId.Event)
    this.selectedAssignedName.Id = userData.User.UserId;
    this.selectedAssignedName.Name = userData.User.UserName;
    this.selectedAssignedName.Type = "User";
    this.sendAssignedName(this.selectedAssignedName);
    if (!(this.activeContainer == "tab7")) {
      this.filterByStatusById = Dealstatus.InProgress;
    }
    if (this.activeContainer == "tab10") {
      this.filterByStatusById = ServiceStatus.Inprogress;
    }

  }

  updateDealProbability() {
    this.addDealService.updateDealProbability().subscribe(data => {
      this.ngOnInit();
    }, err => { }, () => { });
    this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  getPipeLineByUserId(activeContainer) {
    switch (activeContainer) {
      case "tab1":
        this.getDealByPipeLineGroupId(this.pipelineGroupId, this.userId);
        break;
      case "tab3":
        this.getTodoByPipeLineGroupId(this.pipelineGroupId, this.userId);
        break;
      case "tab5":
        this.getVendorTodoByPipeLineGroupId(this.pipelineGroupId, this.userId);
        break;
      case "tab6":
        this.getVendorByPipeLineGroupId(this.pipelineGroupId, this.userId);
        break;
      case "tab7":
        this.getLeadByPipeLineGroupId(this.pipelineGroupId, this.userId);
        break;
      case "tab9":
        this.getReferralByPipeLineGroupId(this.pipelineGroupId, this.userId);
        break;
      case "tab8":
        this.getPartnerByPipeLineGroupId(this.pipelineGroupId, this.userId);
        break;
      case "tab10":
        this.getEventByPipeLineGroupId(this.pipelineGroupId, this.userId);
        break;
      case "service":
        this.getServiceByPipeLineGroupId(this.pipelineGroupId, this.userId);
        break;
      default:
        this.getDealByPipeLineGroupId(this.pipelineGroupId, this.userId);
        break;
    }
  }

  getUserandPartnerName() {
    this.assigneNameService.getUserandPartnerName().subscribe(data => {
      this.assignedNames = data;
    }, err => { }, () => { });
  }

  compareFn(assignedName, selectedAssignedName): boolean {
    if (assignedName && selectedAssignedName)
      return (assignedName.Id == selectedAssignedName.Id && assignedName.Type == selectedAssignedName.Type);
  }

  sendAssignedName(selectedAssignedName) {
    this.userId = selectedAssignedName.Id;
    this.filterFunnelType.UserType = selectedAssignedName.Type;
    this.getEventByPipeLineGroupId(this.pipelineGroupId, this.userId);
  }


  closeToggle() {
    this.toggle = false;
    this.cancelReason = '';
  }
  closeReasonToggle() {
    this.toggle = false;
    this.cancelReasonId;
  }
  closeServiceCancelReason() {
    this.reasonToggle = false;
    this.serviceCancelReasonId = null;
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

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }


  getByStatus(id, tab) {
    this.filterByStatusById = id;
    switch (tab) {
      case "tab7":
        this.filterByStatusById = Dealstatus.All;
        this.getPipeLineGroup('lead');
        break;
      case "tab1":
        this.getPipeLineGroup('sales');
        break;
      case "tab6":
        this.getPipeLineGroup('vendor');
        break;
      case "tab9":
        this.getPipeLineGroup('referral');
        break;
      case "tab8":
        this.getPipeLineGroup('partner');
        break;
      case "tab10":
        this.getPipeLineGroup('event');
        break;
      case "service":
        this.getPipeLineGroup('service');
        break;
      case "tab3":
        this.getPipeLineGroup('todo');
        break;
      default:
        this.getPipeLineGroup('sales');
        break;
    }
  }

  getServiceByStatus(id, tab) {
    
    this.filterByServiceStatusById = id;
    this.getByStatus(id, tab);
    //this.getPipeLineGroup('tab10');
  }

  get Dealstatus() {
    return Dealstatus;
  }

  getStatusByEnum() {
    return Object.keys(Dealstatus).filter(key => isNaN(Number(key)))
  }

  get ServiceStatus() {
    return ServiceStatus;
  }

  getServiceStatusByEnum() {
    return Object.keys(ServiceStatus).filter(key => isNaN(Number(key)))
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

  addDeal() {
    this.navigate('adddealsmodal', true);
    //this.router.navigate(['/adddeals']);
  }

  addNewLead() {
    this.navigate('addleadsmodal', true);
  }

  addNewService() {
    this.navigate('addservicemodal', true);
  }
  addNewEvent() {
    this.navigate('addeventmodal', true);
  }


  addNewVendor() {
    this.navigate('addvendormodal', true);
  }
  pipeline() {
    this.router.navigate(['/pipeline']);
  }
  addPipelineDeal(pipeline) {
    let data = { pipelineGroupId: this.pipelineGroupId, pipeline }
    this.dataShared.setPipelineValue(data);
    this.router.navigate(['/adddeals']);
  }
  addPipelineTodo(pipeline) {
    let data = { pipelineGroupId: this.pipelineGroupId, pipeline }
    this.dataShared.setPipelineValue(data);
    this.router.navigate(['/todo']);
  }
  addPipelineVendor(pipeline) {
    let data = { pipelineGroupId: this.pipelineGroupId, pipeline }
    this.dataShared.setPipelineValue(data);
    this.router.navigate(['/addvendor']);
  }

  addPipelineService(pipeline) {
    let data = { pipelineGroupId: this.pipelineGroupId, pipeline }
    this.dataShared.setPipelineValue(data);
    this.router.navigate(['/addservice']);
  }

  addPipelineLead(pipeline) {
    let data = { pipelineGroupId: this.pipelineGroupId, pipeline }
    this.dataShared.setPipelineValue(data);
    this.router.navigate(['/addleads']);
  }

  addPipelinePartner(pipeline) {
    let data = { pipelineGroupId: this.pipelineGroupId, pipeline }
    this.dataShared.setPipelineValue(data);
    this.router.navigate(['/addpartner']);
  }

  addPipelineReferral(pipeline) {
    let data = { pipelineGroupId: this.pipelineGroupId, pipeline }
    this.dataShared.setPipelineValue(data);
    this.router.navigate(['/addreferral']);
  }
  addPipelineEvent(pipeline) {
    let data = { pipelineGroupId: this.pipelineGroupId, pipeline }
    this.dataShared.setPipelineValue(data);
    this.router.navigate(['/addevent']);
  }
  sortFunnel(pipeline, reverse) {
    this.order = pipeline.Name;
    if (reverse && this.order == pipeline.Name) {
      this.reverse = !reverse;
      this.dealList.sort(function (a, b) {
        let c = new Date(a.SortProperty).getTime();
        let d = new Date(b.SortProperty).getTime();
        return c - d;
      });
    }
    else {
      this.reverse = !reverse;
      this.dealList.sort(function (a, b) {
        let c = new Date(a.SortProperty).getTime();
        let d = new Date(b.SortProperty).getTime();
        return d - c;
      });
    }
    //this.dealList = this.dealList.sort(x => new Date(x.EstimationDate).getTime());

  }


  sortServiceFunnel(pipeline, reverse) {
    this.order = pipeline.Name;
    if (reverse && this.order == pipeline.Name) {
      this.reverse = !reverse;
      this.serviceList.sort(function (a, b) {
        let c = new Date(a.CreatedOn).getTime();
        let d = new Date(b.CreatedOn).getTime();
        return c - d;
      });
    }
    else {
      this.reverse = !reverse;
      this.serviceList.sort(function (a, b) {
        let c = new Date(a.CreatedOn).getTime();
        let d = new Date(b.CreatedOn).getTime();
        return d - c;
      });
    }

  }

  sortVendorFunnel(pipeline, reverse) {
    this.order = pipeline.Name;
    if (reverse && this.order == pipeline.Name) {
      this.reverse = !reverse;
      this.vendorList.sort(function (a, b) {
        let c = new Date(a.CreatedOn).getTime();
        let d = new Date(b.CreatedOn).getTime();
        return c - d;
      });
    }
    else {
      this.reverse = !reverse;
      this.vendorList.sort(function (a, b) {
        let c = new Date(a.CreatedOn).getTime();
        let d = new Date(b.CreatedOn).getTime();
        return d - c;
      });
    }
    //this.dealList = this.dealList.sort(x => new Date(x.EstimationDate).getTime());

  }

  sortReferrralFunnel(pipeline, reverse) {
    this.order = pipeline.Name;
    if (reverse && this.order == pipeline.Name) {
      this.reverse = !reverse;
      this.referralList.sort(function (a, b) {
        let c = new Date(a.CreatedOn).getTime();
        let d = new Date(b.CreatedOn).getTime();
        return c - d;
      });
    }
    else {
      this.reverse = !reverse;
      this.referralList.sort(function (a, b) {
        let c = new Date(a.CreatedOn).getTime();
        let d = new Date(b.CreatedOn).getTime();
        return d - c;
      });
    }

  }

  sortEventFunnel(pipeline, reverse) {
    this.order = pipeline.Name;
    if (reverse && this.order == pipeline.Name) {
      this.reverse = !reverse;
      this.eventList.sort(function (a, b) {
        let c = new Date(a.CreatedOn).getTime();
        let d = new Date(b.CreatedOn).getTime();
        return c - d;
      });
    }
    else {
      this.reverse = !reverse;
      this.eventList.sort(function (a, b) {
        let c = new Date(a.CreatedOn).getTime();
        let d = new Date(b.CreatedOn).getTime();
        return d - c;
      });
    }

  }

  sortPartnerFunnel(pipeline, reverse) {
    this.order = pipeline.Name;
    if (reverse && this.order == pipeline.Name) {
      this.reverse = !reverse;
      this.partnerList.sort(function (a, b) {
        let c = new Date(a.CreatedOn).getTime();
        let d = new Date(b.CreatedOn).getTime();
        return c - d;
      });
    }
    else {
      this.reverse = !reverse;
      this.partnerList.sort(function (a, b) {
        let c = new Date(a.CreatedOn).getTime();
        let d = new Date(b.CreatedOn).getTime();
        return d - c;
      });
    }
  }

  sortTodoFunnel(pipeline, todoReverse) {
    this.todoOrder = pipeline.Name;
    if (todoReverse && this.todoOrder == pipeline.Name) {
      this.todoReverse = !todoReverse;
      this.todoList.sort(function (a, b) {
        let c = new Date(a.StartDate).getTime();
        let d = new Date(b.StartDate).getTime();
        return c - d;
      });
    }
    else {
      this.todoReverse = !todoReverse;
      this.todoList.sort(function (a, b) {
        let c = new Date(a.StartDate).getTime();
        let d = new Date(b.StartDate).getTime();
        return d - c;
      });
    }
    //this.dealList = this.dealList.sort(x => new Date(x.EstimationDate).getTime());

  }

  addNewPartner() {
    this.navigate('addpartnermodal', true);
  }

  addNewReferral() {
    this.navigate('addreferralmodal', true);
  }


  addNewTodo() {
    this.navigate('todomodal', true);
    //this.router.navigate(['/todo']);
  }
  noAllowDrop(ev) {
    ev.stopPropagation();
  }
  drop(ev, pipeline) {
    this.dropElement = pipeline;
    var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
    this.updatePipelineId(this.dragElement.DealId, this.dropElement);
    ev.preventDefault();

  }

  saveWonAmount(evt) {
    if (evt) {
      this.dragElement.StatusId = evt.StatusId;
      this.noty.ShowNoty("Deal status updated !!!");
      this.wonToggle = false;
      //this.updatePipelineStatus(this.dragElement.DealId, 1);
    }
  }

  canceldrop(event) {
    this.dataShared.setValue(4);
    this.toggle = true;
  }

  lostdrop(ev) {
    this.dataShared.setValue(3);
    this.toggle = true;
  }

  saveCancelReason() {
    if (!this.cancelReasonId) {
      this.noty.ShowNoty("Please enter the reason");
    }
    else {
      this.dragElement.ReasonId = this.cancelReasonId;

      this.dragElement.StatusId = this.dataShared.getValue();
      this.listDealService.saveCancelReason(this.dragElement).subscribe(data => {
        this.toggle = false;
        this.noty.ShowNoty("Updated successfully!");
        this.getPipeLineGroup('sales');
      }, err => { }, () => { });
    }

  }
  dropTodo(ev, pipeline) {
    this.dropTodoElement = pipeline;
    var data = ev.dataTransfer.getData("text");
    this.updateTodoPipelineId(this.dragTodoElement.Id, this.dropTodoElement);
    this.activeContainer = 'tab3';
    ev.preventDefault();
  }
  dropVendortodo(ev, pipeline) {
    this.dropTodoElement = pipeline;
    var data = ev.dataTransfer.getData("text");
    this.updateVendorTodoPipelineId(this.dragTodoElement.Id, this.dropTodoElement);
    this.activeContainer = 'tab5';
    ev.preventDefault();
  }
  dropEvent(ev, pipeline) {
    this.dropTodoElement = pipeline;
    var data = ev.dataTransfer.getData("text");
    this.updateEventPipelineId(this.dragEventElement.Id, this.dropTodoElement);
    this.activeContainer = 'tab10';
    ev.preventDefault();
  }

  dropVendor(ev, pipeline) {
    this.dropVendorElement = pipeline;
    var data = ev.dataTransfer.getData("text");
    this.updateVendorPipelineId(this.dragVendorElement.VendorId, this.dropVendorElement);
    this.activeContainer = 'tab6';
    ev.preventDefault();
  }

  dropPartner(ev, pipeline) {
    this.dropPartnerElement = pipeline;
    var data = ev.dataTransfer.getData("text");
    this.updatePartnerPipelineId(this.dragPartnerElement.PartnerId, this.dropPartnerElement);
    this.activeContainer = 'tab8';
    ev.preventDefault();
  }

  dropReferral(ev, pipeline) {
    this.dropReferralElement = pipeline;
    var data = ev.dataTransfer.getData("text");
    this.updateReferralPipelineId(this.dragReferralElement.ReferralId, this.dropReferralElement);
    this.activeContainer = 'tab9';
    ev.preventDefault();
  }


  dropLead(ev, pipeline) {
    this.dropLeadElement = pipeline;
    var data = ev.dataTransfer.getData("text");
    this.updateLeadPipelineId(this.dragLeadElement.LeadId, this.dropLeadElement);
    this.activeContainer = 'tab7';
    ev.preventDefault();
  }

  dropService(ev, pipeline) {
    this.dropServiceElement = pipeline;
    var data = ev.dataTransfer.getData("text");
    this.updateServicePipelineId(this.dragServiceElement.Id, this.dropServiceElement);
    this.activeContainer = 'service';
    ev.preventDefault();
  }

  allowDrop(ev) {
    ev.preventDefault();
  }
  allowDropTile(ev) {
    ev.preventDefault();
  }

  dragTodo(evt, todo) {
    evt.dataTransfer.setData("text", evt.target.id);
    this.dragTodoElement = todo;
  }
  dragVendorTodo(evt, todo) {
    evt.dataTransfer.setData("text", evt.target.id);
    this.dragTodoElement = todo;
  }

  dragLead(evt, lead) {
    evt.dataTransfer.setData("text", evt.target.id);
    this.dragLeadElement = lead;
  }

  dragPartner(evt, partner) {
    evt.dataTransfer.setData("text", evt.target.id);
    this.dragPartnerElement = partner;
  }

  dragReferral(evt, referral) {
    evt.dataTransfer.setData("text", evt.target.id);
    this.dragReferralElement = referral;
  }

  dragEvent(evt, event) {
    evt.dataTransfer.setData("text", evt.target.id);
    this.dragEventElement = event;
  }

  drag(ev, deal) {
    ev.dataTransfer.setData("text", ev.target.id);
    this.dragElement = deal;
  }

  dragVendor(ev, vendor) {
    ev.dataTransfer.setData("text", ev.target.id);
    this.dragVendorElement = vendor;
  }

  dragService(ev, service) {
    ev.dataTransfer.setData("text", ev.target.id);
    this.dragServiceElement = service;
  }

  editDeal(evt) {
    this.dataShared.setValue(evt.dataRow);
    this.router.navigate(['/adddeals']);
  }
  editTodo(evt) {
    this.dataShared.setValue(evt.dataRow);
    this.router.navigate(['/todo']);
  }

  editDealFromDrag(deal) {
    this.dataShared.setValue(deal);
    this.router.navigate(['/opportunityview']);
  }
  editVendorFromDrag(vendor) {
    this.dataShared.setValue(vendor);
    this.router.navigate(['/vendorsteps']);
  }

  editLeadFromDrag(lead) {
    this.dataShared.setValue(lead);
    this.router.navigate(['/leadsteps']);
  }

  editServiceFromDrag(service) {
    this.dataShared.setValue(service);
    this.router.navigate(['/servicessteps']);
  }

  editPartnerFromDrag(partner) {
    this.dataShared.setValue(partner);
    this.router.navigate(['/partnersteps']);
  }
  editReferralFromDrag(referral) {
    this.dataShared.setValue(referral);
    this.router.navigate(['/referralsteps']);
  }
  editEventFromDrag(event) {
    this.dataShared.setValue(event);
    this.navigate('addeventmodal', true);
  }

  getPipeLineByTypeId(id) {
    if (id == this.pipeLineGroupTypeId.Sales) {
      this.activeContainer = "tab1";
      this.listPipeLineByTypeId = this.listPipeLineGroup.filter(x => x.PipelineGroupType == id);
    }
    else if (id == this.pipeLineGroupTypeId.Todo) {
      this.activeContainer = "tab3";
      this.listPipeLineByTypeId = this.listPipeLineGroup.filter(x => x.PipelineGroupType == id);
    }
    else if (id == this.pipeLineGroupTypeId.VendorToDo) {
      this.activeContainer = "tab5";
      this.listPipeLineByTypeId = this.listPipeLineGroup.filter(x => x.PipelineGroupType == this.pipeLineGroupTypeId.VendorToDo);
    }
    else if (id == this.pipeLineGroupTypeId.Vendor) {
      this.activeContainer = "tab6";
      this.listPipeLineByTypeId = this.listPipeLineGroup.filter(x => x.PipelineGroupType == id);
    }
    else if (id == this.pipeLineGroupTypeId.Lead) {
      this.activeContainer = "tab7";
      this.filterByStatusById = Dealstatus.All;
      this.listPipeLineByTypeId = this.listPipeLineGroup.filter(x => x.PipelineGroupType == id);
    }
    else if (id == this.pipeLineGroupTypeId.Partner) {
      this.activeContainer = "tab8";
      this.listPipeLineByTypeId = this.listPipeLineGroup.filter(x => x.PipelineGroupType == id);
    }
    else if (id == this.pipeLineGroupTypeId.Referral) {
      this.activeContainer = "tab9";
      this.listPipeLineByTypeId = this.listPipeLineGroup.filter(x => x.PipelineGroupType == id);
    }
    else if (id == this.pipeLineGroupTypeId.Event) {
      this.activeContainer = "tab10";
      this.listPipeLineByTypeId = this.listPipeLineGroup.filter(x => x.PipelineGroupType == id);
    }
    else if (id == this.pipeLineGroupTypeId.Service) {
      this.activeContainer = "service";
      this.listPipeLineByTypeId = this.listPipeLineGroup.filter(x => x.PipelineGroupType == id);
    }
    if (this.listPipeLineByTypeId && this.listPipeLineByTypeId.length >= 0) {
      let existingPipelineGroup = this.listPipeLineByTypeId.filter(x => x.PipelineGroupId == this.pipelineGroupId);
      if (existingPipelineGroup && existingPipelineGroup.length <= 0) {
        this.pipelineGroupId = null;
        this.pipelineGroupId = this.pipelineGroupId ? this.pipelineGroupId : this.listPipeLineByTypeId[0].PipelineGroupId;
      }
      this.getPipeLineByPipeLineGroupId(this.pipelineGroupId);
    }
  }




  getPipeLineGroup(type) {
    this.listDealService.getPipeLineGroup().subscribe(data => {
      if (data != null) {
        this.listPipeLineGroup = data;
        if (data.length >= 0) {
          this.pipelineGroupId = this.pipelineGroupId;
         // this.getPipeLineByPipeLineGroupId(this.pipelineGroupId);
          switch (type.toLowerCase()) {
            case 'sales':
              this.getPipeLineByTypeId(this.pipeLineGroupTypeId.Sales);
              break;
            case 'todo':
              this.getPipeLineByTypeId(this.pipeLineGroupTypeId.Todo);
              break;
            case 'service':
              this.getPipeLineByTypeId(this.pipeLineGroupTypeId.Service);
              break;
            case 'vendortodo':
              this.getPipeLineByTypeId(this.pipeLineGroupTypeId.VendorToDo);
              break;
            case 'vendor':
              this.getPipeLineByTypeId(this.pipeLineGroupTypeId.Vendor);
              break;
            case 'lead':
              this.getPipeLineByTypeId(this.pipeLineGroupTypeId.Lead);
              break;
            case 'partner':
              this.getPipeLineByTypeId(this.pipeLineGroupTypeId.Partner);
              break;
            case 'referral':
              this.getPipeLineByTypeId(this.pipeLineGroupTypeId.Referral);
              break;
            case 'event':
              this.getPipeLineByTypeId(this.pipeLineGroupTypeId.Event);
              break;
            default:
              this.getPipeLineByTypeId(this.pipeLineGroupTypeId.Sales);
              break;
          }
        }
      }
    });
  }

  wondrop(ev) {
    this.wonToggle = true;
    ev.preventDefault();
  }

  closeError() {
    this.wonToggle = false;
  }

  donedrop(ev) {
    this.updatePipelineStatus(this.dragElement.DealId, 2);
    ev.preventDefault();
  }
  todoDoneDrop(ev) {
    this.UpdateTodoStatus(this.dragTodoElement.Id);
    ev.preventDefault();
  }

  inprogressdrop(ev) {
    this.updatePipelineStatus(this.dragElement.DealId, 5);
    ev.preventDefault();
  }


  inProgresServiceDrop(evt) {
    this.updateServicePipelineStatus(this.dragServiceElement.Id, 1);
    evt.preventDefault();
    this.getPipeLineGroup('service');
  }

  onHoldServiceDrop(evt) {
    this.updateServicePipelineStatus(this.dragServiceElement.Id, 2);
    evt.preventDefault();
    this.getPipeLineGroup('service');
  }

  completedServiceDrop(evt) {
    this.updateServicePipelineStatus(this.dragServiceElement.Id, 3);
    evt.preventDefault();
    this.getPipeLineGroup('service');
  }
  updateCancelReason() {
    if (this.serviceCancelReasonId && this.serviceCancelReasonId > 0) {
      this.updateServicePipelineStatus(this.serviceCancelReasonId, 4);
    }
    else {
      this.noty.ShowNoty("Please select cancel reason");
    }

  }
  cancelServiceDrop(evt) {
    //this.updateServicePipelineStatus(this.dragServiceElement.Id, 4);
    this.reasonToggle = true;
    evt.preventDefault();
  }

  editPipeline(pipelineid) {
    let pipeline = this.listPipeLineGroup.find(x => x.PipelineGroupId == pipelineid);
    this.dataShared.setValue(pipeline);
    this.router.navigate(['/pipeline']);
  }

  getPipeLineByPipeLineGroupId(id) {
    
    if (id) {
      this.listDealService.getPipeLineByPipeLineGroupId(id).subscribe(data => {
        this.listofPipeline = data;
        this.getDealByPipeLineGroupId(id, this.userId);
        this.getTodoByPipeLineGroupId(id, this.userId);
        this.getVendorTodoByPipeLineGroupId(id, this.userId);
        this.getVendorByPipeLineGroupId(id, this.userId);
        this.getLeadByPipeLineGroupId(id, this.userId);
        this.getReferralByPipeLineGroupId(id, this.userId);
        this.getEventByPipeLineGroupId(id, this.userId);
        this.getPartnerByPipeLineGroupId(id, this.userId);
        this.getServiceByPipeLineGroupId(id, this.userId);
      });
    }
  }

  getServiceByPipeLineGroupId(id, userId) {
    if (id) {
      this.jobService.getServiceByPipeLineGroupId(id).subscribe(data => {
        this.serviceList = this.filterFunnel(data, this.filterByServiceStatusById, userId, this.filterFunnelType.Owner);
      });
    }
  }

  getStageService(id) {
    if (id && this.serviceList && this.serviceList.length >= 0) {
      return this.serviceList ? this.serviceList.filter(x => x.PipelineId == id) : [];
    }
  }

  getLeadByPipeLineGroupId(id, userId) {
    if (id) {
      this.todoService.getLeadByPipeLineGroupId(id).subscribe(data => {
        this.leadList = this.filterFunnel(data, this.filterByStatusById, userId, this.filterFunnelType.Owner);
      });
    }
  }

  getStageLead(id) {
    if (id && this.leadList && this.leadList.length >= 0) {
      return this.leadList ? this.leadList.filter(x => x.PipelineId == id) : [];
    }
  }

  getReferralByPipeLineGroupId(id, userId) {
    if (id) {
      this.addreferralService.getReferralByPipeLineGroupId(id).subscribe(data => {
        this.referralList = this.filterFunnel(data, this.filterByStatusById, userId, this.filterFunnelType.AssignedTo);
      });
    }
  }

  getStageReferral(id) {
    if (id && this.referralList && this.referralList.length >= 0) {
      return this.referralList ? this.referralList.filter(x => x.PipelineId == id) : [];
    }
  }


  getPartnerByPipeLineGroupId(id, userId) {
    if (id) {
      this.addpartnerService.getPartnerByPipeLineGroupId(id).subscribe(data => {
        this.partnerList = this.filterFunnel(data, this.filterByStatusById, userId, this.filterFunnelType.AssignedTo);
      });
    }
  }

  getEventByPipeLineGroupId(id, userId) {
    if (id) {
      this.addEventService.getEventByPipeLineGroupId(id).subscribe(data => {
        this.eventList = this.filterFunnel(data, this.filterByStatusById, userId, this.filterFunnelType.Owner);
      });
    }
  }

  getStagePartner(id) {
    if (id && this.partnerList.length >= 0) {
      return this.partnerList ? this.partnerList.filter(x => x.PipelineId == id) : [];
    }
  }

  sortBy(prop: string) {
    return this.listofPipeline ? this.listofPipeline.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1) : [];
  }

  editTodoFromDrag(todo) {
    this.dataShared.setValue(todo);
    this.navigate('todomodal', true);
  }

  UpdateTodoStatus(id) {
    this.todoService.updateTodoStatus(id).subscribe(data => {
      if (data) {
        this.getTodoByPipeLineGroupId(this.pipelineGroupId, this.userId);
      }
    }, err => { }, () => { });
  }

  getTodoByPipeLineGroupId(id, userId) {
    this.todoService.getTodoByPipeLineGroupId(id).subscribe(data => {
      if (data) {
        this.todoList = (userId > 0) ? (data.filter(x => (x.EntityTypeId != LeadGenType.Vendor && x.AssignedTo == userId))) : (data.filter(x => (x.EntityTypeId != LeadGenType.Vendor)));
      }
    });
  }

  getStageTodo(id) {
    return this.todoList ? this.todoList.filter(x => x.PipelineId == id) : [];
  }

  filterFunnel(data, status, userId, filterProperty) {
    if (status == this.filterByStatus.All) {
      return this.filterAllFunnel(data, status, userId, filterProperty);
    }
    else if (status == this.filterByStatus.InProgress) {
      return this.filterInprogressFunnel(data, status, userId, filterProperty);
    }
    else {
      return (userId > 0 ? (data.filter(x => x[filterProperty] == userId && x.StatusId == status)) : data.filter(x => x.StatusId == status));
    }
  }

  filterInprogressFunnel(data, status, userId, filterProperty) {
    return (userId > 0) ? (data.filter(x => (x.StatusId == status || x.StatusId == null) && x[filterProperty] == userId)) : (data.filter(x => (x.StatusId == status || x.StatusId == null)));
  }

  filterAllFunnel(data, status, userId, filterProperty) {
    return (userId > 0 ? (data.filter(x => x[filterProperty] == userId)) : data);
  }


  filterDealFunnel(data, status, userId, filterProperty, filterType) {
    if (status == this.filterByStatus.All) {
      return (userId > 0 ? (data.filter(x => (x[filterProperty] == userId) && x.AssignedType == filterType)) : data);
    }
    else if (status == this.filterByStatus.InProgress) {
      return (userId > 0) ? (data.filter(x => (x.StatusId == status || x.StatusId == null) && (x[filterProperty] == userId && x.AssignedType == filterType))) : (data.filter(x => (x.StatusId == status || x.StatusId == null)));
    }
    else {
      return (userId > 0 ? (data.filter(x => (x[filterProperty] == userId && x.AssignedType == filterType) && x.StatusId == status)) : data.filter(x => x.StatusId == status));
    }
  }

  getDealByPipeLineGroupId(id, userId) {
    if (id) {
      this.listDealService.getDealByPipeLineGroupId(id).subscribe(data => {
        if (data) {
          this.dealList = this.filterDealFunnel(data.Item1, this.filterByStatusById, userId, this.filterFunnelType.AssignedTo, this.filterFunnelType.UserType);
          this.dealContact = data.Item2;
          this.dealContactNextStep = data.Item3;
        }
      });
    }
  }

  getStageDeal(id) {
    return this.dealList ? this.dealList.filter(x => x.PipelineId == id) : [];
  }

  getVendorTodoByPipeLineGroupId(id, userId) {
    this.todoService.getTodoByPipeLineGroupId(id).subscribe(data => {
      if (data) {
        this.vendorTodoList = (userId > 0) ? (data.filter(x => (x.EntityTypeId != null && x.EntityTypeId == LeadGenType.Vendor && x.AssignedTo == userId))) : (data.filter(x => (x.EntityTypeId != null && x.EntityTypeId == LeadGenType.Vendor)));
      }
    });
  }

  getStageVendorTodo(id) {
    return this.vendorTodoList ? this.vendorTodoList.filter(x => x.PipelineId == id) : [];
  }

  getVendorByPipeLineGroupId(id, userId) {
    this.listDealService.getVendorByPipeLineGroupId(id).subscribe(data => {
      this.vendorList = this.filterFunnel(data, this.filterByStatusById, userId, this.filterFunnelType.AssignedTo);
    });
  }

  getStageVendor(id) {
    return this.vendorList ? this.vendorList.filter(x => x.PipelineId == id) : [];
  }
  getStageEvent(id) {
    return this.eventList ? this.eventList.filter(x => x.PipelineId == id) : [];
  }

  updatePipelineId(dealId, pipelineId) {
    this.listDealService.updatePipelineId(dealId, pipelineId).subscribe(data => {
      this.getPipeLineGroup('sales');
    }, err => { }, () => { });
  }

  updateTodoPipelineId(todoId, pipelineId) {
    this.todoService.updateTodoPipelineId(todoId, pipelineId).subscribe(data => {
      this.getPipeLineGroup('todo');
    }, err => { }, () => { });
  }

  updateLeadPipelineId(leadId, pipelineId) {
    this.todoService.updateLeadPipelineId(leadId, pipelineId).subscribe(data => {
      this.getPipeLineGroup('lead');
    }, err => { }, () => { });
  }


  updateReferralPipelineId(referralId, pipelineId) {
    this.addreferralService.updateReferralPipelineId(referralId, pipelineId).subscribe(data => {
      this.getPipeLineGroup('referral');
    }, err => { }, () => { });
  }

  updatePartnerPipelineId(partnerId, pipelineId) {
    this.addpartnerService.updatePartnerPipelineId(partnerId, pipelineId).subscribe(data => {
      this.getPipeLineGroup('partner');
    }, err => { }, () => { });
  }

  updateVendorTodoPipelineId(todoId, pipelineId) {
    this.todoService.updateTodoPipelineId(todoId, pipelineId).subscribe(data => {
      this.getPipeLineGroup('vendortodo');
    }, err => { }, () => { });
  }

  updateVendorPipelineId(vendorId, pipelineId) {
    this.todoService.updateVendorPipelineId(vendorId, pipelineId).subscribe(data => {
      this.getPipeLineGroup('vendor');
    }, err => { }, () => { });
  }

  updateEventPipelineId(eventId, pipelineId) {
    
    this.addEventService.updateEventPipelineId(eventId, pipelineId).subscribe(data => {
      this.getPipeLineGroup('Event');
    }, err => { }, () => { });
  }

  updateServicePipelineId(serviceId, pipelineId) {
    this.jobService.updateServicePipelineId(serviceId, pipelineId).subscribe(data => {
      this.getPipeLineGroup('service');
    }, err => { }, () => { });
  }

  updateServicePipelineStatus(id, status) {
    this.jobService.updateServicePipelineStatus(id, status).subscribe(data => {

      if (data != null) {
        //this.dragElement.StatusId = data.StatusId;
        this.closeServiceCancelReason();
        this.noty.ShowNoty("Status updated.");
        this.getPipeLineGroup('service');
      }
    }, err => { }, () => { });
  }


  updatePipelineStatus(dealId, status) {
    this.listDealService.updateStatusId(dealId, status).subscribe(data => {
      if (data != null) {
        this.dragElement.StatusId = data.StatusId;
        this.noty.ShowNoty("status updated.");
      }
    }, err => { }, () => { });
  }
  changeFormatDate(date) {
    let resultDate = new Date(date);
    let result = resultDate.toLocaleDateString() + ' ' + (resultDate.toLocaleTimeString().split(':')[0]) + ':' + (resultDate.toLocaleTimeString().split(':')[1]) + '' + (resultDate.toLocaleTimeString().split(':')[2]).split(' ')[1];
    return result;
  }
  getLastActionDate(deal) {
    if (deal.DealId) {
      let dealContacts = this.dealContact.filter(_x => _x.DealId == deal.DealId);
      if (dealContacts.length > 0) {
        let dealContactNextSteps = [];
        let lastDealContact = dealContacts[dealContacts.length - 1];
        let nextStep = this.dealContactNextStep.find(_z => _z.DealContactId == lastDealContact.Id);
        if (nextStep)
          dealContactNextSteps.push(nextStep);
        if (dealContactNextSteps.length > 0) {
          let lastActionDate = this.changeFormatDate(dealContactNextSteps[dealContactNextSteps.length - 1].StartDate);
          deal.SortProperty = dealContactNextSteps[dealContactNextSteps.length - 1].StartDate;
          return lastActionDate;
        }
        else {
          let lastActionDate = this.changeFormatDate(dealContacts[dealContacts.length - 1].StartDate);
          deal.SortProperty = dealContacts[dealContacts.length - 1].StartDate;
          return lastActionDate;
        }
      }
      else {
        let estimationDate = this.dealList.find(x => x.DealId == deal.DealId).EstimationDate;
        let lastActionDate = this.changeFormatDate(estimationDate);
        deal.SortProperty = estimationDate
        return lastActionDate;
      }
    }
  }
}
