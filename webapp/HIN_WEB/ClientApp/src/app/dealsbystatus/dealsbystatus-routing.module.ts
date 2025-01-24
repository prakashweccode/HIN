import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealsbystatusComponent } from './dealsbystatus.component';

const routes: Routes = [{ path: '', component: DealsbystatusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealsbystatusRoutingModule { }
