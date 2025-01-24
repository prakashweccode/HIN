import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealsclosedbymonthComponent } from './dealsclosedbymonth.component';

const routes: Routes = [{ path: '', component: DealsclosedbymonthComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealsclosedbymonthRoutingModule { }
