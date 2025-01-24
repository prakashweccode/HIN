import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdduserRoutingModule } from './adduser-routing.module';
import { AdduserComponent } from './adduser.component';
import { FormsModule } from '@angular/forms';
import { CategorylistModule } from '../categorylist/categorylist.module';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { NgxMaskModule } from 'ngx-mask';
import { SfFileExplorerModule } from '../sf-file-explorer/sf-file-explorer.module';
import { AddnewfieldModule } from '../addnewfield/addnewfield.module';
import { CustomsectionModule } from '../customsection/customsection.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SignpadModule } from '../signpad/signpad.module';


@NgModule({
  declarations: [AdduserComponent],
  imports: [
    CommonModule,
    AdduserRoutingModule,
    FormsModule,
    CategorylistModule, CustomdropdownModule, DirectiveHelperModule, NgxMaskModule, SfFileExplorerModule, AddnewfieldModule, CustomsectionModule, SignpadModule,NgMultiSelectDropDownModule.forRoot()
  ]
})
export class AdduserModule { }
