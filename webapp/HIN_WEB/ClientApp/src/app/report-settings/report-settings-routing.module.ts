import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportSettingsComponent } from './report-settings.component';

const routes: Routes = [{ path: '', component: ReportSettingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportSettingsRoutingModule { }
