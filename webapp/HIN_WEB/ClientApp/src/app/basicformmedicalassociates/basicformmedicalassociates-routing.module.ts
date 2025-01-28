import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicformmedicalassociatesComponent } from './basicformmedicalassociates.component';

const routes: Routes = [{ path: '', component: BasicformmedicalassociatesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicformmedicalassociatesRoutingModule { }
