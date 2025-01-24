import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProposalsclosedbyrepComponent } from './proposalsclosedbyrep.component';

const routes: Routes = [{ path: '', component: ProposalsclosedbyrepComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposalsclosedbyrepRoutingModule { }
