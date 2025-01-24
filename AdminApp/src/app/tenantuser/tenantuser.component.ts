import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterDropDownListRequestDto, TenantUserDataModel } from '../companyapi/models';
import { DataGridService, TenantUserService } from '../companyapi/services';

@Component({
  selector: 'app-tenantuser',
  templateUrl: './tenantuser.component.html',
  styleUrls: ['./tenantuser.component.css']
})
export class TenantuserComponent implements OnInit {
  public tenantList: TenantUserDataModel[] = [];
  public filterDropdownListRequest: FilterDropDownListRequestDto = {};
  public gridConfig: any;
  public pageLengths: any;
  filterOptions: any = [
    {
      orderNo: 1,
      title: "Company",
      placeholder: "Select",
      type: "dropdown",
      data: [],
      columnWidth: 2,
      column: 'companyId',
      schemaName:'companyId',
      value: ""
    },
    {
      orderNo: 2,
      title: "User Email",
      placeholder: "User",
      type: "text",
      data: [],
      columnWidth: 2,
      column: 'tenant',
      schemaName: 'userName',
      value: ""
    }
  ];
  constructor(private tenantUserService: TenantUserService, private gridService: DataGridService, private router: Router) { }

  ngOnInit(): void {
    this.filterDropdownListRequest.tableName = "TenantUser";
    this.filterDropdownListRequest.keyColumn = "CompanyId";
    this.filterDropdownListRequest.valueColumn = "Tenant";
    this.gridService.apiDataGridGetFilterDropDownResponsePost$Json({ body: this.filterDropdownListRequest }).subscribe(_data => {
      if (_data) {
        this.filterOptions[0].data = _data;
      }
    },
      (err: any) => { },
      () => { });

    this.gridConfig = [
      { headerName: "UserId", propertyName: "userId" },
      { headerName: "User Email", propertyName: "email" },
      { headerName: "Company Id", propertyName: "companyId" },
      { headerName: "Company Url", propertyName: "tenant", IsTranslate: true }
    ];
    this.pageLengths = [10, 15, 20];
  }
  SyncCompany() {
    this.tenantUserService.apiTenantUserSyncTenantUserGet$Json().subscribe(data => { }, err => { }, () => { });
  }
  navigateAction(data: any) {
    if (data) {
      this.router.navigate([
        "../../home",
        {
          outlets: {
            sidenav: "edit-tenant-user/" + data.userId + "/" + data.tenant
          }
        }
      ]);
    }
  }
}
