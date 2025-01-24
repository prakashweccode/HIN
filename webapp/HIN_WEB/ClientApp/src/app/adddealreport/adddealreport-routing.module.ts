import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdddealreportComponent } from './adddealreport.component';

const routes: Routes = [{ path: '', component: AdddealreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdddealreportRoutingModule { }
