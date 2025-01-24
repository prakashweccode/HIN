import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddpartnerreportComponent } from './addpartnerreport.component';

const routes: Routes = [{ path: '', component: AddpartnerreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddpartnerreportRoutingModule { }
