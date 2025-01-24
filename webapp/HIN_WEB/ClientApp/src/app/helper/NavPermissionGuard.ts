import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: "root" })
export class NavPermissionGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (JSON.parse(localStorage.getItem("userDetail")).Permissions != null) {
      const permissions = JSON.parse(localStorage.getItem("userDetail")).Permissions;

      if (permissions && permissions.length > 0 && route.data && route.data.permission) {
        const currentPermission = permissions.find(x => x.IdHtml === route.data.permission);
        if (currentPermission && !currentPermission.StatGrant && currentPermission.StatHide) {
          return false;
        }
      }
    }

    return true;
  }
}
