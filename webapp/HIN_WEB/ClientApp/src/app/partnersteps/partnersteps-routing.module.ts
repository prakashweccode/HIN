import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartnerstepsComponent } from './partnersteps.component';

const routes: Routes = [{ path: '', component: PartnerstepsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerstepsRoutingModule { }
