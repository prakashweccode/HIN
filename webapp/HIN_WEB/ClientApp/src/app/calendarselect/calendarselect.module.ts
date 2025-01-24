import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarselectRoutingModule } from './calendarselect-routing.module';
import { CalendarselectComponent } from './calendarselect.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { DemoUtilsModule } from '../helper/utils/module';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';


@NgModule({
  declarations: [CalendarselectComponent],
  imports: [
    CommonModule,
    CalendarselectRoutingModule, CalendarModule, FormsModule, ReactiveFormsModule, DemoUtilsModule, CustomdropdownModule
  ],
  exports: [CalendarselectComponent]
})
export class CalendarselectModule { }
