import { Component, OnInit, Input } from '@angular/core';
import { CustomsectionService } from './customsection.service';
import { CustomProperty, CustomPropertyValues, CustomFieldListItems, CustomFields, DbPropertyTypes } from '../custom-fields/custom-fields';
import { CustomFieldsService } from '../custom-fields/custom-fields.service';

@Component({
  selector: 'app-customsection',
  templateUrl: './customsection.component.html',
  styleUrls: ['./customsection.component.css']
})
export class CustomsectionComponent implements OnInit {
  customField: CustomProperty = new CustomProperty();
  addCustomToggle: boolean = false;
  @Input() alignment: string;
  @Input() entityType: number;
  @Input() entityId: number;
  @Input() customFields: Array<CustomProperty> = [];
  @Input() customFieldValues: Array<CustomPropertyValues> = [];
  public listItems: Array<CustomFieldListItems> = [];
  public showListItem: boolean = false;
  public dbPropertyTypes: Array<DbPropertyTypes> = [];
  public lstCustomFieldListItems: Array<CustomFieldListItems> = [];
  constructor(private service: CustomsectionService, private customFieldService: CustomFieldsService) { }
 
  ngOnInit() {
    this.getCustomFieldType();
    this.entityId;
    this.getCustomFields(this.entityType);
  }

  getCustomFieldType() {
    this.customFieldService.getCustomFieldType().subscribe(data => {
      if (data != null) {
        this.dbPropertyTypes = data;
      }
    }, err => { }, () => { });
    this.lstCustomFieldListItems.push(new CustomFieldListItems());
  }

  typeChange(typeId) {
    if (typeId == 6 || typeId == 7) {
      this.showListItem = true;
    }
    else {
      this.showListItem = false;
    }
  }

  addNewListItem() {
    let customFieldListItem = new CustomFieldListItems();
    this.lstCustomFieldListItems.push(customFieldListItem);
  }

  SaveCustomFieldValues(entityId) {
    for (let i = 0; i < this.customFieldValues.length; i++) {
      this.customFieldValues[i].EntityId = entityId
    }
    this.customFieldService.SaveCustomFieldValues(this.customFieldValues).subscribe(data => {
      this.getCustomFields(this.entityType);
    }, err => { }, () => { });
  }

  getDropDownItems(id, index) {
    if (index == 1) {

    }
  }

  editCustomColumn(id) {
    if (id) {
      if (this.customFields.length > 0) {
        this.customField = this.customFields.find(x => x.Id == id);
        if (this.customField.PropertyType == 6 || this.customField.PropertyType == 7)
          this.typeChange(this.customField.PropertyType);
        this.customFieldService.getListItems(this.customField.Id).subscribe(data => {
          if (data)
            this.lstCustomFieldListItems = data;
        }, err => { }, () => { });
      }
      this.addCustomToggle = true;
    }
  }

  saveCustomField(customField) {
    this.customFieldService.saveCustomFields(customField).subscribe(data => {
      if (data != null) {
        this.addCustomToggle = false;
        if (this.lstCustomFieldListItems.length > 0 && this.lstCustomFieldListItems[0].Description) {
          this.lstCustomFieldListItems.map(m => m.CustomPropertyId = data.Id);
          this.customFieldService.saveListItems(this.lstCustomFieldListItems).subscribe(data => {
          }, err => { }, () => { });
        }
      }
    }, err => { }, () => { });
  }

  closeError() {
    this.addCustomToggle = false;
    this.showListItem = false;
    this.customField = new CustomProperty();
    this.lstCustomFieldListItems = [];
    this.lstCustomFieldListItems.push(new CustomFieldListItems());
  }

  getColumnSizeClass(data) {
    switch (data.ColumnSize) {
      case 2:{
        return "w3-half w3-padding-right-small";
      }
      case 3: {
        return "w3-third w3-padding-right-small";
      }
      case 4: {
        return "w3-quarter w3-padding-right-small";
      }
      default:
        return "w3-full";
    }
  }
  getCustomFields(entityType) {
    this.service.getCustomFields(entityType, this.alignment).subscribe(cf => {
      if (cf != null) {
        if (this.entityId && this.entityId > 0) {
          this.customFieldService.getCustomFieldValues(this.entityId, entityType, this.alignment).subscribe(cfv => {
            this.customFieldValues = [];
            this.customFieldValues = cfv;
            let newValue = cf.filter(o => !cfv.find(o2 => o.Id === o2.CustomPropertyId));
            for (let i = 0; i < newValue.length; i++) {
              let customValue = new CustomPropertyValues();
              customValue.CustomPropertyId = newValue[i].Id;
              customValue.IdHtml = newValue[i].IdHtml;
              customValue.PropertyValue = null;
              this.customFieldValues.push(customValue);
            }
            this.customFields = cf;
            for (let i = 0; i < this.customFields.length; i++) {
              if (this.customFields[i].PropertyType == 6) {
                this.customFieldService.getListItems(this.customFields[i].Id).subscribe(result => {
                  if (result) {
                    this.customFields[i].ListItems = result;
                  }
                }, err => { }, () => { });
              }
            }
            if (this.customFieldValues.length == 0) {
              for (let i = 0; i < this.customFields.length; i++) {
                let customValue = new CustomPropertyValues();
                customValue.CustomPropertyId = this.customFields[i].Id;
                customValue.PropertyValue = null;
                customValue.IdHtml = this.customFields[i].IdHtml;
                this.customFieldValues.push(customValue);
              }
            }
          }, err => {
            //this.customFieldValues = [];
          }, () => { });
        }
        else {
          this.customFields = cf;
          for (let i = 0; i < this.customFields.length; i++) {
            let customValue = new CustomPropertyValues();
            customValue.CustomPropertyId = this.customFields[i].Id;
            customValue.PropertyValue = null;
            customValue.IdHtml = this.customFields[i].IdHtml;
            this.customFieldValues.push(customValue);
            if (this.customFields[i].PropertyType == 6) {
              this.customFieldService.getListItems(this.customFields[i].Id).subscribe(result => {
                if (result) {
                  this.customFields[i].ListItems = result;
                }
              }, err => { }, () => { });
            }
          }
        }
      }

    }, err => { }, () => { });
  }
}
