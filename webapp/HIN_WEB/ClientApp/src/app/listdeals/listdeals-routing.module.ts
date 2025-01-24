import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListdealsComponent } from './listdeals.component';

const routes: Routes = [{ path: '', component: ListdealsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListdealsRoutingModule { }
