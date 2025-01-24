import { Directive, ElementRef, Input } from '@angular/core';
import { PermissionBase } from './PermissionBase';

@Directive({
  selector: '[permissionCheck]'
})

export class PermissionCheck extends PermissionBase {

  @Input("permissionCheck") permissionCheckValue: string;

  constructor(public el: ElementRef) {
    super(el);
  }

  getPermissionValue(): string {
    return this.permissionCheckValue;
  }

}
