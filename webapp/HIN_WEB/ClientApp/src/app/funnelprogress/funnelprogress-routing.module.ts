import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FunnelprogressComponent } from './funnelprogress.component';

const routes: Routes = [{ path: '', component: FunnelprogressComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunnelprogressRoutingModule { }
