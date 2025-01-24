import { ElementRef, OnChanges } from "@angular/core";

export abstract class PermissionBase implements OnChanges {

  constructor(public el: ElementRef) { }

  abstract getPermissionValue(): string;

  checkPermission(): void {
    if (!JSON.parse(localStorage.getItem("userDetail"))) {
      return;
    }
    const permissions = JSON.parse(localStorage.getItem("userDetail")).Permissions;

    if (permissions && permissions.length > 0) {

      const currentPermission = permissions.find(x => x.IdHtml === this.getPermissionValue());
      if (currentPermission && !currentPermission.StatGrant && currentPermission.StatHide) {
        this.el.nativeElement.style.display = "none";
      }
      else if (currentPermission && !currentPermission.StatGrant && currentPermission.StatRead) {
        this.el.nativeElement.disabled= true;
        var childNodes = this.el.nativeElement.childNodes;
        for (var node of childNodes) {
          node.disabled = true;
        }
      }
    }
  }

  ngOnChanges() {
    this.checkPermission();
  }

}
