import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorstepsComponent } from './vendorsteps.component';

const routes: Routes = [{ path: '', component: VendorstepsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorstepsRoutingModule { }
