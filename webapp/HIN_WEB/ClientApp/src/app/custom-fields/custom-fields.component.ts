import { Component, OnInit } from '@angular/core';
import { CustomFieldsService } from './custom-fields.service';
import { DbPropertyTypes, CustomProperty, CustomFieldListItems } from './custom-fields';
import { LeadGenType } from '../helper/LeadGenType';
import { NotyHelper } from '../helper/NotyHelper';

@Component({
  selector: 'app-custom-fields',
  templateUrl: './custom-fields.component.html',
  styleUrls: ['./custom-fields.component.css']
})
export class CustomFieldsComponent implements OnInit {
  activeContainer: string = "tab1";
  public staticFilter: any;
  public orderBy: any;
  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public apiUrl: string;
  public pageSize: number;
  public isResponsive: boolean;
  public isSearchEnabled: boolean;
  public isPaginationEnabled: boolean;
  public actions: Array<any>;
  public pageLengthOptions: Array<number>;
  addCustomToggle: boolean = false;
  public showListItem: boolean = false;
  public dbPropertyTypes: Array<DbPropertyTypes> = [];
  public customField: CustomProperty = new CustomProperty;
  public lstCustomFieldListItems: Array<CustomFieldListItems> = [];
  constructor(private service: CustomFieldsService, public notification: NotyHelper) {
    
  }
  public convertedType = Object.keys(LeadGenType).map(key => {
    return {
      id: LeadGenType[key],
      Name: key,
    };
  });
  public dbTypes = [{ id: 1, Name: "Text" }, { id: 2, Name: "Number" }, { id: 3, Name: "Decimal" }, { id: 4, Name: "Boolean" }, { id: 5, Name: "Datetime" }, { id: 6, Name: "Dropdown" }, {id:7, Name:"Multiselect"}]
  ngOnInit() {
    this.gridHeaders = [
      { displayName: 'Name', propertyName: 'PropertyName', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, gridPermissionCheck: '10.4.1.1' },
      { displayName: 'Type', propertyName: 'PropertyType', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.dbTypes, gridPermissionCheck: '10.4.1.2' },
      { displayName: 'Entity', propertyName: 'EntityTypeId', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.convertedType, gridPermissionCheck: '10.4.1.3' },
      { displayName: 'Actions', propertyName: 'x', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null, gridPermissionCheck: '10.4.1.4' }
    ];
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "PropertyName", value: "", type: "contains" },
      { column: "PropertyType", value: "", type: "contains" }
    ];
    this.actions = [
      { name: 'delete', icon: 'fa-trash-o fa-lg' }
    ];
    this.pageLengthOptions = [25, 100, 250];
    this.getCustomFieldType();
  }
  getCustomFieldType() {
    this.service.getCustomFieldType().subscribe(data => {
      if (data != null) {
        this.dbPropertyTypes = data;
      }
    }, err => { }, () => { });
    this.lstCustomFieldListItems.push(new CustomFieldListItems());
  }
  addCustomFields() {
    this.addCustomToggle = true;
  }
  addNewListItem() {
    let customFieldListItem = new CustomFieldListItems();
    this.lstCustomFieldListItems.push(customFieldListItem);
  }
  typeChange(typeId) {
    if (typeId == 6 || typeId == 7) {
      this.showListItem = true;
    }
    else {
      this.showListItem = false;
    }
  }
  deleteListItem(data) {
    this.lstCustomFieldListItems = this.lstCustomFieldListItems.filter(item => item !== data);
  }

  editCustomColumns(data) {
    if (data.dataAction == "delete") {
      if (confirm("Are you sure you want to delete?")) {
        this.service.deleteCustomField(data.dataRow.Id).subscribe(deletedData => {
            this.notification.ShowNoty("Deleted Successfully");
        }, err => { }, () => { });
    }
  }
    else {
      this.customField = data.dataRow;
      if (this.customField.PropertyType == 6 || this.customField.PropertyType == 7)
        this.typeChange(this.customField.PropertyType);
      this.service.getListItems(this.customField.Id).subscribe(data => {
        if (data)
          this.lstCustomFieldListItems = data;
      }, err => { }, () => { });
      this.addCustomToggle = true;
    }
  }


  closeError() {
    this.addCustomToggle = false;
    this.showListItem = false;
    this.customField = new CustomProperty();
    this.lstCustomFieldListItems = [];
    this.lstCustomFieldListItems.push(new CustomFieldListItems());
  }
  saveCustomField(customFields) {
    //this.lstCustomFieldListItems;
    //switch (this.activeContainer) {
    //  case 'tab1':
    //    customFields.EntityTypeId = LeadGenType.Lead;
    //    break;
    //  case 'tab2':
    //    customFields.EntityTypeId = LeadGenType.Deal;
    //    break;
    //  case 'tab3':
    //    customFields.EntityTypeId = LeadGenType.Organization;
    //    break;
    //  default:
    //    customFields.EntityTypeId = LeadGenType.Lead;
    //    break;
    //}
    this.service.saveCustomFields(customFields).subscribe(data => {
      if (data != null) {
        this.addCustomToggle = false;
        if (this.lstCustomFieldListItems.length > 0 && this.lstCustomFieldListItems[0].Description) {
          this.lstCustomFieldListItems.map(m => m.CustomPropertyId = data.Id);
          this.service.saveListItems(this.lstCustomFieldListItems).subscribe(data => {
          }, err => { }, () => { });
        }

      }
    }, err => { }, () => { });
  }
  
}
