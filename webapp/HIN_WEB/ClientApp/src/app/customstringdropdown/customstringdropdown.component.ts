import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Customdropdown } from '../customdropdown/customdropdown';
import { CustomdropdownService } from '../customdropdown/customdropdown.service';

@Component({
  selector: 'app-customstringdropdown',
  templateUrl: './customstringdropdown.component.html',
  styleUrls: ['./customstringdropdown.component.css']
})
export class CustomstringdropdownComponent implements OnInit {
  customDropDown: Customdropdown = new Customdropdown();
  addValueModel: boolean = false;
  @Input() isAddEnabled: boolean = false;
  @Input() saveApiPath: string;
  @Input() getApiPath: string;
  @Input() selectedValue: string;
  selectedArrayData: Array<Customdropdown> = [];
  @Output() saveSelectedValue = new EventEmitter();
  constructor(public customDropDownService: CustomdropdownService) { }

  ngOnInit() {
    if (this.getApiPath) {
      this.getDropDownValue(this.getApiPath);
    }
  }

  sendSelectedValue(selectedValue) {
    if (selectedValue == "+ Add New") {
      this.addNewValue();
    }
    else {
      this.saveSelectedValue.emit(selectedValue);
    }
  }


  saveDropDownValue() {
    this.customDropDown.SaveApiPath = this.saveApiPath;
    this.customDropDownService.saveDropDown(this.customDropDown).subscribe(data => {
      if (data) {
        //this.saveNewValue.emit(data);
        this.getDropDownValue(this.getApiPath);
        this.addValueModel = false;
      }
    });
  }

  getDropDownValue(getPath) {
    this.customDropDownService.getDropDown(getPath).subscribe(data => {
      if (data) {
        this.selectedArrayData = data;
      }
    });
  }

  addNewValue() {
    this.addValueModel = true;
  }

  closeToggle() {
    this.selectedValue = null;
    this.addValueModel = false;
  }


}
