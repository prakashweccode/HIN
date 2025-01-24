import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CustomProperty, CustomFieldListItems, DbPropertyTypes } from '../custom-fields/custom-fields';
import { CustomFieldsService } from '../custom-fields/custom-fields.service';
import { LeadGenType } from '../helper/LeadGenType';
import { CustomsectionComponent } from '../customsection/customsection.component';
import { CustomsectionService } from '../customsection/customsection.service';

@Component({
  selector: 'app-addnewfield',
  templateUrl: './addnewfield.component.html',
  styleUrls: ['./addnewfield.component.css']
})
export class AddnewfieldComponent implements OnInit {

  lstCustomFieldListItems: Array<CustomFieldListItems> = [];
  public dbPropertyTypes: Array<DbPropertyTypes> = [];
  @Input() addCustomToggle: boolean;
  @Output() saveSuccess = new EventEmitter();
  @Output() dataExist = new EventEmitter();
  public showListItem: boolean;
  customField: CustomProperty = new CustomProperty;
  lstCustomFields: Array<CustomProperty> = [];
  @Input() entityTypeId: number;
  constructor(private customFieldService: CustomFieldsService, private service: CustomsectionService) { }

  ngOnInit() {
    this.getCustomFieldType();
    this.lstCustomFieldListItems.push(new CustomFieldListItems());
    this.getCustomFields(this.entityTypeId);
  }

  getCustomFields(entityType) {
    this.service.getCustomFields(entityType, "all").subscribe(cf => {
      if (cf) {
        this.lstCustomFields = cf;
      }
    });
  }
  closeError() {
    this.addCustomToggle = false;
    this.showListItem = false;
    this.customField = new CustomProperty();
    this.lstCustomFieldListItems = [];
    this.lstCustomFieldListItems.push(new CustomFieldListItems());
  }

  addCustomFields() {
    this.addCustomToggle = true;
    this.customField.EntityTypeId = this.entityTypeId;
  }

  addNewListItem() {
    var customFieldListItem = new CustomFieldListItems();
    this.lstCustomFieldListItems.push(customFieldListItem);
  }

  saveCustomField(customFields: CustomProperty) {
    let cfExist = this.lstCustomFields.filter(x => x.PropertyName !== null && x.PropertyName.toLowerCase() == customFields.PropertyName.toLowerCase());
    if (cfExist.length > 0) {
      this.dataExist.emit("duplicate");
    }
    else {
      customFields.EntityTypeId = this.entityTypeId;
      this.customFieldService.saveCustomFields(customFields).subscribe(data => {
        if (data != null) {
          this.addCustomToggle = false;
          if (this.lstCustomFieldListItems.length > 0 && this.lstCustomFieldListItems[0].Description) {
            this.lstCustomFieldListItems.map(m => m.CustomPropertyId = data.Id);
            this.customFieldService.saveListItems(this.lstCustomFieldListItems).subscribe(data => {
            }, err => { }, () => { });
          }
          this.saveSuccess.emit(JSON.stringify(data));
        }
      }, err => { }, () => { });
    }
  }

  deleteListItem(data) {
    this.lstCustomFieldListItems = this.lstCustomFieldListItems.filter(item => item !== data);
  }

  cancelAddCustom() {
    this.addCustomToggle = false;
  }

  typeChange(typeId) {
    if (typeId == 6 || typeId == 7) {
      this.showListItem = true;
    }
  }

  getCustomFieldType() {
    this.customFieldService.getCustomFieldType().subscribe(data => {
      if (data != null) {
        this.dbPropertyTypes = data;
      }
    }, err => {

    }, () => {

    });
  }

}
