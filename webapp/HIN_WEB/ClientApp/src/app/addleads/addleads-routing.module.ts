import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddleadsComponent } from './addleads.component';

const routes: Routes = [{ path: '', component: AddleadsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddleadsRoutingModule { }
