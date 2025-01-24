import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddvendorComponent } from './addvendor.component';

const routes: Routes = [{ path: '', component: AddvendorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddvendorRoutingModule { }
