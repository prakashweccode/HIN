import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SfcalendarRoutingModule } from './sfcalendar-routing.module';
import { SfcalendarComponent } from './sfcalendar.component';
import { CalendarModule } from 'angular-calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoUtilsModule } from '../helper/utils/module';


@NgModule({
  declarations: [SfcalendarComponent],
  imports: [
    CommonModule,
    SfcalendarRoutingModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    DemoUtilsModule
  ],
  exports: []
})
export class SfcalendarModule { }
