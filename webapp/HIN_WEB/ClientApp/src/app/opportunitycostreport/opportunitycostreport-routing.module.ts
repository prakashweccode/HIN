import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunitycostreportComponent } from './opportunitycostreport.component';

const routes: Routes = [{ path: '', component: OpportunitycostreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunitycostreportRoutingModule { }
