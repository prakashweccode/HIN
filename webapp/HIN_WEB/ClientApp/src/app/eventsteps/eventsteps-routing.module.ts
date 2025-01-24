import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventstepsComponent } from './eventsteps.component';

const routes: Routes = [{ path: '', component: EventstepsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventstepsRoutingModule { }
