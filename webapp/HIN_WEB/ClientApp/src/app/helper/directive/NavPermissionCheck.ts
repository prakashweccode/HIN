import { Directive, ElementRef, Input } from '@angular/core';
import { PermissionBase } from './PermissionBase';

@Directive({
  selector: '[navPermissionCheck]'
})

export class NavPermissionCheck extends PermissionBase {

  @Input("navPermissionCheck") navPermissionCheckValue: string;

  constructor(public el: ElementRef) {
    super(el);
  }

  getPermissionValue(): string {
    return this.navPermissionCheckValue;
  }

}
