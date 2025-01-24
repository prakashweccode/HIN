import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicformComponent } from './basicform.component';

const routes: Routes = [{ path: '', component: BasicformComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicformRoutingModule { }
