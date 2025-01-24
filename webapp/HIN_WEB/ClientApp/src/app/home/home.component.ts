import { Component, ViewChild } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { Title } from '@angular/platform-browser';
import { DashboardWidgetComponent } from '../helper/dashboard-widget/dashboard-widget.component';
import { Opportunityacquisitioncost } from '../model/opportunityacquisitioncost';
import { ChartCreationService } from '../chart-creation/chart-creation.service';
import { ChartConfig, DashboardUserConfig, VwDashboardChartConfig } from '../model/report-settings';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  opportunityacquisitioncost: Opportunityacquisitioncost = new Opportunityacquisitioncost()
  public timeLines: Array<any> = [];
  public userId: number;
  //public dashboardConfigs: Array<DashboardUserConfig> = [];
  //public chartConfigs: Array<ChartConfig> = [];
  public dashboardChartConfigs: Array<VwDashboardChartConfig> = [];
  public lineChartTitle = 'Opportunity Completed';
  public lineChartType = 'BarChart';
  public lineChartData = [
    ["2021", 100],
    ["2020", 80],
    ["2019", 50]
  ];
  public lineChartNames = ['Assigned', 'Completed'];
  public lineChartOptions = {
  };
  public lineChartWidth = 750;
  public lineChartHeight = 400;
  public columnChartTitle = 'Opportunity Completed';
  public columnChartType = 'ColumnChart';
  public columnChartData = [
    ["2021", 100],
    ["2020", 80],
    ["2019", 50]
  ];
  public columnChartColumns = ['Assigned', 'Completed'];
  public columnChartOptions = {};
  public columnChartWidth = 700;
  public columnChartHeight = 400;


  public pieChartTitle = 'Opportunity Completed';
  public pieChartType = 'PieChart';
  public pieChartData = [
    ['2021', 45.0],
    ['2020', 35.8],
    ['2019', 19.2]
  ];
  public pieChartColumns = ['Year', 'Percentage'];
  public pieChartOptions = {
  };
  public pieChartWidth = 650;
  public pieChartHeight = 400;

  @ViewChild('DashboardWidgetComponent', { static: false }) theChild: DashboardWidgetComponent;
  constructor(appConfigSvc: AppConfigService, titleService: Title, private chartService: ChartCreationService, private router: Router) {
    appConfigSvc.getAppConfig().subscribe(data => {
      titleService.setTitle((data.settings.find(x => x.key == 'AppTitle').value) + " | Home");
    });
  }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("userDetail"));
    if (user) {
      this.userId = user.User.UserId;
      this.getDashboardCharts(this.userId);
    }
    //let data = [{ "title": "Test 1", "description": "This is first timeline description...", "direction": "left" }, { "title": "Test 2", "description": "This is second timeline description...", "direction": "right" }];
    //this.timeLines = data;
  }

  getDashboardCharts(userId) {
    this.chartService.getAllChartConfig().subscribe(_data => {
      if (_data) {
        this.dashboardChartConfigs = _data;
        this.dashboardChartConfigs.forEach(_x => {
          this.getChartData(_x);
        });
      }
    }, _err => { }, () => { });
  }
  getChartData(chartConfig) {
    if (chartConfig.DisplayChart) {
      this.chartService.getChartData(chartConfig).subscribe(_data => {
        if (_data) {
          let data = [];
          _data.forEach(_x => {
            switch (chartConfig.GroupById)
            {
              case 1:
                data.push([_x[0].dealStatus, _x.length]);
                break;
              case 2:
                data.push([_x[0].assignedTo, _x.length]);
                break;
              case 3:
                data.push([_x[0].pipeline, _x.length]);
                break;
              default:
                break;
            }
          });
          chartConfig.ChartData = data;
        }
      }, _err => { }, () => { });
    }
  }
  gotoDashboardConfig() {
    this.router.navigate(['/listDashboardConfig']);
  }
}
