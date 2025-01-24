import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunitieswonovertimeComponent } from './opportunitieswonovertime.component';

const routes: Routes = [{ path: '', component: OpportunitieswonovertimeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunitieswonovertimeRoutingModule { }
