import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListleadsComponent } from './listleads.component';

const routes: Routes = [{ path: '', component: ListleadsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListleadsRoutingModule { }
