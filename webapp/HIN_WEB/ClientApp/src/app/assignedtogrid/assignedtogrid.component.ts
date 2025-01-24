import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'oidc-client';
import { Assignedtogrid } from './assignedtogrid';
import { AssignedtogridService } from './assignedtogrid.service';

@Component({
  selector: 'app-assignedtogrid',
  templateUrl: './assignedtogrid.component.html',
  styleUrls: ['./assignedtogrid.component.css']
})
export class AssignedtogridComponent implements OnInit {
  p: number = 1;
  @Input() assignedToGrid: Assignedtogrid = new Assignedtogrid();
  contactModal: boolean = false;
  @Input() multiSelect: boolean = false;
  multipleData: Array<any> = [];
  selectedData: Array<any> = [];
  selectedName: Array<any> = [];
  @Output() sendArrayOfAssignedId = new EventEmitter();
  temp: Array<any> = [];
  arrayOfData: Array<any> = [];
  @Output() sendAssignedId = new EventEmitter();
  listContact = [];
  filter: string;
  name: string;
  startRange: number = 1;
  endRange: number = 5;
  pager: any = {};
  totalCount: number = 0;
  skip: number = 0;
  pageLengths: Array<number>;
  constructor(public assignedtoservice: AssignedtogridService) { }

  ngOnInit() {
    this.assignedToGrid.IsPaginationEnabled = true;
    this.assignedToGrid.PageLengthOptions = [25, 100, 250];
    this.assignedToGrid.PageSize = 5;
    let _pageLength = this.assignedToGrid.PageLengthOptions;
    this.pageLengths = _pageLength;
    if (this.assignedToGrid.ApiUrl) {
      this.getData();
    }
    if (this.assignedToGrid.AssignedToId > 0) {

    }
    else {
      this.sendAssignedId.emit({ UserId: 0, Name: '--All--' });
    }
  }

  selectedArrayData(evt) {
    if (evt) {
      this.multipleData.push(evt);
    }
  }

  sendSelectedArraydata() {
    this.selectedData = this.multipleData;
    this.sendArrayOfAssignedId.emit(this.selectedData);
    for (var i = 0; i < this.selectedData.length; i++) {
      this.selectedName.push(this.selectedData[i][this.assignedToGrid.DisplayName]);
    }
    this.multipleData = [];
    this.contactModal = false;
  }


  defaultFilter() {
    this.startRange = 1;
    this.endRange = 5;
    this.skip = 0;
  }

  getPageNumber(_startRange, _endRange) {
    var intArray = [];
    _endRange = this.pager.totalPages < _endRange ? this.pager.totalPages : _endRange;
    for (var i = _startRange; i <= _endRange; i++) {
      intArray.push(i);
    }
    return intArray;
  }

  clearFiltro() {
    this.filter = "";
    this.updateFilter();
    //this.sendAssignedId.emit(null);
    //this.sendArrayOfAssignedId.emit(null);
  }

  updateFilter() {
    let propName = this.assignedToGrid.GridHeaders[0].propertyName;
    const val = this.filter.toLowerCase();
    if (val == "") {
      this.temp = this.arrayOfData;
    }
    else {
      const temp = this.arrayOfData.filter(function (d) {
        return d[propName].toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.temp = temp;
    }
  }


  getData() {
    this.assignedtoservice.getData(this.assignedToGrid.ApiUrl).subscribe(data => {
      if (data) {
        this.totalCount = data.length;
        if (this.skip == 0) {
          this.pager = this.assignedtoservice.getPager(this.totalCount, 1, this.assignedToGrid.PageSize);
        }
        this.arrayOfData = data;
        this.temp = data;
        if (this.arrayOfData.length > 0 && this.assignedToGrid.AssignedToId > 0) {
          this.getAssignedToName(this.assignedToGrid.AssignedToId, this.assignedToGrid.AssignedToType);
        }
      }
      else {
        this.totalCount = 0;
      }
    }, err => { }, () => { });
  }

  pageLength(options) {
    this.pager.currentPage = 1;
    this.assignedToGrid.PageSize = options;
    this.setPage(this.pager.currentPage);
    this.startRange = 1; this.endRange = 5;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    if (page == this.endRange + 1) {
      this.startRange = this.startRange + 5; this.endRange = this.endRange + 5; this.pager.currentPage = this.startRange;
    }
    if (page == this.startRange - 1) {
      this.startRange = this.startRange - 5; this.endRange = this.endRange - 5; this.pager.currentPage = this.startRange;
    }
    this.pager = this.assignedtoservice.getPager(this.totalCount, page, this.assignedToGrid.PageSize);
    this.skip = (page - 1) * this.assignedToGrid.PageSize;
    this.getData();
  }

  dataProcess(prop, data) {
    let stringProp = prop.split('.');
    return stringProp.length == 1 ? (data[prop]) : this.dataProcess(stringProp[1], data[stringProp[0]]);
  }

  viewContactModal() {
    this.filter = "";
    this.contactModal = true;
  }

  getAssignedToName(id, type) {
    if (id == 0) {
      this.name = "--All--";


    }
    else {
      if (id && type) {

        this.name = this.arrayOfData.find(x => x[this.assignedToGrid.KeyId] == id && x[this.assignedToGrid.KeyValue] == type)[this.assignedToGrid.DisplayName];
      }
      else {
        this.name = this.arrayOfData.find(x => x[this.assignedToGrid.KeyId] == id)[this.assignedToGrid.DisplayName];
      }

    }

  }

  closeContactModal() {
    this.filter = "";
    this.multipleData = [];
    this.contactModal = false;
  }

  clearData() {
    this.selectedName = [];
    this.assignedToGrid.AssignedToId = null;
    this.sendAssignedId.emit(null);
    this.sendArrayOfAssignedId.emit(null);
  }

  selectContact(data) {
    if (data) {
      this.assignedToGrid.AssignedToId = data[this.assignedToGrid.KeyId];
      this.getAssignedToName(data[this.assignedToGrid.KeyId], data[this.assignedToGrid.KeyValue]);
    }
    this.sendAssignedId.emit(data);
    this.contactModal = false;
  }

}
