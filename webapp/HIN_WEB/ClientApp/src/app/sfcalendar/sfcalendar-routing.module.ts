import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SfcalendarComponent } from './sfcalendar.component';

const routes: Routes = [{ path: '', component: SfcalendarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SfcalendarRoutingModule { }
