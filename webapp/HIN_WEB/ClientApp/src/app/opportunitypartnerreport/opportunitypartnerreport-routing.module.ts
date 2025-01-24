import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunitypartnerreportComponent } from './opportunitypartnerreport.component';

const routes: Routes = [{ path: '', component: OpportunitypartnerreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunitypartnerreportRoutingModule { }
