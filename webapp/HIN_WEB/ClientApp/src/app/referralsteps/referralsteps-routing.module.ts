import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferralstepsComponent } from './referralsteps.component';

const routes: Routes = [{ path: '', component: ReferralstepsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferralstepsRoutingModule { }
