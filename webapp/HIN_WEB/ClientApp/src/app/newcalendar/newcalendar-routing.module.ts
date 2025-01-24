import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewcalendarComponent } from './newcalendar.component';

const routes: Routes = [{ path: '', component: NewcalendarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewcalendarRoutingModule { }
