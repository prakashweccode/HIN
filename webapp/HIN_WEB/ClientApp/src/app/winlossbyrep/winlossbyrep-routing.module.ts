import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WinlossbyrepComponent } from './winlossbyrep.component';

const routes: Routes = [{ path: '', component: WinlossbyrepComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WinlossbyrepRoutingModule { }
