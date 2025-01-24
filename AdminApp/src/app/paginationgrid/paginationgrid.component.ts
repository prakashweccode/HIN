import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GridFilterDataModel } from '../companyapi/models';
import { DataGridService } from '../companyapi/services';
import { PagerService } from '../helper/pager.service';

@Component({
  selector: 'app-paginationgrid',
  templateUrl: './paginationgrid.component.html',
  styleUrls: ['./paginationgrid.component.css']
})
export class PaginationgridComponent implements OnInit {
  public dataSource: any = [];
  public totalCount: number = 0;
  public pageOption: number = 0;
  public filterToggle: boolean = false;
  @Input() action: any;
  @Input() gridConfig: any;
  @Input() pageSize: any;
  @Input() isPaginationEnabled: any;
  @Input() isGlobalSearchEnabled: any;
  @Input() isFilterEnabled: any;
  @Input() pageLengths: any;
  @Input() filterOptions: any = {};
  selectedFilterOptions: any = [];
  pager: any = {};
  startRange: number = 1;
  endRange: number = 10;
  skip: number = 0;
  public search = "";
  public gridFilter: GridFilterDataModel = {};
  public isDropFilter: boolean = false;
  @Output() exportfilterDate = new EventEmitter();
  @Output() rowClick = new EventEmitter();

  constructor(public paginationGridService: DataGridService, public pagerService: PagerService) { }

  ngOnInit(): void {
    this.refreshGrid();
  }
  filterDateRange() {
    if (this.gridFilter.fromDate && this.gridFilter.endDate) {
      this.refreshGrid();
      this.exportfilterDate.emit(this.gridFilter);
    }
  }
  refreshGrid() {
    this.gridFilter.pageNumber = this.skip;
    this.gridFilter.pageSize = this.pageSize;
    this.gridFilter.search = this.search;
    this.getDataSource(this.action, this.gridFilter);

  }
  pageLength(options: any) {
    this.pager.currentPage = 1;
    this.pageSize = options;
    this.gridFilter.pageSize = this.pageSize;
    this.setPage(this.pager.currentPage);
    this.startRange = 1; this.endRange = 10;
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
    this.gridFilter.pageNumber = this.skip;
    this.getDataSource(this.action, this.gridFilter);

  }
  gridRowClick(data: any) {
    if (data) {
      this.rowClick.emit(data);
    }
  }
  getPageNumber(_startRange: any, _endRange: any) {
    var intArray = [];
    _endRange = this.pager.totalPages < _endRange ? this.pager.totalPages : _endRange;
    for (var i = _startRange; i <= _endRange; i++) {
      intArray.push(i);
    }
    return intArray;
  }

  dataProcess(prop: any, data: any) {
    if (prop.IsTranslate == true) {
      return (data[prop.propertyName]) ? ((data[prop.propertyName])) : '';
    }
    else {
      return (data[prop.propertyName]);
    }

  }

  globalSearch() {
    this.getDataSource(this.action, this.gridFilter);
  }
  getDataSource(action: any, gridFilter: any) {
    if (this.isFilterEnabled) {
      this.selectedFilterOptions.forEach((x: any) => {
        Object.assign(this.gridFilter, { [x.schemaName]: x.value });
      });
    }
    if (action == "GetCompanyUser") {
      this.paginationGridService.apiDataGridGetCompanyUserPost$Json({ body: gridFilter }).subscribe(data => {
        if (data && data.item1) {
          this.dataSource = data.item1;
        }
        else {
          this.dataSource = [];
          this.totalCount = 0;
        }

        if (data && data.item2) {
          this.totalCount = data.item2;
          if (this.skip == 0) {
            this.pager = this.pagerService.getPager(this.totalCount, 1, this.pageSize);
          }
        }
        else {
          this.totalCount = 0;
        }

      }, err => { }, () => { });
    }
    else if (action == "GetCompanyRegisterList") {
      this.paginationGridService.apiDataGridGetCompanyRegisterListPost$Json({ body: gridFilter }).subscribe(data => {
        if (data && data.item1) {
          this.dataSource = data.item1;
        }
        else {
          this.dataSource = [];
          this.totalCount = 0;
        }

        if (data && data.item2) {
          this.totalCount = data.item2;
          if (this.skip == 0) {
            this.pager = this.pagerService.getPager(this.totalCount, 1, this.pageSize);
          }
        }
        else {
          this.totalCount = 0;
        }

      }, err => { }, () => { });
    }
    else {
      this.paginationGridService.apiDataGridGetTenantUserListPost$Json({ body: gridFilter }).subscribe(data => {
        if (data && data.item1) {
          this.dataSource = data.item1;
        }
        else {
          this.dataSource = [];
          this.totalCount = 0;
        }

        if (data && data.item2) {
          this.totalCount = data.item2;
          if (this.skip == 0) {
            this.pager = this.pagerService.getPager(this.totalCount, 1, this.pageSize);
          }
        }
        else {
          this.totalCount = 0;
        }

      }, err => { }, () => { });
    }

  }

  removeFilterOption(option: any) {
    this.selectedFilterOptions = this.selectedFilterOptions.filter((_x: any) => _x != option);
    this.filterOptions.find((x: any) => x.column === option.column).value = "";
    Object.assign(this.gridFilter, { [option.schemaName]: null });
    this.getDataSource(this.action, this.gridFilter);
  }
  //Push the filter values to selected item array
  onFilterChange(item: any, evt: any) {
    if (item && evt) {
      item.value = evt;
      let newItem = this.selectedFilterOptions.find((x: any) => x == item);
      if (!newItem)
        this.selectedFilterOptions.push(item);
      if (this.selectedFilterOptions.length > 0) {
        this.getDataSource(this.action, this.gridFilter);
      }
    }
  }

  clearAllFilters() {
    this.selectedFilterOptions = [];
    this.filterOptions.forEach((x: any) => {
      x.value = "";
      Object.assign(this.gridFilter, { [x.schemaName]: null });
    });
    this.getDataSource(this.action, this.gridFilter);
  }
}
