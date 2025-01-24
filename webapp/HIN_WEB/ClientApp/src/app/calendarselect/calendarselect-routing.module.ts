import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarselectComponent } from './calendarselect.component';

const routes: Routes = [{ path: '', component: CalendarselectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarselectRoutingModule { }
