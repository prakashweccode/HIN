import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevenueforecostbyrepComponent } from './revenueforecostbyrep.component';

const routes: Routes = [{ path: '', component: RevenueforecostbyrepComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevenueforecostbyrepRoutingModule { }
