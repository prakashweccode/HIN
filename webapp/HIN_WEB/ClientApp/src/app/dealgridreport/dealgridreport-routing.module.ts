import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealgridreportComponent } from './dealgridreport.component';

const routes: Routes = [{ path: '', component: DealgridreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealgridreportRoutingModule { }
