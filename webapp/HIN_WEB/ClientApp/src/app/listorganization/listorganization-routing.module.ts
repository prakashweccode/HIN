import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListorganizationComponent } from './listorganization.component';

const routes: Routes = [{ path: '', component: ListorganizationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListorganizationRoutingModule { }
