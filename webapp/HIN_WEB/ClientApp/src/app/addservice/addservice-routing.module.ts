import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddserviceComponent } from './addservice.component';

const routes: Routes = [{ path: '', component: AddserviceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddserviceRoutingModule { }
