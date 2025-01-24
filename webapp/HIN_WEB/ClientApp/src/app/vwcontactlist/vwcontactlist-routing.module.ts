import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VwcontactlistComponent } from './vwcontactlist.component';

const routes: Routes = [{ path: '', component: VwcontactlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VwcontactlistRoutingModule { }
