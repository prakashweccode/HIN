import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddquoteComponent } from './addquote.component';

const routes: Routes = [{ path: '', component: AddquoteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddquoteRoutingModule { }
