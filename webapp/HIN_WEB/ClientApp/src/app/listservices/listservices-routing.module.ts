import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListservicesComponent } from './listservices.component';

const routes: Routes = [{ path: '', component: ListservicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListservicesRoutingModule { }
