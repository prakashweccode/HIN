import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListcurrencyComponent } from './listcurrency.component';

const routes: Routes = [{ path: '', component: ListcurrencyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListcurrencyRoutingModule { }
