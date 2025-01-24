import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewcalendarRoutingModule } from './newcalendar-routing.module';
import { NewcalendarComponent } from './newcalendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ContextMenuModule } from 'ngx-contextmenu';
import { Connectoffice365Module } from '../connectoffice365/connectoffice365.module';
import { DemoUtilsModule } from '../helper/utils/module';


@NgModule({
  declarations: [NewcalendarComponent],
  imports: [
    CommonModule,
    NewcalendarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    }),
    Connectoffice365Module,
    DemoUtilsModule,
  ],
  exports: [NewcalendarComponent]
})
export class NewcalendarModule { }
