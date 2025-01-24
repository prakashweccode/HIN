import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunityviewComponent } from './opportunityview.component';

const routes: Routes = [{ path: '', component: OpportunityviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunityviewRoutingModule { }
