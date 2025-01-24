import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeventshowComponent } from './listeventshow.component';

const routes: Routes = [{ path: '', component: ListeventshowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListeventshowRoutingModule { }
