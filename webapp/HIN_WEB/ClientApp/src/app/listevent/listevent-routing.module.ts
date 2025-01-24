import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeventComponent } from './listevent.component';

const routes: Routes = [{ path: '', component: ListeventComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListeventRoutingModule { }
