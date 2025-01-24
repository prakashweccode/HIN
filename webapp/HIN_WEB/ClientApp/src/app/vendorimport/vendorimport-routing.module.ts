import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorimportComponent } from './vendorimport.component';

const routes: Routes = [{ path: '', component: VendorimportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorimportRoutingModule { }
