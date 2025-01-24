import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignpadRoutingModule } from './signpad-routing.module';
import { SignpadComponent } from './signpad.component';


@NgModule({
  declarations: [
    SignpadComponent
  ],
  imports: [
    CommonModule,
    SignpadRoutingModule
  ],
  exports:[SignpadComponent]
})
export class SignpadModule { }
