import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDashboardConfigComponent } from './list-dashboard-config.component';

const routes: Routes = [{ path: '', component: ListDashboardConfigComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListDashboardConfigRoutingModule { }
