import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntitynameComponent } from './entityname.component';

const routes: Routes = [{ path: '', component: EntitynameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitynameRoutingModule { }
