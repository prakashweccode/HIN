import { Component, OnInit } from '@angular/core';
import { RoleserviceService } from './roleservice.service';
import { Permissions, Roles, RolePermissions } from './roles';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';
import { NotyHelper } from '../helper/NotyHelper';

@Component({
  selector: 'app-managerole',
  templateUrl: './managerole.component.html',
  styleUrls: ['./managerole.component.css']
})
export class ManageroleComponent implements OnInit {
  public lstPermissions: Array<Permissions> = [];
  public arrRolePermission: Array<RolePermissions> = [];
  public rolePermission: RolePermissions = new RolePermissions;
  public role: Roles = new Roles;
  constructor(private router: Router, private roleService: RoleserviceService, public dataShared: Datashared, public notification: NotyHelper) { }

  ngOnInit() {
    let roleDetail = this.dataShared.getValue();
    this.getPermissions();
    if (roleDetail) {
      this.role = roleDetail;
      this.getRolePermission(this.role.RoleId);
    }
  }
  getRolePermission(roleId) {
    this.roleService.getRolePermissions(roleId).subscribe(data => {
      if (data) {
        this.arrRolePermission = data;
        for (let i = 0; i < this.arrRolePermission.length; i++) {
          this.lstPermissions[i].IsSelected = this.arrRolePermission[i].IsEnabled;
        }
      }
    }, err => { }, () => { });
  }
  cancel() {
    this.router.navigate(['/manageuser']);
  }
  saveRole() {
    this.roleService.saveRole(this.role).subscribe(data => {
      if (data) {
        this.role = data;
        for (let i = 0; i < this.lstPermissions.length; i++) {
          let rolePermission = new RolePermissions();
          rolePermission.PermissionId = this.lstPermissions[i].Id;
          rolePermission.IsEnabled = this.lstPermissions[i].IsSelected;
          rolePermission.RoleId = data.RoleId;
          this.arrRolePermission.push(rolePermission);
        }
        this.roleService.saveRolePermission(this.arrRolePermission).subscribe(result => {
          if (result) {
            this.arrRolePermission = result;
          }
          this.notification.ShowNoty("Details saved successfully!");
        });
      }
    }, err => { }, () => { });
  }
  getPermissions() {
    this.roleService.getPermissions().subscribe(data => {
      if (data) {
        this.lstPermissions = data;
      }
    }, err => { }, () => { });
  }
}
