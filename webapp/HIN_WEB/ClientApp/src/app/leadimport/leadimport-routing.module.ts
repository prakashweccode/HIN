import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadimportComponent } from './leadimport.component';

const routes: Routes = [{ path: '', component: LeadimportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadimportRoutingModule { }
