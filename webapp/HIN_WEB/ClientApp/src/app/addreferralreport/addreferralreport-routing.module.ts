import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddreferralreportComponent } from './addreferralreport.component';

const routes: Routes = [{ path: '', component: AddreferralreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddreferralreportRoutingModule { }
