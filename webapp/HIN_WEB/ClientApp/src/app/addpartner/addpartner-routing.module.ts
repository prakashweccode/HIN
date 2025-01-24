import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddpartnerComponent } from './addpartner.component';

const routes: Routes = [{ path: '', component: AddpartnerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddpartnerRoutingModule { }
