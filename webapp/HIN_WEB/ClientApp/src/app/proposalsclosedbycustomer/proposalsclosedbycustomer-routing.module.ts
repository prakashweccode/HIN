import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProposalsclosedbycustomerComponent } from './proposalsclosedbycustomer.component';

const routes: Routes = [{ path: '', component: ProposalsclosedbycustomerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposalsclosedbycustomerRoutingModule { }
