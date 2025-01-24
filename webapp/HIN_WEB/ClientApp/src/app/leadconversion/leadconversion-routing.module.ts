import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadconversionComponent } from './leadconversion.component';

const routes: Routes = [{ path: '', component: LeadconversionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadconversionRoutingModule { }
