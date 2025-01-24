import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunitynetworkreportComponent } from './opportunitynetworkreport.component';

const routes: Routes = [{ path: '', component: OpportunitynetworkreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunitynetworkreportRoutingModule { }
