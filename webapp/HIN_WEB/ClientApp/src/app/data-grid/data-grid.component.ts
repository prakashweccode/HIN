import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataGridService } from './data-grid.service';
import { PagerService } from '../helper/pager.service';
import ODataFilterBuilder from 'odata-filter-builder';
import { ErrorHandler } from '../helper/ErrorHandler';
import { FilterType } from './grid-helper';
import { UserDetail } from '../login/login';
import { AddleadsService } from '../addleads/addleads.service';
import { NotyHelper } from '../helper/NotyHelper';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {
  //isLoading: boolean = false;
  @Input() allLead: boolean = false;
  @Input() staticFilter: any;
  @Input() additionalFilter: any;
  @Input() dynamicFilter: any;
  @Input() isSecurityEnabled: boolean;
  @Input() sf_orderBy: any;
  @Input() gridHeaders: Array<any>;
  @Input() dataSource: Array<any> = [];
  @Input() filterColumns: Array<any>;
  @Input() apiUrl: string;
  @Input() pageSize: number;
  @Input() isResponsive: boolean;
  @Input() isSearchEnabled: boolean;
  @Input() isPaginationEnabled: boolean;
  @Output() rowClick = new EventEmitter();
  @Output() selectedArrayOfData = new EventEmitter();
  @Input() actions: Array<any> = [];
  @Input() pageLengthOptions: Array<number>;
  @Input() expand: any;
  @Input() multiSelectType: string;
  @Input() enableSelectAll: boolean;
  @Input() enableRowNumber: boolean;
  checkedData: boolean = false;
  selectAllToggle: boolean;
  startRange: number = 1;
  endRange: number = 10;
  pager: any = {};
  totalCount: number = 0;
  order: string;
  reverse: boolean;
  @Input() filterQuery: string;
  skip: number;
  @Input() selectedArray: Array<any>;
  pageLengths: Array<number>;
  public userDetails: UserDetail = new UserDetail();
  constructor(private dataGridService: DataGridService, private pagerService: PagerService, private noty: NotyHelper, private leadService: AddleadsService) { }

  ngOnInit() {
    //this.selectedArray = [];
    let data = JSON.parse(localStorage.getItem("userDetail"));
    let _pageLength = this.pageLengthOptions;
    this.pageLengths = _pageLength;
    this.skip = 0;
    this.pageSize;
    this.filterQuery = this.filterQuery ? this.filterQuery : null;
    if (data && this.isSecurityEnabled) {
      this.userDetails = data;
      this.getSecurityFilterQuery(this.userDetails.User.UserId);
    }
    else if (this.isSecurityEnabled == false) {
      this.getActiveFilterQuery();
    }
    else {
      this.getData();
    }
  }

  checkAllLead(evt) {
    if (evt && evt == true) {
      this.additionalFilter = null;
    }
    else {
      this.additionalFilter = 'Inactive eq null or Inactive eq false';
    }
    if (this.isSecurityEnabled) {
      this.getSecurityFilterQuery(this.userDetails.User.UserId);
    }
    else {
      this.getActiveFilterQuery();
    }

  }


  selectChange(data, rowTemplate) {
    if (this.selectedArray.length > 0) {
      let filterData;
      if (this.multiSelectType == 'lead') {
        filterData = this.selectedArray.find(x => x.LeadId == data.LeadId);
      }
      else {
        filterData = this.selectedArray.find(x => x.Id == data.Id);
      }
      if (filterData) {
        data.isChecked = false;
        this.selectedArray = this.selectedArray.filter(x => x != filterData);
      }
      else {
        data.isChecked = true;
        this.selectedArray.push(data);
      }
    }
    else {
      data.isChecked = true;
      this.selectedArray.push(data);
    }
    this.selectedArrayOfData.emit(this.selectedArray);
    //this.isSelected(data, rowTemplate);
  }

  isSelected(data, rowTemplate) {
    if (this.selectedArray) {
      var selected = this.selectedArray.find(x => x == data);
      //this.changeSelectedRowColor(selected, rowTemplate);
    }
  }
  changeSelectedRowColor(selected, rowTemplate) {
    if (selected) {
      rowTemplate.bgColor = "#c3cdfe";
    }
    else {
      rowTemplate.bgColor = "";
    }
  }
  selectDataRow(selected, rowTemplate) {
    //this.changeSelectedRowColor(selected, rowTemplate);
    return selected;
  }
  selectedData() {
    this.selectedArrayOfData.emit(this.selectedArray);
  }


  defaultFilter() {
    this.startRange = 1;
    this.endRange = 10;
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
  getData() {
    //this.isLoading = true;
    this.dataGridService.getData(this.filterQuery, this.pageSize, this.skip, this.apiUrl, this.staticFilter, this.sf_orderBy, this.expand).subscribe(
      response => {
        if (response) {
          this.dataSource = response.value;
          this.totalCount = response['@odata.count'];
          if (this.selectedArray && this.selectedArray.length > 0) {
            this.dataSource.forEach(_data => {
              let _result;
              if (this.multiSelectType == 'lead') {
                _result = this.selectedArray.filter(s_data => s_data.LeadId == _data.LeadId);
              }
              else {
                _result = this.selectedArray.filter(s_data => s_data.Id == _data.Id);
              }
              if (_result && _result.length > 0) {
                _data.isChecked = true;
              }
              else {
                _data.isChecked = false;
              }
            });
            this.dataSource.sort(x => x.isChecked ? -1 : 1);
          }
          //this.isLoading = false;
          if (this.skip == 0)
            this.pager = this.pagerService.getPager(this.totalCount, 1, this.pageSize);
        }
        else {
          this.dataSource = null;
          this.totalCount = 0;
          //this.isLoading = false;
        }
      },
      error => {
        //this.isLoading = false;
        if (error.status == 401) {
          this.noty.ShowNoty("Error:" + error.message);
        }
        else {
          //this.isLoading = false;
          this.noty.ShowNoty("Problem in fetching data..");
        }
      }
    );
  }
  dataProcess(prop, data) {
    let stringProp = prop.split('.');
    return stringProp.length == 1 ? (data[prop]) : this.dataProcess(stringProp[1], data[stringProp[0]]);
  }

  clearFilter() {
    for (let i = 0; i < this.gridHeaders.length; i++) {
      if ((this.gridHeaders[i].filter)) {
        this.gridHeaders[i].filter = "";
      }
    }
  }
  clearAllFilter() {
    this.gridHeaders.forEach(x => {
      x.filter = '';
    });
    this.filterQuery = null;
    if (this.isSecurityEnabled) {
      this.getSecurityFilterQuery(this.userDetails.User.UserId);
    }
    else {
      this.getData();
    }
  }
  pageLength(options) {
    this.pager.currentPage = 1;
    this.pageSize = options;
    this.setPage(this.pager.currentPage);
    this.startRange = 1; this.endRange = 10;
  }

  getDateFilter(property, value) {
    if (value.indexOf('/') === -1)
      value = value.split('-')[1] + '/' + value.split('-')[2] + '/' + value.split('-')[0];
    return "day(" + property + ") eq " + value.split('/')[1] + " and month(" + property + ") eq " + value.split('/')[0] + " and year(" + property + ") eq " + value.split('/')[2];
  }
  getTimeFilter(property, value) {
    return "hour(" + property + ") eq " + value.split(':')[0] + " and minute(" + property + ") eq " + value.split(':')[1];
  }
  replaceSpecialCharacters(attribute) {
    // replace the single quotes
    attribute = attribute.replace(/'/g, "''");
    attribute = attribute.replace(/"+"/g, "%2B");
    attribute = attribute.replace(/\//g, "%2F");
    attribute = attribute.replace(/"?"/g, "%3F");
    attribute = attribute.replace(/%/g, "%25");
    attribute = attribute.replace(/#/g, "%23");
    attribute = attribute.replace(/&/g, "%26");

    return attribute;
  }
  filterData() {
    this.dynamicFilter = null;
    this.defaultFilter();
    var filter = ODataFilterBuilder();
    for (let i = 0; i < this.gridHeaders.length; i++) {
      let propName = this.gridHeaders[i].propertyName;
      propName = propName.replace('.', '/');
      let secPropName = this.gridHeaders[i].secondPropertyName;
      secPropName = secPropName.replace('.', '/');
      if ((this.gridHeaders[i].filter)) {
        switch (this.gridHeaders[i].dataType) {
          case FilterType.String:
            if (secPropName) {
              if (this.gridHeaders[i].filter.split(' ').length > 1)
                filter.contains(propName, (!this.gridHeaders[i].filter.split(' ')[0] ? '' : this.replaceSpecialCharacters(this.gridHeaders[i].filter.split(' ')[0]))).contains(secPropName, (!this.gridHeaders[i].filter.split(' ')[1] ? '' : this.replaceSpecialCharacters(this.gridHeaders[i].filter.split(' ')[1])));
              else
                filter.contains(propName, this.replaceSpecialCharacters(this.gridHeaders[i].filter)).or("contains(" + secPropName + ", '" + this.replaceSpecialCharacters(this.gridHeaders[i].filter) + "')");
            }
            else {
              filter.contains(propName, (!this.gridHeaders[i].filter ? '' : this.replaceSpecialCharacters(this.gridHeaders[i].filter)));
            }
            break;
          case FilterType.Date:
            filter.fn(this.getDateFilter(propName, this.gridHeaders[i].filter), null, null);
            break;
          case FilterType.Time:
            filter.fn(this.getTimeFilter(propName, this.gridHeaders[i].filter), null, null);
            break;
          case FilterType.DateTime:
            break;
          case FilterType.Number:
            filter.eq(propName, (!this.gridHeaders[i].filter ? '' : parseInt(this.gridHeaders[i].filter)));
            break;
          default:

            break;
        }
      }
    }
    this.filterQuery = filter.toString().replace('(, )', '');
    if (this.userDetails && this.isSecurityEnabled) {
      this.getSecurityFilterQuery(this.userDetails.User.UserId);
    }
    else {
      this.getData();
    }
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    if (page == this.endRange + 1) {
      this.startRange = this.startRange + 10; this.endRange = this.endRange + 10; this.pager.currentPage = this.startRange;
    }
    if (page == this.startRange - 1) {
      this.startRange = this.startRange - 10; this.endRange = this.endRange - 10; this.pager.currentPage = this.startRange;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.totalCount, page, this.pageSize);
    // get current page of items
    this.skip = (page - 1) * this.pageSize;
    if (this.userDetails && this.isSecurityEnabled) {
      this.getSecurityFilterQuery(this.userDetails.User.UserId);
    }
    else {
      this.getData();
    }
  }
  sort(property: string, reverse?: boolean): void {
    this.order = property;
    this.sf_orderBy = '';
    if (reverse && this.order == property) {
      this.sf_orderBy = (property.includes(".") ? property.replace('.', '/') : property) + ' ' + 'desc';
      this.reverse = !reverse;
    }
    else {
      this.sf_orderBy = (property.includes(".") ? property.replace('.', '/') : property) + ' ' + 'asc';
      this.reverse = !reverse;
    }
    if (this.userDetails && this.isSecurityEnabled) {
      this.getSecurityFilterQuery(this.userDetails.User.UserId);
    }
    else {
      this.getData();
    }
  }
  GetSerializedValue(_arr, _key) {
    return _arr.find(x => x.id == _key) ? _arr.find(x => x.id == _key).Name : '';
  }
  gridRowClick(row, actionName) {
    let data = { dataRow: row, dataAction: actionName };
    this.rowClick.emit(data);
  }
  formatDate(dateObject) {
    let formattedDate = new Date(dateObject).toLocaleString() + ' UTC';
    return new Date(formattedDate).toString();
  }


  getSecurityFilterQuery(userId): void {
    if (userId) {
      this.leadService.getUserLeadIds(userId).subscribe(data => {
        if (data) {
          if (this.additionalFilter) {
            this.staticFilter = '(' + this.additionalFilter + ') and ' + '(SecurityGroupId in (' + data.join(', ') + ') or SecurityGroupId eq null)';
          }
          else {
            this.staticFilter = '(SecurityGroupId in (' + data.join(', ') + ') or SecurityGroupId eq null)';
          }
          if (this.dynamicFilter) {
            this.staticFilter = '(' + this.dynamicFilter + ') and (' + this.staticFilter + ')';
          }
          else {
            this.staticFilter = this.staticFilter;
          }
          this.getData();
        }
      }, err => { });
    }
  }

  getActiveFilterQuery(): void {
      if (this.additionalFilter) {
        this.staticFilter = '(' + this.additionalFilter + ')';
      }
      else {
        this.staticFilter = '';
      }
      if (this.dynamicFilter) {
        this.staticFilter = '(' + this.dynamicFilter + ') and (' + this.staticFilter + ')';
      }
      else {
        this.staticFilter = this.staticFilter;
      }
      this.getData();
  }


  selectAllData() {
    this.selectedArray = [];
    this.dataSource.forEach(_data => {
      _data.isChecked = true;
      this.selectedArray.push(_data);
    });
    this.selectAllToggle = true;
    this.selectedData();
  }
  unSelectAllData() {
    this.dataSource.forEach(_data => {
      _data.isChecked = false;
    });
    this.selectedArray = [];
    this.selectAllToggle = false;
    this.selectedData();
  }
}
