import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailtemplateComponent } from './emailtemplate.component';

const routes: Routes = [{ path: '', component: EmailtemplateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailtemplateRoutingModule { }
