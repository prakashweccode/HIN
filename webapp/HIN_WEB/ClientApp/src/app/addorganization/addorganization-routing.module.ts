import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddorganizationComponent } from './addorganization.component';

const routes: Routes = [{ path: '', component: AddorganizationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddorganizationRoutingModule { }
