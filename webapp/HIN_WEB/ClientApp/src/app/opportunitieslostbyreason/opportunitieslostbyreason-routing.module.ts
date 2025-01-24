import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunitieslostbyreasonComponent } from './opportunitieslostbyreason.component';

const routes: Routes = [{ path: '', component: OpportunitieslostbyreasonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunitieslostbyreasonRoutingModule { }
