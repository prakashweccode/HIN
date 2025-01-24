import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunityvendorreportComponent } from './opportunityvendorreport.component';

const routes: Routes = [{ path: '', component: OpportunityvendorreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunityvendorreportRoutingModule { }
