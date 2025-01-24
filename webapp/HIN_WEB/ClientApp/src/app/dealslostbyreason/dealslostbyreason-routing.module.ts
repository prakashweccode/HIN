import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealslostbyreasonComponent } from './dealslostbyreason.component';

const routes: Routes = [{ path: '', component: DealslostbyreasonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealslostbyreasonRoutingModule { }
