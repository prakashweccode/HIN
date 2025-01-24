import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddgroupRoutingModule } from './addgroup-routing.module';
import { AddgroupComponent } from './addgroup.component';
import { FormsModule } from '@angular/forms';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [AddgroupComponent],
  imports: [
    CommonModule,
    AddgroupRoutingModule,FormsModule, DirectiveHelperModule
  ]
})
export class AddgroupModule { }
