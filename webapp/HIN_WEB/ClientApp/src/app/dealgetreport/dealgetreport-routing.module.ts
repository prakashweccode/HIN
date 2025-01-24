import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealgetreportComponent } from './dealgetreport.component';

const routes: Routes = [{ path: '', component: DealgetreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealgetreportRoutingModule { }
