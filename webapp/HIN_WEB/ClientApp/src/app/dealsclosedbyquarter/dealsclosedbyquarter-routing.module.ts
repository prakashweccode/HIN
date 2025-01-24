import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealsclosedbyquarterComponent } from './dealsclosedbyquarter.component';

const routes: Routes = [{ path: '', component: DealsclosedbyquarterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealsclosedbyquarterRoutingModule { }
