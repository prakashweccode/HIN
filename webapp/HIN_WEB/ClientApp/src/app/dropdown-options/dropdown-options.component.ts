import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotyHelper } from '../helper/NotyHelper';
import { EntityListOption } from '../model/config';
import { DropdownOptionsService } from './dropdown-options.service';

@Component({
  selector: 'app-dropdown-options',
  templateUrl: './dropdown-options.component.html',
  styleUrls: ['./dropdown-options.component.css']
})
export class DropdownOptionsComponent implements OnInit {
  @Output() selectedNoteId = new EventEmitter();
  @Input() config: any;
  @Input() isIdColum: boolean = true;
  @Input() selectedName: string;
  @Input() selectedId: number;
  @Input() entityType: number;
  @Input() getApi: any;
  @Input() postApi: any;
  public addOptionToggle: boolean = false;
  public editOptionToggle: boolean = false;
  public dataSource: Array<EntityListOption> = [];
  public selectedListOption: EntityListOption;
  public listOptions: Array<EntityListOption> = [];
  constructor(private sanitizer: DomSanitizer, private noty: NotyHelper, private service: DropdownOptionsService) { }

  ngOnInit() {
    //this.addNewItem();
    this.getData();
  }
  closeAddOptionPopup() {
    this.addOptionToggle = false;
  }
  closeEditOptionPopup() {
    this.editOptionToggle = false;
  }
  addListOption() {
    this.listOptions = [];
    this.addNewItem();
    this.addOptionToggle = true;
  }
  editListOption() {
    if (this.selectedListOption) {
      this.editOptionToggle = true;
    }
    else {
      this.noty.ShowNoty("Select an option to edit.")
    }
  }
  getData() {
    this.service.getDropDownOptions(this.entityType).subscribe(_data => {
      if (_data) {
        this.dataSource = _data;
      }
    }, err => { }, () => { });
  }
  deleteListItem(data) {
    this.listOptions = this.listOptions.filter(item => item !== data);
  }
  bindAsHtml(html) {
    if (html) {
      let safeHTML = this.sanitizer.bypassSecurityTrustHtml(html);
      return safeHTML;
    }
  }
  changeSelectedOption(evt) {
    if (evt) {
      this.selectedListOption = this.dataSource.find(x => x.Id == evt.target.value);
      this.selectedNoteId.emit(this.selectedListOption);
    }
  }

  changeSelectedOptioninString(evt) {
    if (evt) {
      this.selectedListOption = this.dataSource.find(x => x.Description == evt);
      this.selectedNoteId.emit(evt);
    }
  }

  addNewItem() {
    let newOption = new EntityListOption();
    newOption.Type = this.entityType;
    this.listOptions.push(newOption);
  }
  addNewListItem() {
    this.addNewItem();
  }
  saveOptions() {
    if (this.listOptions.length > 0) {
      this.service.saveOptions(this.listOptions).subscribe(_data => {
        if (_data) {
          this.getData();
          this.addOptionToggle = false;
          this.noty.ShowNoty("Saved successfully.");
        }
      }, _err => { }, () => { });
    }
    else {
      this.noty.ShowNoty("Add atleast one item to save.");
    }
  }
  updateOption() {
    if (this.selectedListOption && this.selectedListOption.Description) {
      this.service.updateListOption(this.selectedListOption).subscribe(_data => {
        if (_data) {
          this.getData();
          this.editOptionToggle = false;
          this.noty.ShowNoty("Updated successfully.");
        }
      }, _err => { }, () => { });
    }
    else {
      this.noty.ShowNoty("Please enter value to update.");
    }
  }
}
