import { Component, Input, OnInit } from '@angular/core';
import { debug } from 'console';
import { Chart } from '../chart/chart';
import { Datashared } from '../helper/datashared';
import { LeadGenType } from '../helper/LeadGenType';
import { NotyHelper } from '../helper/NotyHelper';
import { UserDetail } from '../login/login';
import { DashboardConfigFields, SearchCriteria, DashBoardQueries, DashboardUserConfig, DashboardSettingsModel, ChartConfig } from '../model/report-settings';
import { ChartCreationService } from './chart-creation.service';

@Component({
  selector: 'app-chart-creation',
  templateUrl: './chart-creation.component.html',
  styleUrls: ['./chart-creation.component.css']
})
export class ChartCreationComponent implements OnInit {
  public chartConfig: ChartConfig = new ChartConfig();
  public listOfChartConfig: Array<ChartConfig> = [];
  public arrayOfChartType = [{ Id: 1, Name: "Pie chart" }, { Id: 2, Name: "Bar chart" }, { Id: 3, Name: "Column chart" }, { Id: 4, Name: "Line chart" }];

  @Input() entity: number;
  @Input() dashBoardQueryId: number;
  public searchValues: []; 
  public activeContainer: string = 'tabLineChart';
  public userConfig: DashboardUserConfig = new DashboardUserConfig();
  public dataFields: Array<DashboardConfigFields> = [];
  public searchCriterias: Array<SearchCriteria> = [];
  public dateCriterias: Array<SearchCriteria> = [];
  public stringCriterias: Array<SearchCriteria> = [];
  public queries: Array<DashBoardQueries> = [];
  public userDetails: UserDetail = new UserDetail();
  public previewPanel: boolean = false;
  public chartConfigToggle: boolean = false;
  public activeTab: string;
  public pieChartTitle = 'Deals Completed';
  public pieChartType = 'PieChart';
  public pieChartData = [
    ['2021', 45.0],
    ['2020', 35.8],
    ['2019', 19.2]
  ];
  public pieChartColumns = ['Year', 'Percentage'];
  public pieChartOptions = { };
  public pieChartWidth = 650;
  public pieChartHeight = 400;
  public lineChartTitle = 'Deals Completed';
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
  public columnChartTitle = 'Deals Completed';
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
  constructor(private service: ChartCreationService, private noty: NotyHelper, public dataShared: Datashared) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem("userDetail"));
    this.queries.push(new DashBoardQueries());
    if (this.dashBoardQueryId) {
      this.activeTab = 'tabChartConfig';
      this.getChartConfigById(this.dashBoardQueryId);
      this.getAllChartConfigById(this.dashBoardQueryId);
    }
  }
  closeChartConfigToggle() {
    this.chartConfig = new ChartConfig();
    this.chartConfigToggle = false;
  }

  addChartConfig() {
    this.chartConfig = new ChartConfig();
    this.chartConfigToggle = true;
  }

  getChartTypeName(id) {
    if (id) {
      return this.arrayOfChartType.find(x => x.Id == id).Name;
    }
  }
  getSearchValues(dataRow) {
    this.service.getSearchValues(this.userConfig.Id, dataRow.FieldName).subscribe(data => {
      if (data)
        dataRow.searchValues = data;
    }, err => { }, () => { });
  }
  editChartConfig(chart) {
    this.chartConfig = chart;
    this.chartConfigToggle = true;
  }

  removeChartById(id) {
    this.service.removeChartById(id).subscribe(data => {
      this.getAllChartConfigById(this.dashBoardQueryId);
    }, err => { }, () => { });
  }

  saveChartConfig() {
    this.chartConfig.DashboardConfigId = this.dashBoardQueryId;
    this.service.saveChartConfig(this.chartConfig).subscribe(data => {
      if (data) {
        this.chartConfig = data;
        this.getAllChartConfigById(this.chartConfig.DashboardConfigId);
        this.chartConfigToggle = false;
      }
      
    }, err => { }, () => { });
  }

  getAllChartConfigById(id) {
    this.service.getAllChartConfigById(id).subscribe(data => {
      this.listOfChartConfig = data;
    }, err => { }, () => { });
  }

  getChartConfigById(id) {
    this.service.getChartConfigById(id).subscribe(data => {
      if (data) {
        if (data.Item1) {
          this.userConfig = data.Item1;
          this.getConfigData(this.userConfig.ReportId);
        }
        if (data.Item2) {
          this.queries = data.Item2;
          
        }
      }
    }, err => { }, () => { });
  }



  getConfigData(reportId) {
    this.service.getConfigData(reportId).subscribe(_data => {
      if (_data) {
        if (_data.Item1)
          this.dataFields = _data.Item1;
        if (_data.Item2) {
          this.searchCriterias = _data.Item2;
          this.stringCriterias = this.searchCriterias.filter(_x => _x.Type == 1);
          this.dateCriterias = this.searchCriterias.filter(_x => _x.Type == 2);
        }
      }
    }, _err => { }, () => { });
  }
  addCondition() {
    this.queries.push(new DashBoardQueries());
  }
  removeCondition(query) {
    this.queries = this.queries.filter(_x => _x != query);
  }
  fieldNameChange(evt, dataRow) {
    let selectedField = this.dataFields.find(_x => _x.FieldName == evt.target.value);
    if (selectedField) {
      dataRow.FieldType = selectedField.Type;
      dataRow.FieldName = selectedField.FieldName;
    }
    if (selectedField && dataRow.CriteriaName)
      this.getSearchValues(dataRow);
  }
  criteriaChange(evt, dataRow) {
    let selectedCriteria = this.searchCriterias.find(_x => _x.Name == evt.target.value);
    if (selectedCriteria) {
      dataRow.CriteriaName = selectedCriteria.Name;
    }
    if (selectedCriteria && dataRow.FieldName)
      this.getSearchValues(dataRow);
  }
  showValueTo(dataRow) {
    if (dataRow.CriteriaName == "Between" || dataRow.CriteriaName == "Not Between") {
      return true;
    }
    else {
      return false;
    }
  }
  showValueFrom(dataRow) {
    if (dataRow.CriteriaName != "All" && dataRow.CriteriaName != "Empty") {
      return true;
    }
    else {
      return false;
    }
  }
  showDateTo(dataRow) {
    if (dataRow.CriteriaName != "All") {
      return true;
    }
    else {
      return false;
    }
  }
  showDateFrom(dataRow) {
    if (dataRow.CriteriaName != "All") {
      return true;
    }
    else {
      return false;
    }
  }
  saveQuery(userConfig, queries) {
    let dashboardSettingsModel = new DashboardSettingsModel();
    dashboardSettingsModel.DashoardUserConfig = userConfig;
    dashboardSettingsModel.DashoardUserConfig.UserId = this.userDetails.User.UserId;
    dashboardSettingsModel.DashBoardQueries = queries;
    dashboardSettingsModel.EntityName = LeadGenType[this.entity].toString();
    this.service.saveDashboardConfig(dashboardSettingsModel).subscribe(_data => {
      if (_data) {
        this.userConfig = _data.DashoardUserConfig;
        this.activeTab = 'tabChartConfig';
        this.getChartConfigById(this.userConfig.Id);
        this.getAllChartConfigById(this.userConfig.Id);
        this.noty.ShowNoty("Saved successfully.");
      }
    }, _err => { }, () => { });
  }

  checkValidation(obj) {
    if (obj)
      return obj.invalid && (obj.dirty || obj.touched);
    else
      return false;
  }
  checkReqValidation(obj) {
    if (obj)
      return obj.invalid;
    else
      return false;
  }

}
