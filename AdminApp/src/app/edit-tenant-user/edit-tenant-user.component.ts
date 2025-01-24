import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TenantUserDto } from '../companyapi/models';
import { TransactionService } from '../companyapi/services/transaction.service';
import { NotyHelper } from '../helper/NotyHelper';

@Component({
  selector: 'app-edit-tenant-user',
  templateUrl: './edit-tenant-user.component.html',
  styleUrls: ['./edit-tenant-user.component.css']
})
export class EditTenantUserComponent implements OnInit {
  public id: number = 0;
  public tenant: string = '';
  public userDetails: any = {};
  public loginPassword: string = '';
  public adminPassword: string = '';
  constructor(private currentRoute: ActivatedRoute, private transactionService: TransactionService, private notification: NotyHelper)
  {
    var userId = this.currentRoute.snapshot.paramMap.get('id');
    var companyName = this.currentRoute.snapshot.paramMap.get('id2');
    if (userId && companyName) {
      this.id = parseInt(userId);
      this.tenant = companyName;
    }
  }

  ngOnInit(): void {
    if (this.id && this.tenant) {
      this.getTenantUserById();
    }
  }

  getTenantUserById() {
    this.transactionService.apiTransactionGetTenantUserByIdGet$Json({ userId: this.id, tenantName: this.tenant }).subscribe(_data => {
      if (_data) {
        this.userDetails = _data;
      }
    }, _err => {
      this.notification.ShowNoty(_err.message);
    }, () => { });
  }

  updateUserDetails(data: TenantUserDto) {
    data.tenant = this.tenant;
    data.password = this.loginPassword;
    data.adminPassword = this.adminPassword;
    this.transactionService.apiTransactionUpdateTenantUserPost$Json({ body: data }).subscribe(_data => {
      this.notification.ShowNoty("Data updated successfully");
    }, _err => {
      this.notification.ShowNoty(_err.message);
    }, () => { });
  }
}
