import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartnerimportComponent } from './partnerimport.component';

const routes: Routes = [{ path: '', component: PartnerimportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerimportRoutingModule { }
