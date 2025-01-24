import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListtemplateComponent } from './listtemplate.component';

const routes: Routes = [{ path: '', component: ListtemplateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListtemplateRoutingModule { }
