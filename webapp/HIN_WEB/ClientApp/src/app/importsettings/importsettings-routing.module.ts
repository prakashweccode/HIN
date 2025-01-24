import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportsettingsComponent } from './importsettings.component';

const routes: Routes = [{ path: '', component: ImportsettingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportsettingsRoutingModule { }
