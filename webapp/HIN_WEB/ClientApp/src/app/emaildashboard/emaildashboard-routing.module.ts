import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmaildashboardComponent } from './emaildashboard.component';

const routes: Routes = [{ path: '', component: EmaildashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmaildashboardRoutingModule { }
