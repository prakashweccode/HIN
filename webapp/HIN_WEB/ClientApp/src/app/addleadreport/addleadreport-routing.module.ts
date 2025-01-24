import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddleadreportComponent } from './addleadreport.component';

const routes: Routes = [{ path: '', component: AddleadreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddleadreportRoutingModule { }
