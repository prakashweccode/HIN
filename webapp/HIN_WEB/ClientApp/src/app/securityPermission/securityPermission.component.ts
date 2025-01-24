import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityPermissionService } from './securityPermission.service';
import { NotyHelper } from '../helper/NotyHelper';

@Component({
  selector: 'app-security-permission',
  templateUrl: './securityPermission.component.html',
  styleUrls: ['./securityPermission.component.css']
})

export class SecurityPermissionComponent implements OnInit {

  public userGroups: any = [];
  public groupId: any = 0;
  public groupPermission: any = [];
  public treeModel: any = [];

  constructor(public router: Router, public securityPermissionService: SecurityPermissionService, public notyHelper:NotyHelper) { }

  ngOnInit() {
    this.securityPermissionService.getUserGroupsForPermission().subscribe(data => {
      if (data) {        
        this.userGroups = data;
        this.userGroups.forEach((element) => {
          element.Name = this.capitalize(element.Name);
        })
      }
    }, err => { }, () => { })  
  }

  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  groupChange() {
    this.groupPermission = [];
    this.treeModel = [];
    if (this.groupId > 0) {
      this.securityPermissionService.getPermissionGroup(this.groupId).subscribe(data => {        
        if (data)
          this.groupPermission = data;
      }, err => { }, () => {
          this.treeModel.push(this.buildTreeView());          
      });
    }
  }

  buildTreeView() {
    const idMapping = this.groupPermission.reduce((acc, el, i) => {
      acc[el.idPermis] = i;
      return acc;
    }, {});

    let root;
    this.groupPermission.forEach(el => {
      // Handle the root element
      if (el.parent === "-1") {
        root = el;
        return;
      }
      // Use our mapping to locate the parent element in our data array
      const parentEl = this.groupPermission[idMapping[el.parent]];
      // Add our current el to its parent's `children` array
      parentEl.showChildren = false;
      parentEl.children = [...(parentEl.children || []), el];
    });
    return root;
  }

  saveChanges() {    
    this.updateRawData(this.treeModel);
    this.securityPermissionService.updatePermissionGroup(this.groupId, this.groupPermission).subscribe((data) => {
      this.notyHelper.ShowNoty("Permission updated successfully !!!");
    }, err => {
        console.log(err);
    }, () => { });
  }

  updateRawData(arr: any[]) {
    arr.forEach((element) => {
      let rawValue: any = this.groupPermission.find(x => x.idPermis === element.idPermis);
      if (rawValue) {
        rawValue.stat_grant = element.stat_grant;
        rawValue.stat_hide = element.stat_hide;
        rawValue.stat_read = element.stat_read;
      }

      if (element.children && element.children.length > 0) {
        this.updateRawData(element.children);
      }
    });
  }

  collapseAll() {
    this.updateShowChildren(this.treeModel, false);
  }

  expandAll() {
    this.updateShowChildren(this.treeModel, true);
  }

  updateShowChildren(arr: any[], show: boolean): void {
    arr.forEach((element) => {
      element.showChildren = show;
      if (element.children && element.children.length > 0) {
        this.updateShowChildren(element.children, show);
      }
    });
  }

}
