import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunityreferralreportComponent } from './opportunityreferralreport.component';

const routes: Routes = [{ path: '', component: OpportunityreferralreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunityreferralreportRoutingModule { }
