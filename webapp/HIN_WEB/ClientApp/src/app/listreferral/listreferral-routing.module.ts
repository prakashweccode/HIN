import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListreferralComponent } from './listreferral.component';

const routes: Routes = [{ path: '', component: ListreferralComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListreferralRoutingModule { }
