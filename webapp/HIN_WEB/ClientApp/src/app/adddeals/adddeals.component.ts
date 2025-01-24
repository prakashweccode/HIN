
import { Component, OnInit, ViewChild, QueryList, ViewChildren, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users';
import { Organization } from '../model/organization';
import { Label } from '../model/label';
import { UserDetail } from '../login/login';
import { NotyHelper } from '../helper/NotyHelper';
import { AdddealsService } from './adddeals.service';
import { Deal } from '../model/deal';
import { ListorganizationService } from '../listorganization/listorganization.service';
import { Datashared } from '../helper/datashared';
import { ListdealsService } from '../listdeals/listdeals.service';
import { PipelineGroup, Pipeline } from '../model/pipeline';
import { Contactinformation, DealContact } from '../contactinformation/contactinformation';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { LeadGenType } from '../helper/LeadGenType';
import { Lead, SocialMediaType } from '../model/lead';
import { AddleadsService } from '../addleads/addleads.service';
import { AddeventshowService } from '../addeventshow/addeventshow.service';
import { Eventshow } from '../model/eventshow';
import { NotesInformation } from '../notesinfo/notesinfo';
import { NotesinfoService } from '../notesinfo/notesinfo.service';
import { CustomsectionComponent } from '../customsection/customsection.component';
import { CustomProperty, CustomPropertyValues, DbPropertyTypes, CustomFieldListItems } from '../custom-fields/custom-fields';
import { CustomFieldsService } from '../custom-fields/custom-fields.service';
import { Pipelinegrouptypeid } from '../helper/pipelinegrouptypeid';
import { AddgroupService } from '../addgroup/addgroup.service';
import { UserGroups } from '../addgroup/addgroup';
import { ModalService } from '../loader.service';
import { AddquoteService } from '../addquote/addquote.service';
import { Quote } from '../model/quote';
import { Assignedtogrid } from '../assignedtogrid/assignedtogrid';
import { time } from 'console';
import { SumPipe } from '../helper/sum.pipe';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { Timecost } from '../model/timecost';
import { Materialcost } from '../model/materialcost';
import { Dealstatus, ServiceStatus } from '../helper/dealstatus';
import { Networking } from '../model/networking';
import { Vendor } from '../model/vendor';
import { Partner } from '../model/partner';
import { Referral } from '../model/referral';
import * as moment from 'moment';
import { Services } from '../model/services';
import { Providerstatus } from '../model/providerstatus';
import { OnedrivegraphService } from '../onedriveservice/onedrivegraph.service';

@Component({
  selector: 'app-adddeals',
  templateUrl: './adddeals.component.html',
  styleUrls: ['./adddeals.component.css']
})
export class AdddealsComponent implements OnInit {
  opportunityActualCost: number = 0;
  socialMediaTypes: Array<SocialMediaType>;
  listNetworking: Array<Networking> = [];
  listNetworkContact: Array<Contactinformation> = [];
  contactModal: boolean = false;
  newContactToggle: boolean = false;
  listVendor: Array<Vendor> = [];
  listOfNotPayRefferalVendor: Array<Vendor> = [];
  listPartner: Array<Partner> = [];
  listReferral: Array<Referral> = [];
  internalSalesUsers: Array<Users> = [];
  isSaveDisabled: boolean = false;
  listOfTimeDuration: Array<any> = [{ Id: 5, Name: 'One Time Sale' }, { Id: 1, Name: 'Weekly' }, { Id: 2, Name: 'Monthly' }, { Id: 3, Name: 'Quarterly' }, { Id: 4, Name: 'Yearly' }];
  expectedRevenuDurationTitle: string;
  expectedRevenuPerDurationTitle: string;
  costToggle: boolean = false;
  stepDetails: any;
  public listDeal: Array<any> = [];
  showStepsCost: boolean = false;
  wonToggle: boolean = false;
  assignedToGrid: Assignedtogrid = new Assignedtogrid();
  notesToggle: boolean = false;
  listViewNotes: Array<any> = [];
  viewNoteDetails: string;
  stepToggle: boolean = false;
  @ViewChildren(CustomsectionComponent) public CustomFieldSection: QueryList<CustomsectionComponent>;
  constructor(private notesService: NotesinfoService, private customFieldService: CustomFieldsService, private leadService: AddleadsService, private contactService: ContactinformationService, public router: Router, private userService: UsersService, private organizationService: ListorganizationService, private adddealsService: AdddealsService, private notyHelper: NotyHelper, public dataShared: Datashared, public listDealService: ListdealsService, public addEventShowService: AddeventshowService, public addGroupService: AddgroupService, public modalService: ModalService, public addQuoteService: AddquoteService, private graphService: OnedrivegraphService) { }
  UserDetails: Array<Users> = [];
  notesInfos: Array<NotesInformation> = [];
  customFields: Array<CustomProperty> = [];
  leftDealCustomFieldValues: Array<CustomPropertyValues> = [];
  rightDealCustomFieldValues: Array<CustomPropertyValues> = [];
  dealPercentLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  dealPercentRightCustomFieldValues: Array<CustomPropertyValues> = [];
  dealRequirementsLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  dealRequirementsRightCustomFieldValues: Array<CustomPropertyValues> = [];
  dealCostLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  dealCostRightCustomFieldValues: Array<CustomPropertyValues> = [];
  ownerDetails: Array<Users> = [];
  organizations: Array<Organization> = [];
  deals: Array<Deal> = [];
  lstLeads: Array<Lead> = [];
  lead: Deal = new Deal();
  labels: Array<Label> = [{ Id: 1, Name: "Hot" }, { Id: 2, Name: "Cold" }, { Id: 3, Name: "Warm" }];
  loggedUser: UserDetail;
  selectedUser: Users;
  selectedDeal: Deal;
  reasonNotes: boolean = false;
  selectedOrg: Organization;
  ownerName: string;
  ownerToggle: boolean;
  addCustomToggle: boolean = false;
  listPipeLineGroup: Array<PipelineGroup>;
  listEventShow: Array<Eventshow>;
  listAllServices: Array<Services> = [];
  selectedPipeIndex = 0;
  disableLead = false;
  public listofPipeline: Array<Pipeline>;
  activeContainer: string = 'tab1';
  contactInformations: Array<Contactinformation> = [];
  entityTypeId: number;
  entityType: number = LeadGenType.Deal;
  public entityNumber: string;
  dealInformationentityType: number = LeadGenType.DealInformation;
  dealPercent: number = LeadGenType.DealPercent;
  dealRequirements: number = LeadGenType.DealRequirements;
  dealCost: number = LeadGenType.DealCost;
  entityId: number;
  public dbPropertyTypes: Array<DbPropertyTypes> = [];
  public customField: CustomProperty = new CustomProperty;
  eventShow: Eventshow;
  dealContacts: Array<DealContact> = [];
  selectedDealContact = new DealContact();
  public showListItem: boolean = false;
  public lstCustomFieldListItems: Array<CustomFieldListItems> = [];
  userId: number;
  users: Array<Users> = [];
  dragElement: any;
  dropElement: any;
  permissionBaseValue: any;
  public lstGroups: Array<UserGroups>;
  listQuote: Array<Quote> = [];
  listOfTimeCost: Array<Timecost> = [];
  listOfMaterialCost: Array<Materialcost> = [];
  showAddress: boolean = true;
  public listOfStatus: Array<Providerstatus> = [];
  allUsers: Array<Users> = [];

  ngOnInit() {
    this.getSocialMediaType();
    this.getAllNetworking();
    this.getVendor();
    this.getPartner();
    this.getReferral();
    this.getInternalSalesUsers();
    this.getListOfStatus();
    this.loggedUser = JSON.parse(localStorage.getItem("userDetail"));
    this.userId = this.loggedUser.User.UserId;
    this.lead.Owner = this.loggedUser.User.UserId;
    this.ownerName = this.loggedUser.User.FirstName;
    this.getUsers();
    this.getAllUsers();
    this.getEventShow();
    this.getPipeLineGroup();
    this.getAllLeads();
    this.getUserGroups();
    let dealData = new Deal();
    this.permissionBaseValue = this.dataShared.getPermissionBaseValue();
    dealData = this.dataShared.getValue();
    if (dealData) {
      this.lead = dealData;
      this.getDealById(this.lead.DealId);
      if (!(this.lead.ExpectedRevenuId && this.lead.ExpectedRevenuDuration && this.lead.ExpectedRevenuPerDuration)) {
        this.lead.ExpectedRevenuId = 4;
        this.lead.ExpectedRevenuDuration = 1;
        this.lead.ExpectedRevenuPerDuration = parseInt(this.lead.ExpectedRevenue);
        this.expectedRevenuDurationTitle = "No of Years";
        this.expectedRevenuPerDurationTitle = "Per Year";
      }

      this.getStepDetails(this.lead);
      if (this.lead.DealId)
        this.entityNumber = this.lead.DealNumber;
      if (this.lead.StatusId == Dealstatus.Lost || this.lead.StatusId == Dealstatus.Cancel) {
        this.reasonNotes = true;
      }
      this.entityId = this.lead.DealId;
      this.lead.Owner = this.lead.Owner ? this.lead.Owner : this.userId;
      this.lead.AssignedTo = this.lead.AssignedTo ? this.lead.AssignedTo : this.userId;
      //this.populateCustomFields(this.lead.LeadId);
      this.getAllDealServices(this.lead.DealId);
      this.getContactInformation(LeadGenType.Deal, this.lead.DealId);
      this.getDealProposal(this.lead.DealId);
      this.LoadNotes(this.lead.DealId, LeadGenType.Deal);
      this.disableLead = true;
      if (this.lead.PipelineGroupId > 0) {
        this.getPipeLineByPipeLineGroupId(this.lead.PipelineGroupId);
      }
      if (this.lead.ProviderNetworkingId)
        this.populateNetworkContact(this.lead.ProviderNetworkingId);
    }
    else {
      this.lead.StatusId = Dealstatus.InProgress;
      this.lead.Owner = this.userId;
      this.lead.AssignedTo = this.userId;
      this.lead.AssignedType = "User";
      this.lead.ExpectedRevenuId = 4;
      this.lead.ExpectedRevenuDuration = 1;
      this.lead.ExpectedRevenuPerDuration = 0;
      this.expectedRevenuDurationTitle = "No of Years";
      this.expectedRevenuPerDurationTitle = "Per Year";
      this.getLastIndentId("P");
    }
    this.getCustomFieldType();
    this.lstCustomFieldListItems.push(new CustomFieldListItems());
    var leadData = this.dataShared.getLeadValue();
    if (leadData) {
      this.lead.LeadId = leadData.LeadId;
      this.disableLead = true;
    }
    var pipelineData = this.dataShared.getPipelineValue();
    if (pipelineData) {
      this.lead.PipelineGroupId = pipelineData.pipelineGroupId;
      this.lead.PipelineId = pipelineData.pipeline.PipelineId;
      this.getPipeLineByPipeLineGroupId(this.lead.PipelineGroupId);
    }
    if (this.lead.DealId)
      this.getDealContacts(this.lead.DealId, this.entityType);
    this.getAssignedToGridData();
    //this.getAllTotalCost(this.stepDetails.Item2);
  }

  getListOfStatus() {
    this.adddealsService.getProviderStatus().subscribe(data => {
      this.listOfStatus = data;
    }, err => { }, () => { });
  }

  copyAddressFromLead(deal, evt) {
    if (deal.LeadId) {
      let oLead = this.lstLeads.find(x => x.LeadId == deal.LeadId);
      deal.Address = oLead.Address;
      deal.City = oLead.City;
      deal.State = oLead.State;
      deal.ZipCode = oLead.ZipCode;
      deal.Country = oLead.Country;
      this.notyHelper.ShowNoty("Address Copied.");
    }
    else {
      this.notyHelper.ShowNoty("Please select lead.");
    }
  }
  getServiceStatusById(id) {
    return ServiceStatus[id];
  }
  getDealById(id) {
    this.adddealsService.getDealById(id).subscribe(data => {
      this.lead = data;
    }, err => { }, () => { });
  }
  getAllDealServices(dealId) {
    if (dealId) {
      this.addQuoteService.getAllDealServices(dealId).subscribe(data => {
        if (data) {
          this.listAllServices = data;
        }
      }, err => { }, () => { });
    }
  }
  addNewService(lead) {
    if (lead.LeadId) {
      this.dataShared.setLeadValue(this.lstLeads.find(x => x.LeadId == lead.LeadId));
      this.router.navigate(['/addservice']);
    }
    else
      this.router.navigate(['/addservice']);
  }
  redirectToService(service) {
    this.dataShared.setValue(service);
    this.router.navigate(['/editservice']);
  }

  changeTimeDurationAmount(id) {
    this.lead.ExpectedRevenuId = id;
    switch (id) {
      case 1:
        this.lead.ExpectedRevenuDuration = 52;
        this.lead.ExpectedRevenuPerDuration = parseInt(this.lead.ExpectedRevenue) / this.lead.ExpectedRevenuDuration;
        break;
      case 2:
        this.lead.ExpectedRevenuDuration = 12;
        this.lead.ExpectedRevenuPerDuration = parseInt(this.lead.ExpectedRevenue) / this.lead.ExpectedRevenuDuration;
        break;
      case 3:
        this.lead.ExpectedRevenuDuration = 4;
        this.lead.ExpectedRevenuPerDuration = parseInt(this.lead.ExpectedRevenue) / this.lead.ExpectedRevenuDuration;
        break;
      case 4:
        this.lead.ExpectedRevenuDuration = 1;
        this.lead.ExpectedRevenuPerDuration = parseInt(this.lead.ExpectedRevenue) / this.lead.ExpectedRevenuDuration;
        break;
      case 5:
        this.lead.ExpectedRevenuDuration = 1;
        this.lead.ExpectedRevenuPerDuration = parseInt(this.lead.ExpectedRevenue) / this.lead.ExpectedRevenuDuration;
        break;
    }
  }

  getdurationTitle(id) {
    switch (id) {
      case 1:
        return "No of Weeks";
      case 2:
        return "No of Months";
      case 3:
        return "No of Quarters";
      case 4:
        return "No of Years";
      case 5:
        return "One Time Sale";
    }
  }

  getCostTitle(id) {
    switch (id) {
      case 1:
        return "Sales Per Week";
      case 2:
        return "Sales Per Month";
      case 3:
        return "Sales Per Quarter";
      case 4:
        return "Sales Per Year";
      case 5:
        return "One Time Sale";
    }
  }

  calculateExpectedAmount() {
    this.lead.ExpectedRevenue = (Math.ceil(this.lead.ExpectedRevenuDuration * this.lead.ExpectedRevenuPerDuration)).toString();
    return this.lead.ExpectedRevenue;
  }


  getAllNetworking() {
    this.leadService.getAllNetworkings().subscribe(data => {
      if (data)
        this.listNetworking = data;
    });
  }

  getInternalSalesUsers() {
    this.userService.getUsers().subscribe(data => {
      this.internalSalesUsers = data.filter(x => x.IsSales);
    });
  }

  getSocialMediaType() {
    this.leadService.getSocialMediaType().subscribe(data => {
      if (data != null)
        this.socialMediaTypes = data;
    }, err => { }, () => { });
  }

  getSocialMediaTypeNameById(id) {
    var socialMediaName = this.socialMediaTypes.find(x => x.Id == id).Name;
    return socialMediaName;
  }

  populateNetworkContact(networkingId) {
    this.contactService.getContactInformation(LeadGenType.Networking, networkingId, true).subscribe(data => {
      if (data)
        this.listNetworkContact = data;
    }, err => { }, () => { });
  }

  changeNetWorkContact(networkingId) {
    this.lead.ProviderNetworkingContactId = null;
    this.contactService.getContactInformation(LeadGenType.Networking, networkingId, true).subscribe(data => {
      if (data)
        this.listNetworkContact = data;
    }, err => { }, () => { });
  }

  viewContactModal(id) {
    this.dataShared.setValue(id);
    this.contactModal = true;
  }

  getNetWorkContactName(id) {
    if (id != 0 || id != null) {
      if (this.listNetworkContact.length > 0) {
        var contactName = this.listNetworkContact.find(x => x.Id == id).ContactName;
        return contactName;
      }
    }
  }

  clearData() {
    this.lead.ProviderNetworkingContactId = null;
  }

  closeContactModal() {
    this.contactModal = false;
  }

  addNetworkContact() {
    var entityId = this.dataShared.getValue();
    if (entityId) {
      this.dataShared.setValue(entityId);
      this.contactModal = false;
      this.newContactToggle = true;
    }
  }

  selectContact(Id) {
    if (Id) {
      this.lead.ProviderNetworkingContactId = Id;
      this.contactModal = false;
    }
  }

  getVendor() {
    this.addEventShowService.getVendor().subscribe(data => {
      if (data != null) {
        this.listVendor = data;
        this.listOfNotPayRefferalVendor = data.filter(x => x.IsNotPayReferral == true);
      }
    });
  }

  getPartner() {
    this.addEventShowService.getPartner().subscribe(data => {
      if (data != null) {
        this.listPartner = data;
        //this.listOfNotPayRefferalVendor = data.filter(x => x.IsNotPayReferral == true);
      }
    });
  }

  getReferral() {
    this.addEventShowService.getReferral().subscribe(data => {
      if (data != null) {
        this.listReferral = data;
        //this.listOfNotPayRefferalVendor = data.filter(x => x.IsNotPayReferral == true);
      }
    });
  }


  reloadCurrentRoute() {
    let currentUrl = this.router.url.split('(')[0];
    this.dataShared.setPermissionBaseValue(this.permissionBaseValue);
    this.permissionBaseValue = this.dataShared.getPermissionBaseValue();
    this.dataShared.setValue(this.lead);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  getStepDetails(deal) {
    this.adddealsService.getStepDetails(deal).subscribe(data => {
      if (data) {
        this.stepDetails = data;
        this.opportunityActualCost = this.getAllTotalCost(this.stepDetails, this.lead.LeadCost);
      }
    }, err => { }, () => { });
  }

  parseNumber(data) {
    if (isNaN(data)) {
      return 0;
    }
    else {
      return Math.round(data);
    }
  }

  getTotalTimeCost(timeCosts) {
    if (timeCosts && timeCosts.length > 0) {
      const sumPipe = new SumPipe();
      let totalTimeCost = sumPipe.timeCalculationMultiple(timeCosts, "Cost", "TotalTime");
      return this.parseNumber(totalTimeCost);
    }
    else {
      return 0;
    }
  }

  openCostModal(data) {
    this.listOfTimeCost = data.Item3;
    this.listOfMaterialCost = data.Item2;
    this.activeContainer = "TimeCost";
    this.costToggle = true;
  }

  closeCostModal() {
    this.listOfMaterialCost = [];
    this.listOfTimeCost = [];
    this.costToggle = false;
  }

  getTotalMaterialCost(materialCosts) {
    if (materialCosts && materialCosts.length > 0) {
      const sumPipe = new SumPipe();
      let totalMaterialCost = sumPipe.transformMultiple(materialCosts, "Quantity", "Price");
      return this.parseNumber(totalMaterialCost);
    }
    else {
      return 0;
    }
  }

  getTotalCost(timeCost, materialCost) {
    let totalTimeCost = this.getTotalTimeCost(timeCost);
    let totalMaterialCost = this.getTotalMaterialCost(materialCost);
    return this.parseNumber(totalTimeCost + totalMaterialCost);
  }
  getAllTotalCost(stepDetails, oppCost) {
    let totalOpportunityAmount = 0;
    stepDetails.Item2.forEach(data => {
      totalOpportunityAmount += this.getTotalCost(data.Item3, data.Item2);
    });
    if (oppCost)
      return (totalOpportunityAmount + parseFloat(oppCost));
    else
      return totalOpportunityAmount;
  }


  noAllowDrop(ev) {
    ev.stopPropagation();
  }
  getAssignedToGridData() {
    this.assignedToGrid.ApiUrl = "api/AssignedName/GetUserandPartnerName";
    this.assignedToGrid.AssignedToId = this.lead.AssignedTo;
    this.assignedToGrid.AssignedToType = this.lead.AssignedType;
    this.assignedToGrid.Title = "Assigned To";
    this.assignedToGrid.KeyId = "Id";
    this.assignedToGrid.KeyValue = "Type";
    this.assignedToGrid.DisplayName = "Name";
    this.assignedToGrid.GridHeaders = [
      { displayName: 'Name', propertyName: 'Name' },
      { displayName: 'Type', propertyName: 'Type' }
    ];
  }


  LoadNotes(entityId, entityTypeId) {
    this.notesService.LoadNotes(entityId, entityTypeId).subscribe(data => {
      if (data) {
        this.notesInfos = data;
      }
    }, err => { }, () => { });
  }

  selectAssignedValue(evt) {
    this.lead.AssignedTo = evt.Id;
    this.lead.AssignedName = evt.Name;
    this.lead.AssignedType = evt.Type;
  }

  selectedOpportunityStatus(evt) {
    if (evt) {
      this.lead.StatusId = evt;
      this.lead.StatusDate = new Date();
      if (evt == 3 || evt == 4) {
        this.reasonNotes = true;
      }
      else if (evt == 1) {
        this.lead.Percentage = "100";
        this.wonToggle = true;
      }
      else if (evt == 5) {
        this.lead.ActualAmount = 0;
        this.lead.Percentage = "0";
      }
      else {
        this.lead.CancelReason = "";
        this.reasonNotes = false;
      }
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  getCalendarInviteTypeName(id) {
    if (id) {
      var status = "";
      status = id == 1 ? "Zoom Id" : id == 2 ? "Cell Number" : id == 3 ? "Email" : id == 4 ? "Office Number" : "";
      return status;
    }
  }

  assignLeadToDeal(leadId) {
    if (leadId)
      this.lead.LeadId = leadId;
  }
  deleteListItem(data) {
    this.lstCustomFieldListItems = this.lstCustomFieldListItems.filter(item => item !== data);
  }
  getAllLeads() {
    this.leadService.getAllLeads().subscribe(data => {
      if (data) {
        this.lstLeads = data;
      }
    }, err => { }, () => { });
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

  getContactInformation(entityType, entityId) {
    this.contactService.getContactInformation(entityType, entityId, false).subscribe(data => {
      if (data != null)
        this.contactInformations = data;
    }, err => { }, () => { });
  }
  userSearch(evt) {
    if (evt.target.value.length > 2) {
      this.userService.getUser(evt.target.value).subscribe(data => {
        this.UserDetails = data;
      }, err => {
        this.UserDetails = [];
      }, () => { });
    }
    else {
      this.UserDetails = [];
    }
  }
  gotoSteps() {
    this.dataShared.setValue(this.lead);
    this.router.navigate(['/opportunityview']);
  }
  dealChanged(evt) {
    this.lead.CurrencyId = evt;

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

  createJobOrService(deal) {
    this.dataShared.setOppValue(deal);
    this.router.navigate(['/addservice']);
  }

  editLead() {
    this.dataShared.setValue(this.lstLeads.find(x => x.LeadId == this.lead.LeadId));
    this.router.navigate(['/addleads']);
  }

  editLeadModal() {
    this.dataShared.setValue(this.lstLeads.find(x => x.LeadId == this.lead.LeadId));
    this.navigate('addleadsmodal', true)
  }

  getPipeLineGroup() {
    this.listDealService.getPipeLineGroup().subscribe(data => {
      this.listPipeLineGroup = data.filter(x => x.PipelineGroupType == Pipelinegrouptypeid.Sales);
      if (this.lead.PipelineGroupId == -1) {
        if (this.listPipeLineGroup.length > 0) {
          this.lead.PipelineGroupId = this.listPipeLineGroup[this.listPipeLineGroup.length - 1].PipelineGroupId;
        }
        else {
          this.lead.PipelineGroupId = 0;
        }
        this.getPipeLineByPipeLineGroupId(this.lead.PipelineGroupId);
      }

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
          this.selectedPipeIndex = this.listofPipeline.findIndex(x => x.PipelineId == this.lead.PipelineId);
          if (this.selectedPipeIndex == -1) {
            this.selectedPipeIndex = 0;
            this.lead.PipelineId = this.listofPipeline[this.selectedPipeIndex].PipelineId;
          }
        });
      }
    }


  }

  sortBy(prop: string) {
    return this.listofPipeline ? this.listofPipeline.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1) : [];
  }


  backToList() {
    this.router.navigate(['/listdeals']);
  }
  backToFunnel() {
    this.router.navigate(['/funnel']);
  }

  orgSearch(evt) {
    this.organizationService.getOrg(evt.target.value).subscribe(data => {
      this.organizations = data;
    }, err => {
      this.organizations = [];
    }, () => { });
  }

  dealNameSearch(evt) {
    this.adddealsService.getDeal(evt.target.value).subscribe(data => {
      this.deals = data;
    }, err => {
      this.deals = [];
    }, () => { });
  }

  ownerSearch(evt) {
    this.userService.getUser(evt.target.value).subscribe(data => {
      this.ownerDetails = data;
    }, err => {
      this.ownerDetails = [];
    }, () => { });
  }
  eventOnChange(eventId) {
    if (eventId)
      this.eventShow = this.listEventShow.find(x => x.Id == eventId);
    if (this.eventShow) {
      this.lead.OriginsWebsite = this.eventShow.Website;
    }
  }
  changeFormatDate(date) {
    if (date)
      return date.split(':')[0] + ':' + date.split(':')[1];
  }

  changeEstimateDateFormat(date) {
    if (date) {
      return date.split('T')[0];
    }
    else {
      let currentdate = new Date();
      //this.lead.EstimationDate = currentdate;
      return currentdate.getFullYear() + '-' + (currentdate.getMonth() < 10 ? ('0' + (currentdate.getMonth() + 1)) : currentdate.getMonth() + 1) + '-' + (currentdate.getDate() < 10 ? ('0' + (currentdate.getDate())) : (currentdate.getDate()));
    }
  }

  changeDealContactFormatDate(date) {
    if (date) {
      if (Object.prototype.toString.call(date) === "[object Date]")
        return date.getFullYear() + '-' + (date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? ('0' + (date.getDate())) : (date.getDate())) + 'T' + (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
      else {
        let clonedDate = new Date(date);
        return clonedDate.getFullYear() + '-' + (clonedDate.getMonth() < 10 ? ('0' + (clonedDate.getMonth() + 1)) : clonedDate.getMonth() + 1) + '-' + (clonedDate.getDate() < 10 ? ('0' + (clonedDate.getDate())) : (clonedDate.getDate())) + 'T' + (clonedDate.getHours() < 10 ? ('0' + clonedDate.getHours()) : clonedDate.getHours()) + ':' + (clonedDate.getMinutes() < 10 ? ('0' + clonedDate.getMinutes()) : clonedDate.getMinutes());
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

  UpdateDealContact(dealContact) {
    dealContact.DealId = this.lead.DealId;
    dealContact.EntityTypeId = LeadGenType.Deal;
    this.contactService.UpdateDealContact(dealContact).subscribe(data => {
      if (data != null)
        this.selectedDealContact = data;
      this.notyHelper.ShowNoty("Deal information saved !!!");
    }, err => { }, () => { });
  }
  getLastIndentId(firstLetter) {
    this.contactService.getNewEntityId('Deal', firstLetter).subscribe(data => {
      if (data) {
        this.lead.DealNumber = data.EntityNumber;
      }
    }, err => { }, () => { });
  }
  saveDeal() {
    if (!this.lead.EstimationDate) {
      this.lead.EstimationDate = this.changeEstimateDateFormat(new Date().toISOString());
    }
    if (!this.lead.SecurityGroupId || !this.lead.PipelineGroupId || !this.lead.DealName) {
      this.notyHelper.ShowNoty("Please fill all required fields");
    }
    //if (this.reasonNotes && !this.lead.CancelReason) {
    //  this.notyHelper.ShowNoty("Please enter the reason");
    //}
    else {
      this.isSaveDisabled = true;
      this.adddealsService.saveDeal(this.lead).subscribe(data => {
        if (data) {
          this.lead = data;
          if (this.contactInformations.length > 0) {
            for (let i = 0; i < this.contactInformations.length; i++) {
              this.contactInformations[i].EntityId = data.DealId;
              this.contactInformations[i].Type = this.entityType;
            }
            this.contactService.SaveContactInfos(this.contactInformations).subscribe(data => { }, err => { }, () => { });
            //this.CustomFieldSection.SaveCustomFieldValues(data.DealId);
          }
          this.CustomFieldSection.forEach(x => {
            x.SaveCustomFieldValues(data.DealId)
          });
          this.getContactInformation(LeadGenType.Deal, this.lead.DealId);
          this.notyHelper.ShowNoty("Data saved successfully !!!");
          this.isSaveDisabled = false;
          //this.router.navigate(['/listdeals']);
          //Create practice folder in onedrive
          //var practice = this.lstLeads.find(x => x.LeadId == this.lead.LeadId);
          //if (practice) {
          //  let content = {
          //    "name": this.lead.DealNumber,
          //    "folder": {},
          //    "@microsoft.graph.conflictBehavior": "rename"
          //  }
          //  this.CreatePracticeFolder(content, practice.BatchNumber);
          //}

        }


      }, err => {

      }, () => { });
    }
  }

  CreatePracticeFolder(content: any, emrNo: string) {
    let status = this.graphService.checkIfPraticeFolderExist(content, emrNo);
    //if (status == 'itemNotFound') {
    //  this.graphService.CreatePatientAppointmentDirectory(content, appointmentNo);
    //}
  }

  getEventShow() {
    this.addEventShowService.getEventShow().subscribe(data => {
      this.listEventShow = data;
    });
  }
  getCustomFieldType() {
    this.customFieldService.getCustomFieldType().subscribe(data => {
      if (data != null) {
        this.dbPropertyTypes = data;
      }
    }, err => { }, () => { });
  }


  addCustomFields() {
    this.addCustomToggle = true;
    this.customField.EntityTypeId = LeadGenType.Deal;
  }

  saveSuccess(evt) {
    if (evt) {
      this.addCustomToggle = false;
    }
  }

  saveWonAmount(evt) {
    if (evt) {
      this.lead = evt;
      this.wonToggle = false;
    }
  }


  dataExist(evt) {
    if (evt) {
      this.notyHelper.ShowNoty("Column already exist!");
    }
  }
  addDealInformationCustomField() {
    this.entityTypeId = LeadGenType.Deal;
    this.addCustomToggle = true;
  }

  addDealPercentCustomField() {
    this.entityTypeId = LeadGenType.DealPercent;
    this.addCustomToggle = true;
  }

  addDealRequirementsCustomField() {
    this.entityTypeId = LeadGenType.DealRequirements;
    this.addCustomToggle = true;
  }

  addDealCostCustomField() {
    this.entityTypeId = LeadGenType.DealCost;
    this.addCustomToggle = true;
  }

  closeError() {
    this.addCustomToggle = false;
    this.showListItem = false;
    this.wonToggle = false;
    this.customField = new CustomProperty();
    this.lstCustomFieldListItems = [];
    this.lstCustomFieldListItems.push(new CustomFieldListItems());
  }


  colorChange(colorCode) {
    this.lead.Color = colorCode;
  }
  backToCalendar() {
    this.router.navigate(['/sfcalendar']);
  }
  addNewListItem() {
    let customFieldListItem = new CustomFieldListItems();
    this.lstCustomFieldListItems.push(customFieldListItem);
  }
  typeChange(typeId) {
    if (typeId == 6 || typeId == 7) {
      this.showListItem = true;
    }
  }
  saveCustomField(customFields) {
    customFields.EntityTypeId = LeadGenType.Deal;
    this.customFieldService.saveCustomFields(customFields).subscribe(data => {
      if (data != null) {
        this.addCustomToggle = false;
        if (this.lstCustomFieldListItems.length > 0 && this.lstCustomFieldListItems[0].Description) {
          this.lstCustomFieldListItems.map(m => m.CustomPropertyId = data.Id);
          this.customFieldService.saveListItems(this.lstCustomFieldListItems).subscribe(data => {
          }, err => { }, () => { });
        }
      }
    }, err => { }, () => { });
  }
  cancelAddCustom() {
    this.addCustomToggle = false;
  }
  //getLabelName(id) {
  //  return this.labels.find(x => x.Id == id) ? this.labels.find(x => x.Id == id).Name : 'NA';
  //}
  //removeLabel(label) {
  //  this.lead.LeadLabels = this.lead.LeadLabels.filter(x => x.Id != label.Id);
  //}
  //pushLabel(label) {
  //  if (!this.assignCheck(label)) {
  //    this.lead.LeadLabels.push(label);
  //  }
  //  else {
  //    this.removeLabel(label);
  //  }
  //}
  //assignCheck(label) {
  //  return this.lead.LeadLabels.find(x => x.Id == label.Id) != undefined;
  //}

  getDealContacts(entityId, entityType) {
    if (entityId) {
      this.contactService.getDealContacts(entityId, entityType).subscribe(data => {
        if (data != null) {
          this.dealContacts = data;
          if (this.dealContacts && this.dealContacts.length > 0)
            this.DealContactChange(this.dealContacts[0].Id);
        }
      }, err => { }, () => { });
    }
  }
  DealContactChange(dealContactId) {
    if (dealContactId > 0) {
      this.selectedDealContact = this.dealContacts.find(x => x.Id == dealContactId);
      if (this.selectedDealContact.AssignedTo)
        this.getUserNameById(this.selectedDealContact.AssignedTo);
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
  swap() {
    var el1 = this.dragElement;
    var el2 = this.dropElement;
    var parentEment1 = el1.parentElement;
    var parentEment2 = el2.parentElement;
    while (parentEment1.firstChild) {
      parentEment1.removeChild(parentEment1.lastChild);
    }
    parentEment1.appendChild(el2);
    while (parentEment2.firstChild) {
      parentEment2.removeChild(parentEment2.lastChild);
    }
    parentEment2.appendChild(el1);
  }
  drop(ev) {
    console.log("drop");
    console.log(ev);
    ev.preventDefault();
    this.dropElement = ev.target.draggable ? ev.target : ev.target.parentElement;
    this.swap();
    this.rmClass(this.dropElement);
    this.rmClass(this.dragElement);
  }
  dragLeave(ev) {
    ev.preventDefault();
    if (ev.target.draggable) {
      this.rmClass(ev.target);
    }
    else {
      this.rmClass(ev.target.parentElement);
    }

  }
  addClass(elm) {
    var element, name, arr;
    element = elm;
    name = "w3-green w3-center w3-round-large w3-large w3-animate-opacity";
    arr = element.className.split(" ");
    if (arr.indexOf(name) == -1) {
      element.className += " " + name;
    }
  }
  rmClass(elm) {
    elm.className = elm.className.replace(/\bw3-green w3-center w3-round-large w3-large w3-animate-opacity\b/g, "");
  }
  dragOver(ev) {
    ev.preventDefault();
    if (ev.target.draggable) {
      this.addClass(ev.target);
    }
    else {
      this.addClass(ev.target.parentElement);
    }
  }
  drag(ev) {
    console.log("drag");
    console.log(ev);
    this.dragElement = ev.target.draggable ? ev.target : ev.target.parentElement;
  }
  getUserGroups() {
    this.addGroupService.GetUserGroups().subscribe(data => {
      if (data) {
        this.lstGroups = data;
        if (!this.lead.SecurityGroupId || this.lead.SecurityGroupId < 1) {
          if (this.lstGroups.length > 0) {
            var adminGroup = this.lstGroups.find(x => x.Name == "admin");
            if (adminGroup) {
              this.lead.SecurityGroupId = adminGroup.UserGroupId;
            }
          }
        }
      }
    }, err => {

    });
  }

  getDealProposal(dealId) {
    if (dealId) {
      this.addQuoteService.getDealProposal(dealId).subscribe(data => {
        if (data)
          this.listQuote = data;
      }, err => { }, () => { });
    }
  }


  addNewQuote() {
    this.navigate('addquotemodal', true);
  }
  viewQuote(event) {
    this.dataShared.setValue(event);
    this.navigate('addquotemodal', true);
  }
  addNewFunnel() {
    this.navigate('pipelinemodal', true);
  }
  calculateCreatedByDays(date) {
    if (date) {
      var start = moment(date);
      var end = moment(new Date());
      return end.diff(start, "days");
    }
    else {
      return 0;
    }
  }

  setCurrentDateTime() {
    if (this.lead.DealId > 0) { }
    else { this.lead.StartDate = new Date(); }
  }
  getAssignedNameById(userId) {
    if (userId) {
      var user = this.allUsers.find(x => x.UserId == userId);
      if (user) {
        return user.FirstName;
      }
      else {
        return "";
      }
    }
    else {
      return "";
    }
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(data => {
      this.allUsers = data;
    });
  }

}
