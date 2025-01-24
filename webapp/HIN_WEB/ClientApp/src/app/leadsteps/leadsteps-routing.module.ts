import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadstepsComponent } from './leadsteps.component';

const routes: Routes = [{ path: '', component: LeadstepsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadstepsRoutingModule { }
