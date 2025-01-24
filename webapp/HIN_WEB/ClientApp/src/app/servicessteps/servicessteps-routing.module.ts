import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesstepsComponent } from './servicessteps.component';

const routes: Routes = [{ path: '', component: ServicesstepsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesstepsRoutingModule { }
