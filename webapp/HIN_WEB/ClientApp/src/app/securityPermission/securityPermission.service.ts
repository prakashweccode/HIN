import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SecurityPermission, UserGroup } from './securityPermission';

@Injectable({
  providedIn: 'root'
})

export class SecurityPermissionService {

  constructor(public http: HttpClient) { }

  getUserGroupsForPermission() {
    return this.http.get<UserGroup>("/api/GroupPermission/GetUserGroupsForPermissions").pipe();
  }

  getPermissionGroup(groupId: number) {
    return this.http.get<SecurityPermission>("/api/GroupPermission/GetGroupPermissions?groupId=" + groupId).pipe();
  }

  updatePermissionGroup(groupId: number, permission: any) {
    return this.http.put("/api/GroupPermission/" + groupId, permission).pipe();
  }
}
