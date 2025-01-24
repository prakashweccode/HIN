import { Directive, ElementRef, Input } from '@angular/core';
import { PermissionBase } from './PermissionBase';

@Directive({
  selector: '[gridPermissionCheck]'
})

export class GridPermissionCheck extends PermissionBase {

  @Input("gridPermissionCheck") gridPermissionCheckValue: string;

  constructor(public el: ElementRef) {
    super(el);
  }

  getPermissionValue(): string {
    return this.gridPermissionCheckValue;
  }
}
