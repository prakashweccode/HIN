import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdduserreportComponent } from './adduserreport.component';

const routes: Routes = [{ path: '', component: AdduserreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdduserreportRoutingModule { }
