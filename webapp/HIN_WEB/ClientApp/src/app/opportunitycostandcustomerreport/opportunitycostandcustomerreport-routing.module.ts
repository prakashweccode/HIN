import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunitycostandcustomerreportComponent } from './opportunitycostandcustomerreport.component';

const routes: Routes = [{ path: '', component: OpportunitycostandcustomerreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunitycostandcustomerreportRoutingModule { }
