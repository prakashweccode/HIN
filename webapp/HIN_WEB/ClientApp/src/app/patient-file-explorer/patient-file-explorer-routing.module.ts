import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientFileExplorerComponent } from './patient-file-explorer.component';

const routes: Routes = [{ path: '', component: PatientFileExplorerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientFileExplorerRoutingModule { }
