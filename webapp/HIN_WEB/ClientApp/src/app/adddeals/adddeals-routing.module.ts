import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdddealsComponent } from './adddeals.component';

const routes: Routes = [{ path: '', component: AdddealsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdddealsRoutingModule { }
