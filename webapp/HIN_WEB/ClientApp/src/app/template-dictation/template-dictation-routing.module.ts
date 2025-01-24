import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplateDictationComponent } from './template-dictation.component';

const routes: Routes = [{ path: '', component: TemplateDictationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateDictationRoutingModule { }
