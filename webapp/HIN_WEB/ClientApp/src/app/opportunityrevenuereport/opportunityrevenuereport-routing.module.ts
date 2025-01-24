import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunityrevenuereportComponent } from './opportunityrevenuereport.component';

const routes: Routes = [{ path: '', component: OpportunityrevenuereportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunityrevenuereportRoutingModule { }
