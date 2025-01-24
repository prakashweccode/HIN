import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListcompanyregisterComponent } from './listcompanyregister.component';

const routes: Routes = [{ path: '', component: ListcompanyregisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListcompanyregisterRoutingModule { }
