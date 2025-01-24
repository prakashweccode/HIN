import { Component, OnInit } from '@angular/core';
import { DashboardStatsDto } from '../companyapi/models/dashboard-stats-dto';
import { TransactionService } from '../companyapi/services/transaction.service';
import { NotyHelper } from '../helper/NotyHelper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public dashboardStatsDto: DashboardStatsDto = {};
  constructor(private transactionService: TransactionService, private notification: NotyHelper) { }

  ngOnInit(): void {
    this.getDashboardStats();
  }
  getDashboardStats() {
    this.transactionService.apiTransactionGetDasboardStatsGet$Json().subscribe(_data => {
      if (_data) {
        this.dashboardStatsDto = _data;
      }
    }, _err => {
      this.notification.ShowNoty(_err.message);
    }, () => { });
  }
}
