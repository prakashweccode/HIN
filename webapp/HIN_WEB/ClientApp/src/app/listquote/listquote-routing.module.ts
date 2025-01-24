import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListquoteComponent } from './listquote.component';

const routes: Routes = [{ path: '', component: ListquoteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListquoteRoutingModule { }
