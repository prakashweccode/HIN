import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListpartnerComponent } from './listpartner.component';

const routes: Routes = [{ path: '', component: ListpartnerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListpartnerRoutingModule { }
