import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddeventshowComponent } from './addeventshow.component';

const routes: Routes = [{ path: '', component: AddeventshowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddeventshowRoutingModule { }
