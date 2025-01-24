import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyDto } from '../companyapi/models/company-dto';
import { TransactionService } from '../companyapi/services/transaction.service';
import { NotyHelper } from '../helper/NotyHelper';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
  public id: number = 0;
  public companyDetails: CompanyDto = {};
  constructor(private currentRoute: ActivatedRoute, private transactionService: TransactionService, private notification: NotyHelper) {
    var companyId = this.currentRoute.snapshot.paramMap.get('id');
    if (companyId) {
      this.id = parseInt(companyId);
    }
  }

  ngOnInit(): void {
    if (this.id) {
      this.getCompanyDetailsById(this.id)
    }
  }
  getCompanyDetailsById(id: number) {
    this.transactionService.apiTransactionGetCompanyDetailsByIdGet$Json({ companyId: id }).subscribe(_data => {
      if (_data) {
        this.companyDetails = _data;
      }
    }, _err => { }, () => { });
  }

  updateCompanyDetails(companyDetails: CompanyDto) {
    this.transactionService.apiTransactionUpdateCompanyRegisterPost$Json({ body: companyDetails }).subscribe(_data => {
        this.notification.ShowNoty("Data updated successfully");
    }, _err => {
      this.notification.ShowNoty(_err.message);
    }, () => { });
  }
}
