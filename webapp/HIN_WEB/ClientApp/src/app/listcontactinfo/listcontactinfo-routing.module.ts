import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListcontactinfoComponent } from './listcontactinfo.component';

const routes: Routes = [{ path: '', component: ListcontactinfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListcontactinfoRoutingModule { }
