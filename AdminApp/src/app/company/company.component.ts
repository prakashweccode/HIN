import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyRegisterDataModel } from '../companyapi/models';
import { CompanyService } from '../companyapi/services';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public gridConfig: any;
  public pageLengths: any;
  private activatedRoute: ActivatedRoute;
  private router: Router;

 
  constructor(public companyService: CompanyService, router: Router, activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
    this.router = router;
  }
  public companyList: CompanyRegisterDataModel[] = [];
  ngOnInit(): void {
    this.companyService.apiCompanyFindAllCompanyRegisterGet$Json().subscribe(
      (data: CompanyRegisterDataModel[]) => {
        this.companyList = data;
      },
      (err: any) => { },
      () => { });

    this.gridConfig = [
      /*   { headerName: "Aktiv", active: true },*/
      { headerName: "Company Name", propertyName: "companyName" },
      { headerName: "Email", propertyName: "email" },
      //{ headerName: "Actions", action: true, propertyName: null }
    ];
    this.pageLengths = [10, 15, 20];
  }

  createCompany() {
    this.router.navigate([
      "../../home",
      {
        outlets: {
          sidenav: "add-company"
        }
      }
    ]);
  }

  navigateAction(data: any) {
    if (data) {
      this.router.navigate([
        "../../home",
        {
          outlets: {
            sidenav: "edit-company/" + data.registerId
          }
        }
      ]);
    }
  }
}
