import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategorylistService } from './categorylist.service';
import { Category, CategoryValues } from '../model/Category';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {
  @Input() title: string;
  @Input() entity: number;
  @Input() entityId: number;
  @Input() basePermission: string;
  @Input() categoryType: number;
  @Output() categoryEmitter = new EventEmitter();
  public toggle: boolean = false;
  public category: Category = new Category();
  public listCategories: Array<Category> = [];
  @Output() dataEmitter = new EventEmitter();
  @Input() selectedValues: Array<CategoryValues>;
  constructor(public service: CategorylistService) {  }
  ngOnDestroy() {
    //this.categoryEmitter = null;
    //this.selectedValues = null;
    //this.listCategories = null;
  }
  ngOnInit() {
    this.loadCategories();
  }
  loadCategories() {
    this.service.loadCategories(this.categoryType).subscribe(data => {
      if (data) {
        this.listCategories = data;
        if (this.entityId) {
          this.service.loadCategoryValues(this.entity, this.entityId, this.categoryType).subscribe(values => {
            if (values) {
              this.dataEmitter.emit(values);
              //this.selectedValues = values;
              //for (let i = 0; i < this.selectedValues.length; i++) {
              //  this.dataEmitter.emit(this.selectedValues[i].CategoryId);
              //}
            }
          }, err => { }, () => { });
        }
      }
    }, error => { }, () => { });
  }
  CheckSelectedValue(id) {
    let data = this.selectedValues.find(x => x.CategoryId == id);
    if (data)
      return true;
    else
      return false;
  }
  saveCategories() {
    this.category.EntityTypeId = this.categoryType;
    this.service.saveCategories(this.category).subscribe(data => {
      if (data) {
        this.category = data;
        this.toggle = false;
        this.loadCategories();
      }
    }, err => { }, () => { });
  }
  selectCategory(evt) {
    this.categoryEmitter.emit(evt);
  }
  addCategory() {
    this.category = new Category();
    this.category.IsActive = true;
    this.toggle = true;
  }
  closeToggle() {
    this.toggle = false;
  }
}
