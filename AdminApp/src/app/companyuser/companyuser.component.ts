import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyUserDataModel } from '../companyapi/models';
import { CompanyUserService } from '../companyapi/services';


@Component({
  selector: 'app-companyuser',
  templateUrl: './companyuser.component.html',
  styleUrls: ['./companyuser.component.css']
})

export class CompanyuserComponent implements OnInit {
  constructor(private companyUserService: CompanyUserService, private router: Router) { }
  public userList: CompanyUserDataModel[] = [];
  public gridConfig: any;
  public gridConfigs: any;
  public pageLengths: any;

  ngOnInit(): void {
    this.companyUserService.apiCompanyUserFindAllCompanyUserGet$Json().subscribe(
      (data: CompanyUserDataModel[])=>{
        this.userList =data;
      }, 
      (err: any)=>{}, 
      () => { });
    this.gridConfig = [
      { headerName: "UserId", propertyName: "userId" },
      { headerName: "User Name", propertyName: "userName" }
    ];
    this.pageLengths = [10, 15, 20];
  }
  navigateAction(data: any) {
    if (data) {
      //this.router.navigate([
      //  "../../home",
      //  {
      //    outlets: {
      //      sidenav: "edit-company/" + data.userId
      //    }
      //  }
      //]);
    }
  }
}
