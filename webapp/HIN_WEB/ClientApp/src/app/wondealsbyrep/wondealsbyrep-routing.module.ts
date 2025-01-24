import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WondealsbyrepComponent } from './wondealsbyrep.component';

const routes: Routes = [{ path: '', component: WondealsbyrepComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WondealsbyrepRoutingModule { }
