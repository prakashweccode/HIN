import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunityvariancereportComponent } from './opportunityvariancereport.component';

const routes: Routes = [{ path: '', component: OpportunityvariancereportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunityvariancereportRoutingModule { }
