import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddvendorreportComponent } from './addvendorreport.component';

const routes: Routes = [{ path: '', component: AddvendorreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddvendorreportRoutingModule { }
