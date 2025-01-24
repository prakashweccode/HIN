import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddeventComponent } from './addevent.component';

const routes: Routes = [{ path: '', component: AddeventComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddeventRoutingModule { }
