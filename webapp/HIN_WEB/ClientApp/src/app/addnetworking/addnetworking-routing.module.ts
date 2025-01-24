import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnetworkingComponent } from './addnetworking.component';

const routes: Routes = [{ path: '', component: AddnetworkingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddnetworkingRoutingModule { }
