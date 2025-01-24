import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunityactualexpectedrevenueComponent } from './opportunityactualexpectedrevenue.component';

const routes: Routes = [{ path: '', component: OpportunityactualexpectedrevenueComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunityactualexpectedrevenueRoutingModule { }
