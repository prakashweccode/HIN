import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientformApprovedComponent } from './patientform-approved.component';

const routes: Routes = [{ path: '', component: PatientformApprovedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientformApprovedRoutingModule { }
