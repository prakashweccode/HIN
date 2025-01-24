import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactgroupComponent } from './contactgroup.component';

const routes: Routes = [{ path: '', component: ContactgroupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactgroupRoutingModule { }
