import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnetworkreportComponent } from './addnetworkreport.component';

const routes: Routes = [{ path: '', component: AddnetworkreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddnetworkreportRoutingModule { }
