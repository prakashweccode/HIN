import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddtemppatientComponent } from './addtemppatient.component';

const routes: Routes = [{ path: '', component: AddtemppatientComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddtemppatientRoutingModule { }
