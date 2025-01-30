import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Users, UserCost, UserCostDropdown, UserGoal } from '../users/users';
import { AdduserService } from './adduser.service';
import { Router } from '@angular/router';
import { NotyHelper } from '../helper/NotyHelper';
import { Datashared } from '../helper/datashared';
import { AddgroupService } from '../addgroup/addgroup.service';
import { UserGroups, UserGroupMapping } from '../addgroup/addgroup';
import { Roles } from '../managerole/roles';
import { RoleserviceService } from '../managerole/roleservice.service';
import { LeadGenType } from '../helper/LeadGenType';
import { CategoryValues } from '../model/Category';
import { CategorylistService } from '../categorylist/categorylist.service';
import { EmployeeType } from '../model/EmployeeType';
import { City, Country, State } from '../model/Country';
import { th } from 'date-fns/locale';
import { CustomsectionComponent } from '../customsection/customsection.component';
import { CustomProperty, CustomPropertyValues } from '../custom-fields/custom-fields';
import { UserQuotaCalcHelper } from '../helper/user-quota-calc-helper';
import { Chartname } from '../model/chartname';
import { Userchartmapping } from '../model/userchartmapping';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Chart } from '../chart/chart';
import { ChartComponent } from '../chart/chart.component';
import { UserDetail } from '../login/login';
import { UsersService } from '../users/users.service';
import { GraphService } from '../officeauth/graph.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  dropdownSettings: IDropdownSettings = {};
  @ViewChildren(CustomsectionComponent) public CustomFieldSection: QueryList<CustomsectionComponent>;
  public passwordverified: boolean = false;
  public passwordValidation: boolean = false;
  public verificationCode: string;
  entityTypeId: number;
  public entityNumber: string;
  customFields: Array<CustomProperty> = [];
  customFieldValues: Array<CustomPropertyValues> = [];
  userLeftCustomFieldValues: Array<CustomPropertyValues> = [];
  userRightCustomFieldValues: Array<CustomPropertyValues> = [];
  addCustomToggle: boolean = false;
  public listEmployeeTypes: Array<EmployeeType> = [];
  public listCountries: Array<Country> = [];
  public listStates: Array<State> = [];
  public listCities: Array<City> = [];
  public listChartItem: Array<Chartname> = [];
  public selectedHeaderChart: Array<Chartname> = [];
  public selectedDashboardChart: Array<Chartname> = [];
  public selectedUserQuoteChart: Array<Chartname> = [];
  public selectedHeaderChartMappingArray: Array<Userchartmapping> = [];
  public selectedDashboardChartMappingArray: Array<Userchartmapping> = [];
  public selectedUserQuoteChartMappingArray: Array<Userchartmapping> = [];
  public user: Users = new Users();
  public lstRoles: Array<Roles>;
  public lstGroups: Array<UserGroups>;
  public lstUserCostDropdown: Array<UserCostDropdown>;
  public lstUserGroupMapping: Array<UserGroupMapping> = [];
  public activeContainer: string = 'tab1';
  public entityType: number = LeadGenType.User;
  public costType: number = LeadGenType.UserCost;
  public commisionType: number = LeadGenType.UserCommission;
  public employeeType: number = LeadGenType.UserEmployeeType;
  public countryType: number = LeadGenType.UserCountry;
  public userInfo: number = LeadGenType.UserInformation;
  public entityId: number;
  public selectedCategories: Array<CategoryValues> = [];
  public userCost: UserCost = new UserCost();
  public userGoal: UserGoal = new UserGoal();
  public onedrive: any;
  userId: number;
  loggedUser: UserDetail;
  userInformation: Users = new Users();
  

  constructor(public quotaCalcHelper: UserQuotaCalcHelper, private graphService: GraphService, public categoryService: CategorylistService, public roleService: RoleserviceService, public addUserService: AdduserService, public router: Router, public notification: NotyHelper, public dataShared: Datashared, public addGroupService: AddgroupService, public notyHelper: NotyHelper, public userService: UsersService) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem("userDetail"));
    if (this.loggedUser && this.loggedUser.User.UserId) {
      this.userId = this.loggedUser.User.UserId;
      this.getUserByUserId(this.userId);
    }
    this.dropdownSettings = {
      'itemsShowLimit': 0,
      showSelectedItemsAtTop: false,
      'singleSelection': false,
      'idField': 'Id',
      'textField': 'Name',
      'selectAllText': 'Select All',
      'unSelectAllText': 'UnSelect All',
      'allowSearchFilter': true
    };

    this.getChartName();
    this.getRoles();
    this.getUserGroups();
    this.getEmployeeTypes();
    this.getCountries();
    this.getUserCostDropdown();
    let userData = new Users();
    userData = this.dataShared.getValue();
    if (userData) {
      this.user = userData;
      this.user.ConfirmAdminPassword = this.user.AdminPassword;
      this.entityId = this.user.UserId;
      this.entityNumber = this.user.Email;
      this.getUserGroupMapping(this.user.UserId);
      this.user.ConfirmPassword = userData.Password;
      this.getUserCost(this.user.UserId);
      this.getUserGoal(this.user.UserId);
      this.getChartsById(this.user.UserId);
     
    }
    else {
      this.user.IsActive = true;
    }

  }

  CheckSelectedHeaderChartValue(id) {
    let data = this.selectedHeaderChart.find(x => x.Id == id);
    if (data)
      return true;
    else
      return false;
  }

  selectHeaderChar(evt) {
    if (evt) {
      let data = this.selectedHeaderChart.find(x => x.Id == evt.Id);
      if (data) {
        this.selectedHeaderChart = this.selectedHeaderChart.filter(x => x.Id != evt.Id);
      }
      else {
        var userChart = new Chartname();
        userChart.Id = evt.Id;
        userChart.Name = evt.Name;
        this.selectedHeaderChart.push(userChart);
      }
    }
  }

  CheckSelectedDashboardChartValue(id) {
    let data = this.selectedDashboardChart.find(x => x.Id == id);
    if (data)
      return true;
    else
      return false;
  }

  selectDashboardChart(evt) {
    if (evt) {
      let data = this.selectedDashboardChart.find(x => x.Id == evt.Id);
      if (data) {
        this.selectedDashboardChart = this.selectedDashboardChart.filter(x => x.Id != evt.Id);
      }
      else {
        var userChart = new Chartname();
        userChart.Id = evt.Id;
        userChart.Name = evt.Name;
        this.selectedDashboardChart.push(userChart);
      }
    }
  }

  CheckSelectedUserQuoteChartValue(id) {
    let data = this.selectedUserQuoteChart.find(x => x.Id == id);
    if (data)
      return true;
    else
      return false;
  }

  selectUserQuoteChart(evt) {
    if (evt) {
      let data = this.selectedUserQuoteChart.find(x => x.Id == evt.Id);
      if (data) {
        this.selectedUserQuoteChart = this.selectedUserQuoteChart.filter(x => x.Id != evt.Id);
      }
      else {
        var userChart = new Chartname();
        userChart.Id = evt.Id;
        userChart.Name = evt.Name;
        this.selectedUserQuoteChart.push(userChart);
      }
    }
  }

  getChartName() {
    this.addUserService.getChartName().subscribe(data => {
      if (data) {
        this.listChartItem = data;
      }
    }, err => { }, () => { });
  }


  //onHeaderSelect(evt) {
  //  this.selectedHeaderChart;
  //}

  //onHeaderSelectAll(evt) {
  //  this.selectedHeaderChart = evt;
  //}

  //onHeaderDeSelect(evt) {
  //  this.selectedHeaderChart;
  //}

  //onDashboardSelect(evt) {
  //  this.selectedHeaderChart;
  //}

  //onDashboardSelectAll(evt) {
  //  this.selectedDashboardChart = evt;
  //}

  //onDashboardDeSelect(evt) {
  //  this.selectedHeaderChart;
  //}

  //onUserQuoteSelect(evt) {
  //  this.selectedHeaderChart;
  //}

  //onUserQuoteSelectAll(evt) {
  //  this.selectedUserQuoteChart = evt;
  //}

  //onUserQuoteDeSelect(evt) {
  //  this.selectedHeaderChart;
  //}


  getChartsById(userId) {
    this.addUserService.getChartsById(userId).subscribe(data => {
      if (data) {
        this.assignHeaderChart(data.Item1);
        this.assignDashboardChart(data.Item2);
        this.assignUserQuoteChart(data.Item3);
      }
    }, err => { }, () => { });
  }

  assignHeaderChart(data) {
    if (data) {
      this.selectedHeaderChartMappingArray = data;
      this.selectedHeaderChartMappingArray.forEach(x => {
        let chartName = new Chartname();
        chartName.Id = x.ChartId;
        chartName.Name = this.listChartItem.find(x => x.Id == chartName.Id).Name;
        this.selectedHeaderChart.push(chartName);
      });
    }
    else {
      this.selectedHeaderChartMappingArray = [];
    }
  }

  assignDashboardChart(data) {
    if (data) {
      this.selectedDashboardChartMappingArray = data;
      this.selectedDashboardChartMappingArray.forEach(x => {
        let chartName = new Chartname();
        chartName.Id = x.ChartId;
        chartName.Name = this.listChartItem.find(x => x.Id == chartName.Id).Name;
        this.selectedDashboardChart.push(chartName);
      });
    }
    else {
      this.selectedDashboardChartMappingArray = [];
    }
  }

  assignUserQuoteChart(data) {
    if (data) {
      this.selectedUserQuoteChartMappingArray = data;
      this.selectedUserQuoteChartMappingArray.forEach(x => {
        let chartName = new Chartname();
        chartName.Id = x.ChartId;
        chartName.Name = this.listChartItem.find(x => x.Id == chartName.Id).Name;
        this.selectedUserQuoteChart.push(chartName);
      });
    }
    else {
      this.selectedUserQuoteChartMappingArray = [];
    }
  }

  addNewUser() {
    this.router.navigate(['/adduser']);
  }
  selectUserInfoTab() {
    if (this.user.UserId) {
      this.passwordverified = false;
      this.passwordValidation = true;
    }
    else {
      this.passwordverified = true;
    }
    this.activeContainer = "tab8";
  }


  getUserByUserId(id) {
    this.userService.getUserById(id).subscribe(data => {
      if (data) {
        this.userInformation = data;
      }
    }, err => { }, () => { });
  }

  verifyPassword(password) {
    if (this.userInformation && this.userInformation.AdminPassword) {
      if (password && password == this.userInformation.AdminPassword) {
        this.passwordValidation = false;
        this.passwordverified = true;
      }
      else {
        this.notyHelper.ShowNoty("Enter valid password");
      }
      this.verificationCode = "";
    }
  }

  commisionCustomField() {
    this.entityTypeId = this.commisionType;
    this.addCustomToggle = true;
  }
  closePasswordToggle() {
    this.passwordValidation = false;
  }
  CountryCustomField() {
    this.entityTypeId = this.countryType;
    this.addCustomToggle = true;
  }
  EmpTypeCustomField() {
    this.entityTypeId = this.employeeType;
    this.addCustomToggle = true;
  }
  UserCostCustomField() {
    this.entityTypeId = this.costType;
    this.addCustomToggle = true;
  }
  UserInfoCustomField() {
    this.entityTypeId = this.userInfo;
    this.addCustomToggle = true;
  }
  addUserCustomField(id) {
    this.entityTypeId = id;
    this.addCustomToggle = true;
  }
  MainUserCustomField() {
    this.entityTypeId = this.entityType;
    this.addCustomToggle = true;
  }

  saveSuccess(evt) {
    if (evt) {
      this.addCustomToggle = false;
    }
  }
  dataExist(evt) {
    if (evt) {
      this.notyHelper.ShowNoty("Column already exist!");
    }
  }

  closeError() {
    this.addCustomToggle = false;
  }

  getUserCost(userId) {
    this.addUserService.getUserCost(userId).subscribe(data => {
      if (data)
        this.userCost = data;
    }, err => { }, () => { });
  }
  getUserGoal(userId) {
    this.addUserService.getUserGoal(userId).subscribe(data => {
      if (data)
        this.userGoal = data;
    }, err => { }, () => { });
  }
  SkillData(data) {
    this.selectedCategories = data;
  }

  MapCategoryValues(selectedValues) {
    if (selectedValues) {
      let categoryValue = new CategoryValues();
      categoryValue.EntityId = this.user.UserId;
      categoryValue.EntityTypeId = LeadGenType.User;
      if (typeof (selectedValues) === "number") {
        categoryValue.CategoryId = selectedValues;
        this.selectedCategories.push(categoryValue);
      }
      else {
        categoryValue.CategoryId = parseInt(selectedValues.target.value);
        if (selectedValues.target.checked) {
          this.selectedCategories.push(categoryValue);
        }
        else {
          this.selectedCategories = this.selectedCategories.filter(x => x.CategoryId !== categoryValue.CategoryId);
        }
      }
    }
  }
  getCountries() {
    this.addUserService.getCountries().subscribe(data => {
      if (data)
        this.listCountries = data;
    }, err => { }, () => { });
  }

  getStatesByCountryId(countryId) {
    if (countryId > 0) {
      this.addUserService.getStatesByCountryId(countryId).subscribe(data => {
        if (data)
          this.listStates = data;
      }, err => { }, () => { });
    }
  }


  getEmployeeTypes() {
    this.addUserService.getEmployeeTypes().subscribe(data => {
      if (data)
        this.listEmployeeTypes = data;
    }, err => { }, () => { });
  }
  CheckSelectedValue(id) {
    let data = this.lstUserGroupMapping.find(x => x.GroupId == id);
    if (data)
      return true;
    else
      return false;
  }
  selectUserGroups(evt) {
    if (evt.target.checked) {
      let userGroupMapping = new UserGroupMapping();
      userGroupMapping.UserId = this.user.UserId;
      userGroupMapping.GroupId = evt.target.value;
     /* this.userUpdate(evt.target.value);*/
      this.lstUserGroupMapping.push(userGroupMapping);
    }
    else {
      this.lstUserGroupMapping = this.lstUserGroupMapping.filter(x => x.GroupId !== parseInt(evt.target.value));
    }
  }

  //userUpdate(id) {
  //  if (id > 1) {
  //    this.user.IsAdminUser = false;
  //  }
  //  else {
  //    this.user.IsAdminUser = true;
  //  }

  //}


  updateUserCost() {
    if (this.userCost.IsPerHour) {
      this.userCost.PerHourCost = 0;
      this.userCost.IsPerMonth = this.userCost.IsPerLead = this.userCost.IsPerPaidInvoice = this.userCost.IsFullTime = this.userCost.IsPartTime = !this.userCost.IsPerHour;
    }
    if (this.userCost.IsPerMonth) {
      this.userCost.PerMonthCost = 0;
      this.userCost.PerMonthTotalHours = 0;
      this.userCost.IsPerHour = this.userCost.IsPerLead = this.userCost.IsPerPaidInvoice = this.userCost.IsFullTime = this.userCost.IsPartTime = !this.userCost.IsPerMonth;
    }
    if (this.userCost.IsPerLead) {
      this.userCost.PerLeadCost = 0;
      this.userCost.IsPerMonth = this.userCost.IsPerHour = this.userCost.IsPerPaidInvoice = this.userCost.IsFullTime = this.userCost.IsPartTime = !this.userCost.IsPerLead;
    }
    if (this.userCost.IsPerPaidInvoice) {
      this.userCost.PerPaidInvoiceCost = 0;
      this.userCost.IsPerMonth = this.userCost.IsPerLead = this.userCost.IsPerHour = this.userCost.IsFullTime = this.userCost.IsPartTime = !this.userCost.IsPerPaidInvoice;
    }
    if (this.userCost.IsFullTime) {
      this.userCost.FullTimeCost = 0;
      this.userCost.FullTimeHours = 0;
      this.userCost.IsPerMonth = this.userCost.IsPerLead = this.userCost.IsPerPaidInvoice = this.userCost.IsPerHour = this.userCost.IsPartTime = !this.userCost.IsFullTime;
    }
    if (this.userCost.IsPartTime) {
      this.userCost.PartTimeCost = 0;
      this.userCost.PartTimeHours = 0;
      this.userCost.IsPerMonth = this.userCost.IsPerLead = this.userCost.IsPerPaidInvoice = this.userCost.IsFullTime = this.userCost.IsPerHour = !this.userCost.IsPartTime;
    }
  }


  saveHeaderChartMapping(userId) {
    if (userId) {
      this.selectedHeaderChartMappingArray = [];
      this.selectedHeaderChart.forEach(x => {
        let chartMapping = new Userchartmapping();
        chartMapping.ChartId = x.Id;
        chartMapping.UserId = userId;
        this.selectedHeaderChartMappingArray.push(chartMapping);
      });
      this.addUserService.saveHeaderChartMapping(this.selectedHeaderChartMappingArray).subscribe(data => {
        if (data) {
          this.selectedHeaderChartMappingArray = data;
        }
      });
    }
  }

  saveDashboardChartMapping(userId) {
    if (userId) {
      this.selectedDashboardChartMappingArray = [];
      this.selectedDashboardChart.forEach(x => {
        let chartMapping = new Userchartmapping();
        chartMapping.ChartId = x.Id;
        chartMapping.UserId = userId;
        this.selectedDashboardChartMappingArray.push(chartMapping);
      });
      this.addUserService.saveDashboardChartMapping(this.selectedDashboardChartMappingArray).subscribe(data => {
        if (data) {
          this.selectedDashboardChartMappingArray = data;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/manageuser']);
  }

  saveUserQuoteChartMapping(userId) {
    if (userId) {
      this.selectedUserQuoteChartMappingArray = [];
      this.selectedUserQuoteChart.forEach(x => {
        let chartMapping = new Userchartmapping();
        chartMapping.ChartId = x.Id;
        chartMapping.UserId = userId;
        this.selectedUserQuoteChartMappingArray.push(chartMapping);
      });
      this.addUserService.saveUserQuoteChartMapping(this.selectedUserQuoteChartMappingArray).subscribe(data => {
        if (data) {
          this.selectedUserQuoteChartMappingArray = data;
        }
      });
    }
  }

  saveUser(user) {
    if (user.Password == user.ConfirmPassword) {
      if (user.AdminPassword == user.ConfirmAdminPassword) {
        this.addUserService.saveUser(user).subscribe(data => {
          if (data) {
            this.user = data;
            this.user.ConfirmPassword = this.user.Password;
            this.user.ConfirmAdminPassword = this.user.AdminPassword;
            this.saveHeaderChartMapping(data.UserId);
            this.saveDashboardChartMapping(data.UserId);
            this.saveUserQuoteChartMapping(data.UserId);
            this.CustomFieldSection.forEach(x => x.SaveCustomFieldValues(data.UserId));
            if (this.userCost) {
              this.userCost.UserId = this.user.UserId;
              this.addUserService.saveUserCost(this.userCost).subscribe(costData => {
                this.userCost = costData;
              }, err => { }, () => { });
            }
            if (this.userGoal) {
              this.userGoal.UserId = this.user.UserId;
              this.addUserService.saveUserGoals(this.userGoal).subscribe(goal => {
                if (goal) {
                  this.userGoal = goal;
                }
              }, err => { }, () => { });
            }
            this.CustomFieldSection.forEach(x => x.SaveCustomFieldValues(data.UserId));
            if (this.selectedCategories.length > 0) {
              this.categoryService.saveCategoriesValue(this.selectedCategories).subscribe(data => { }, err => { }, () => { });
            }
            else {
              this.categoryService.deleteCategoryValues(this.entityType, this.entityId).subscribe(data => { }, err => { }, () => { });
            }
            if (this.lstUserGroupMapping.length > 0) {
              this.addGroupService.saveUserGroupMapping(this.lstUserGroupMapping).subscribe(data => { }, err => { }, () => { });
            }
            else {
              this.addGroupService.deleteUserGroupMapping(this.user.UserId).subscribe(data => { }, err => { }, () => { });
            }
            this.notification.ShowNoty("User saved successfully!");
            //this.router.navigate(['/manageuser']);
          }
          else {
            this.notyHelper.ShowNoty("User already exist");
          }
        }, err => {
          if (err.error && err.error.detail) {
            this.notification.ShowNoty(err.error.detail);
          }
          else {

            this.notification.ShowNoty("User save failed. Please check data or contact admin");

          }
        }, () => { });
      }
      else {
        this.notification.ShowNoty("Incorrect Admin password");
      }
    }
    else {
      this.notification.ShowNoty("Incorrect password");
    }
  }
  Cancel() {
    this.router.navigate(['/manageuser']);
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
  getRoles() {
    this.roleService.getRoles().subscribe(data => {
      this.lstRoles = data;
    }, err => { });
  }
  getUserGroups() {
    this.addGroupService.GetUserGroups().subscribe(data => {
      if (data)
        this.lstGroups = data;
    }, err => { });
  }

  getUserCostDropdown() {
    this.addUserService.getUserCostDropdown().subscribe(data => {
      if (data)
        this.lstUserCostDropdown = data;
    }, err => { });
  }


  getUserGroupMapping(userId) {
    this.addGroupService.getUserGroupMapping(userId).subscribe(data => {
      if (data)
        this.lstUserGroupMapping = data;
    }, err => { });
  }

  //User Goal Calculation Starts
  CalculateNoOfDeals(asp, goalValue) {
    return this.quotaCalcHelper.CalculateNoOfDeals(asp, goalValue);
  }

  CalculateGoalAmountPerMonth(asp, goalValue) {
    return this.quotaCalcHelper.CalculateGoalAmountPerMonth(asp, goalValue);
  }
  CalculateNoOfDealsPerMonth(asp, goalValue) {
    return this.quotaCalcHelper.CalculateNoOfDealsPerMonth(asp, goalValue);
  }
  CalculateClosingPercentage(asp, goalValue, newLeads) {
    return this.quotaCalcHelper.CalculateClosingPercentage(asp, goalValue, newLeads);
  }
  //User Goal Calcualtion Ends

  async EnableOnedrive(user: any) {

    await this.graphService.getRootItems().then(data => {
      this.onedrive = data;
      for (let i = 0; i < this.onedrive.value.length; i++) {
        this.SendAccess(this.onedrive[i], user);
      }
    }, err => { });
  }

  SendAccess(id: any, user: any) {
    let driveRequest = new DriveRequest();
    driveRequest.message = "";
    driveRequest.recipients = [{ email: user.Email }];
    driveRequest.requireSignIn = true;
    driveRequest.sendInvitation = true;
    driveRequest.roles = ["write"];
    this.graphService.AddAccess(id, driveRequest);
  }

}

export class DriveRequest {
  recipients: Recipient[];
  message: string;
  requireSignIn: boolean;
  sendInvitation: boolean;
  roles: string[];
}

export interface Recipient {
  email: string;
}







