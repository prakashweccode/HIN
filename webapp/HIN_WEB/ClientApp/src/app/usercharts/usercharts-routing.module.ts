import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserchartsComponent } from './usercharts.component';

const routes: Routes = [{ path: '', component: UserchartsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserchartsRoutingModule { }
