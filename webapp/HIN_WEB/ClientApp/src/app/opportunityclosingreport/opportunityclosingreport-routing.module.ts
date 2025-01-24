import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunityclosingreportComponent } from './opportunityclosingreport.component';

const routes: Routes = [{ path: '', component: OpportunityclosingreportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunityclosingreportRoutingModule { }
