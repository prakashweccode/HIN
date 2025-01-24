import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcurrencyComponent } from './addcurrency.component';

const routes: Routes = [{ path: '', component: AddcurrencyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddcurrencyRoutingModule { }
