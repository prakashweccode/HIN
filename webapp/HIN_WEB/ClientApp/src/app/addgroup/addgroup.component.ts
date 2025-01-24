import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGroups, UserGroupMapping } from './addgroup';
import { AddgroupService } from './addgroup.service';
import { NotyHelper } from '../helper/NotyHelper';
import { Datashared } from '../helper/datashared';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users';

@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.css']
})
export class AddgroupComponent implements OnInit {
  public group: UserGroups = new UserGroups();
  public userGroupMapping = new UserGroupMapping();
  public lstUsers: Array<Users> = [];
  public lstAllUsers: Array<Users> = [];
  public activeContainer = "tab1";
  public addUserToggle = false;
  constructor(public userService: UsersService, public router: Router, public addGroupService: AddgroupService, public notification: NotyHelper, public dataHelper: Datashared) { }

  ngOnInit() {
    let groupData = this.dataHelper.getValue();
    if (groupData) {
      this.group = groupData;
      this.getGroupUsers(this.group.UserGroupId);
      this.getAllUsers();
    } else {
      this.group.IsActive = true;
    }
  }
  addUserToGroup() {
    this.addUserToggle = true;
  }
  closeError() {
    this.addUserToggle = false;
  }
  getAllUsers() {
    this.userService.getUsers().subscribe(data => {
      if (data)
        this.lstAllUsers = data;
    }, err => { }, () => { });
  }
  getGroupUsers(groupId) {
    this.userService.getGroupUsers(groupId).subscribe(data => {
      if (data)
        this.lstUsers = data;
    }, err => { }, () => { });
  }
  saveUserGroups(group) {
    this.addGroupService.saveUserGroups(group).subscribe(data => {
      if (data != null) {
        this.group = data;
        this.notification.ShowNoty("Save Successfully");
        this.router.navigate(['/manageuser']);
      }
      else {
        this.notification.ShowNoty("Error Occured");
      }
    });
  }
  saveUserToGroup(userGroupMapping) {
    this.userGroupMapping.GroupId = this.group.UserGroupId;
  }

  cancel() {
    this.router.navigate(['/manageuser']);
  }
}
