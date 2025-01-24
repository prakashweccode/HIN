import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Customdropdown } from './customdropdown';
import { CustomdropdownService } from './customdropdown.service';

@Component({
  selector: 'app-customdropdown',
  templateUrl: './customdropdown.component.html',
  styleUrls: ['./customdropdown.component.css']
})
export class CustomdropdownComponent implements OnInit {
  customDropDown: Customdropdown = new Customdropdown();
  addValueModel: boolean = false;
  @Input() isAddEnabled: boolean = false;
  @Input() saveApiPath: string;
  @Input() getApiPath: string;
  @Input() selectedValue: number;
  @Input() notFilter: string[] = [];
  selectedArrayData: Array<Customdropdown> = [];
  //@Input() selectedArrayData: [];
  //@Input() selectedId: string;
  //@Input() selectedName: string;
  @Output() saveSelectedValue = new EventEmitter();
  //@Output() saveNewValue = new EventEmitter();
  constructor(public customDropDownService:CustomdropdownService) { }

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
        if (this.notFilter) {
          var result = data.filter(item => !this.notFilter.includes(item.DropDownName));
          this.selectedArrayData = result;
        }
        else {
          this.selectedArrayData = data;
        }
      }
    });
  }

  addNewValue() {
    this.addValueModel = true;
  }

  closeToggle() {
    this.selectedValue = 0;
    this.addValueModel = false;
  }


}
