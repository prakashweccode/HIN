import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginationgridComponent } from './paginationgrid.component';

const routes: Routes = [{ path: '', component: PaginationgridComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginationgridRoutingModule { }
