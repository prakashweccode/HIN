import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Roles, Permissions, RolePermissions } from './roles';

@Injectable({
  providedIn: 'root'
})
export class RoleserviceService {

  constructor(private http: HttpClient) { }

  getRoles() {
    return this.http.get<Array<Roles>>("/api/Roles/GetRoles").pipe();
  }
  getPermissions() {
    return this.http.get<Array<Permissions>>("/api/Roles/GetPermissions").pipe();
  }
  saveRole(role) {
    return this.http.post<Roles>("/api/Roles/AddOrUpdateRole", role).pipe();
  }
  saveRolePermission(rolePermission) {
    return this.http.post<any>("/api/Roles/SaveRolePermission", rolePermission).pipe();
  }
  getRolePermissions(roleId) {
    return this.http.get<Array<RolePermissions>>("/api/Roles/GetRolePermissions?roleId=" + roleId).pipe();
  }
}
