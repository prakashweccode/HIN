import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslaterComponent } from './translater.component';

const routes: Routes = [{ path: '', component: TranslaterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslaterRoutingModule { }
