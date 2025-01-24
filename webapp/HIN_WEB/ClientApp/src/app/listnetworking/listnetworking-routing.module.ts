import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListnetworkingComponent } from './listnetworking.component';

const routes: Routes = [{ path: '', component: ListnetworkingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListnetworkingRoutingModule { }
