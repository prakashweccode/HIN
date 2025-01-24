import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunitydateprobabilityComponent } from './opportunitydateprobability.component';

const routes: Routes = [{ path: '', component: OpportunitydateprobabilityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunitydateprobabilityRoutingModule { }
