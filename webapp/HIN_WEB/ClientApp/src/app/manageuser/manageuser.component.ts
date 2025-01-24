import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddgroupService } from '../addgroup/addgroup.service';
import { UserGroups } from '../addgroup/addgroup';
import { Datashared } from '../helper/datashared';
import { RoleserviceService } from '../managerole/roleservice.service';
import { Roles } from '../managerole/roles';
import { NotyHelper } from '../helper/NotyHelper';
import { UserDetail } from '../login/login';
import { Users } from '../users/users';
import { UsersService } from '../users/users.service';
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {
  public passwordverified: boolean;
  public passwordValidation: boolean;
  public verificationCode: string;
  public staticFilter: any;
  public orderBy: any;
  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public apiUrl: string;
  public pageSize: number;
  public isResponsive: boolean;
  public isSearchEnabled: boolean;
  public isPaginationEnabled: boolean;
  public actions: Array<any>;
  public pageLengthOptions: Array<number>;
  activeContainer: string = "tab1";
  public lstGroups: Array<UserGroups>;
  public lstRoles: Array<Roles>;
  userId: number;
  loggedUser: UserDetail;
  userInformation: Users = new Users();
  constructor(public router: Router, public roleService: RoleserviceService, public addGroupService: AddgroupService, public dataShared: Datashared, public notyHelper: NotyHelper, public userService: UsersService) { }

  ngOnInit() {
    let isAdminPassword = localStorage.getItem("isAdminPassword");
    if (!isAdminPassword) {
      localStorage.setItem("isAdminPassword", "false");
      this.passwordValidation = true;
      this.passwordverified = false;
    }
    else {
      if (isAdminPassword != "true") {
        this.passwordValidation = true;
        this.passwordverified = false;
      }
      else {
        this.passwordValidation = false;
        this.passwordverified = true;
      }
    }


    this.loggedUser = JSON.parse(localStorage.getItem("userDetail"));
    if (this.loggedUser && this.loggedUser.User.UserId) {
      this.userId = this.loggedUser.User.UserId;
      this.getUserByUserId(this.userId);
    }
    this.getUserGroups();
    this.getRoles();
    this.gridHeaders = [
      { displayName: 'Name', propertyName: 'FirstName', dataType: 'string', secondPropertyName: 'LastName', filter: '', isLink: true, serializeArray: null, gridPermissionCheck: '10.1.1.1.1' },
      { displayName: 'Username', propertyName: 'UserName', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '10.1.1.1.2' },
      { displayName: 'Email Id', propertyName: 'Email', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '10.1.1.1.3' },
      { displayName: 'Phone', propertyName: 'PhoneNumber', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '10.1.1.1.4' }
    ];
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "Name", value: "", type: "contains" },
      { column: "UserName", value: "", type: "contains" },
      { column: "Skills", value: "", type: "contains" },
      { column: "RoleId", value: "", type: "contains" }
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];
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
        localStorage.setItem("isAdminPassword", "true");
      }
      else {
        this.notyHelper.ShowNoty("Enter valid password");
      }
      this.verificationCode = "";
    }
  }

  goToExit() {
    localStorage.removeItem("isAdminPassword");
    this.notyHelper.ShowNoty("Exit Successfully");
  }

  closePasswordPopup() {
    this.passwordValidation = false;
    this.router.navigate(['/home'])
  }

  getUserGroups() {
    this.addGroupService.GetUserGroups().subscribe(data => {
      this.lstGroups = data;
    });
  }
  getRoles() {
    this.roleService.getRoles().subscribe(data => {
      this.lstRoles = data;
    }, err => { });
  }

  editUser(user) {
      this.dataShared.setValue(user.dataRow);
      this.router.navigate(['/edituser']);
  }

  addGroup() {
    this.router.navigate(['/addgroup']);
  }
  addRole() {
    this.router.navigate(['/managerole']);
  }
  gotoAddUser() {
    this.router.navigate(['/adduser']);
  }
  manageRole(role) {
    this.dataShared.setValue(role);
    this.router.navigate(['/managerole']);
  }
  manageGroup(group) {
    this.dataShared.setValue(group);
    this.router.navigate(['/addgroup']);
  }
}
