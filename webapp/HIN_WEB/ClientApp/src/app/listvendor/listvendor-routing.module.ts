import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListvendorComponent } from './listvendor.component';

const routes: Routes = [{ path: '', component: ListvendorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListvendorRoutingModule { }
