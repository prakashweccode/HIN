import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfficeMailboxComponent } from './office-mailbox.component';

const routes: Routes = [{ path: '', component: OfficeMailboxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeMailboxRoutingModule { }
