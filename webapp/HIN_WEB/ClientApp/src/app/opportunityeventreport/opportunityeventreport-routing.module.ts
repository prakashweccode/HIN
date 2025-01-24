import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunityeventreportComponent } from './opportunityeventreport.component';

const routes: Routes = [{ path: '', component: OpportunityeventreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunityeventreportRoutingModule { }
