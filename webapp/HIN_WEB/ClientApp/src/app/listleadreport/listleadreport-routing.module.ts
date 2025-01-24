import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListleadreportComponent } from './listleadreport.component';

const routes: Routes = [{ path: '', component: ListleadreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListleadreportRoutingModule { }
