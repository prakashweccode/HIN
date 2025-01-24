import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferralimportComponent } from './referralimport.component';

const routes: Routes = [{ path: '', component: ReferralimportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferralimportRoutingModule { }
