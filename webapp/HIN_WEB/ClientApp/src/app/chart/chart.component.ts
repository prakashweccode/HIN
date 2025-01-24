import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';
import { UserQuotaCalcHelper } from '../helper/user-quota-calc-helper';
import { UserDetail } from '../login/login';
import { Deal } from '../model/deal';
import { UserGoal } from '../users/users';
import { Dealstatus } from '../helper/dealstatus';
import { SumPipe } from '../helper/sum.pipe';
import { arrayify } from 'tslint/lib/utils';
import { Chart } from './chart';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Chartname } from '../model/chartname';
import { Userchartmapping } from '../model/userchartmapping';
import { AdduserService } from '../adduser/adduser.service';
import { Lead } from '../model/lead';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  public listChartName: Array<Chartname> = [];
  public selectedHeaderChart: Array<Chartname> = [];
  public selectedDashboardChart: Array<Chartname> = [];
  public selectedUserQuoteChart: Array<Chartname> = [];
  public selectedHeaderChartMappingArray: Array<Userchartmapping> = [];
  public selectedDashboardChartMappingArray: Array<Userchartmapping> = [];
  public selectedUserQuoteChartMappingArray: Array<Userchartmapping> = [];
  public totalOppCount: number;
  public totalLeadCount: number;
  public selectedHeaderChartArray: Array<Chart> = [];
  public selectedDashboardChartArray: Array<Chart> = [];
  public selectedUserQuoteChartArray: Array<Chart> = [];
  public zoomIn: boolean = false;
  public showSelectGuage: boolean = false;
  public userGoal: UserGoal = new UserGoal();
  public yearlyOpportunities: Array<Deal> = [];
  public monthlyOpportunities: Array<Deal> = [];
  public weeklyOpportunities: Array<Deal> = [];
  public yearlyLeads: Array<Lead> = [];
  public monthlyLeads: Array<Lead> = [];
  public weeklyLeads: Array<Lead> = [];
  public listChartItem: Array<Chart> = [];
  public ClosingRatioChart: Chart = new Chart();
  public WeeklyChart: Chart = new Chart();
  public MonthlyAmountChart: Chart = new Chart();
  public MonthlyDealChart: Chart = new Chart();
  public YearlyGoalAmountChart: Chart = new Chart();
  public YearlyDealChart: Chart = new Chart();
  public YearlyLeadCreatedChart: Chart = new Chart();
  public MonthlyLeadCreatedChart: Chart = new Chart();
  public OpportunityAssignedChart: Chart = new Chart();
  public LeadAssignedChart: Chart = new Chart();
  @Input() isChangeWidth: boolean = false;
  @Input() chartWidth: number;
  @Input() userId: number;
  @Input() type: string;
  @Input() backGroundColor: string;
  showGuage: boolean = false;
  public canvasWidth: number;
  public NeedleStartValue: number = 0;
  public loggedUser: UserDetail;
  public currentUserId: number;

  constructor(public navBarService: NavbarService, private quotaCalcHelper: UserQuotaCalcHelper, public addUserService:AdduserService) { }

  ngOnInit() {
    this.getChartName();
          
    if (this.userId) {
      this.getChartsById(this.userId);
    }   
  }


  getChartInfo() {
    this.assignNeedleAndCentralValue(this.ClosingRatioChart);
    this.assignNeedleAndCentralValue(this.WeeklyChart);
    this.assignNeedleAndCentralValue(this.MonthlyAmountChart);
    this.assignNeedleAndCentralValue(this.MonthlyDealChart);
    this.assignNeedleAndCentralValue(this.YearlyGoalAmountChart);
    this.assignNeedleAndCentralValue(this.YearlyDealChart);
    this.assignNeedleAndCentralValue(this.YearlyLeadCreatedChart);
    this.assignNeedleAndCentralValue(this.MonthlyLeadCreatedChart);
    this.assignNeedleAndCentralValue(this.OpportunityAssignedChart);
    this.assignNeedleAndCentralValue(this.LeadAssignedChart);
    if (this.userId)
      this.getUserQuotaReports(this.userId);
    this.canvasWidth = this.chartWidth;
  }




  assignNeedleAndCentralValue(data) {
    if (data) {
      data.NeedleValue = this.NeedleStartValue;
      data.CentralLabel = this.NeedleStartValue.toString();
    }
  }

  getChartName() {
    this.addUserService.getChartName().subscribe(data => {
      if (data) {
        this.listChartName = data;
      }
    }, err => { }, () => { });
  }

  getChartsById(userId) {
    this.addUserService.getChartsById(userId).subscribe(data => {
      if (data) {
        this.assignHeaderChart(data.Item1);
        this.assignDashboardChart(data.Item2);
        this.assignUserQuoteChart(data.Item3);
        this.getChartInfo();
      }
    }, err => { }, () => { });
  }

  assignHeaderChart(data) {
    if (data) {
      this.selectedHeaderChartMappingArray = data;
      this.selectedHeaderChartMappingArray.forEach(x => {
        let chartName = new Chartname();
        chartName.Id = x.ChartId;
        chartName.Name = ((this.listChartName.length > 0) ?(this.listChartName.find(x => x.Id == chartName.Id).Name) : '');
        this.selectedHeaderChart.push(chartName);
      });
    }
    else {
      this.selectedHeaderChartMappingArray = [];
    }
  }

  assignDashboardChart(data) {
    if (data) {
      this.selectedDashboardChartMappingArray = data;
      this.selectedDashboardChartMappingArray.forEach(x => {
        let chartName = new Chartname();
        chartName.Id = x.ChartId;
        chartName.Name = ((this.listChartName.length > 0) ? (this.listChartName.find(x => x.Id == chartName.Id).Name) : '');
        this.selectedDashboardChart.push(chartName);
      });
    }
    else {
      this.selectedDashboardChartMappingArray = [];
    }
  }

  assignUserQuoteChart(data) {
    if (data) {
      this.selectedUserQuoteChartMappingArray = data;
      this.selectedUserQuoteChartMappingArray.forEach(x => {
        let chartName = new Chartname();
        chartName.Id = x.ChartId;
        chartName.Name = ((this.listChartName.length > 0) ? (this.listChartName.find(x => x.Id == chartName.Id).Name) : '');
        this.selectedUserQuoteChart.push(chartName);
      });
    }
    else {
      this.selectedUserQuoteChartMappingArray = [];
    }
  }

  //onItemSelect(item: any) {
  //  this.listChartItem.forEach(x => {
  //    if (this.selectedHeaderChartArray.find(data => data.DropDownName == x.DropDownName)) {
  //      x.ShowHeaderChart = true;
  //    }
  //    else {
  //      x.ShowHeaderChart = false;
  //    }
  //  });
  //}

  //onItemDeSelect(item: any) {
  //  this.listChartItem.forEach(x => {
  //    if (this.selectedHeaderChartArray.find(data => data.DropDownName == x.DropDownName)) {
  //      x.ShowHeaderChart = true;
  //    }
  //    else {
  //      x.ShowHeaderChart = false;
  //    }
  //  });
  //}
  //onSelectAll(items: any) {
  //  this.listChartItem.forEach(x => {
  //    if (this.selectedHeaderChartArray.find(data => data == x)) {
  //      x.ShowHeaderChart = true;
  //    }
  //    else {
  //      x.ShowHeaderChart = false;
  //    }
  //  });
  //}

  //selectedData(evt) {
  //  this.selectedHeaderChartArray = evt;
  //  this.listChartItem.forEach(x => {
  //    if (this.selectedHeaderChartArray.find(data => data == x)) {
  //      x.ShowHeaderChart = true;
  //    }
  //    else {
  //      x.ShowHeaderChart = false;
  //    }
  //  });
  //}

  assignBottomLabel(data, labelValue) {
    if (data)
      data.BottomLabel = labelValue;
  }

  changeWidth() {
    if (this.isChangeWidth) {
      if (this.canvasWidth == 80) {
        this.canvasWidth = 200;
        this.assignBottomLabel(this.WeeklyChart, 'Weekly Opp. Created');
        this.assignBottomLabel(this.MonthlyAmountChart, 'Monthly Opp. $ WON');
        this.assignBottomLabel(this.MonthlyDealChart, 'Monthly Opp. WON');
        this.assignBottomLabel(this.YearlyDealChart, 'Yearly Opp. WON');
        this.assignBottomLabel(this.YearlyGoalAmountChart, 'Yearly Opp. $ WON');
        this.assignBottomLabel(this.ClosingRatioChart, 'Closing ratio %');
        this.assignBottomLabel(this.LeadAssignedChart, 'Lead Assigned To Me');
        this.assignBottomLabel(this.OpportunityAssignedChart, 'Opp. Assigned To Me');
        this.assignBottomLabel(this.YearlyLeadCreatedChart, 'Yearly Leads Created');
        this.assignBottomLabel(this.MonthlyLeadCreatedChart, 'Monthly Leads Created');
        this.zoomIn = true;
      }
      else {
        this.canvasWidth = 80;
        this.assignBottomLabel(this.WeeklyChart, '');
        this.assignBottomLabel(this.MonthlyAmountChart, '');
        this.assignBottomLabel(this.MonthlyDealChart, '');
        this.assignBottomLabel(this.YearlyDealChart, '');
        this.assignBottomLabel(this.YearlyGoalAmountChart, '');
        this.assignBottomLabel(this.ClosingRatioChart, '');
        this.assignBottomLabel(this.LeadAssignedChart, '');
        this.assignBottomLabel(this.OpportunityAssignedChart, '');
        this.assignBottomLabel(this.YearlyLeadCreatedChart, '');
        this.assignBottomLabel(this.MonthlyLeadCreatedChart, '');
        this.zoomIn = false;
      }
      this.refreshCentralLabel(this.ClosingRatioChart);
      this.refreshCentralLabel(this.WeeklyChart);
      this.refreshCentralLabel(this.MonthlyAmountChart);
      this.refreshCentralLabel(this.MonthlyDealChart);
      this.refreshCentralLabel(this.YearlyGoalAmountChart);
      this.refreshCentralLabel(this.YearlyDealChart);
      this.refreshCentralLabel(this.YearlyLeadCreatedChart);
      this.refreshCentralLabel(this.MonthlyLeadCreatedChart);
      this.refreshCentralLabel(this.OpportunityAssignedChart);
      this.refreshCentralLabel(this.LeadAssignedChart);
    }
  }

  refreshCentralLabel(data) {
    if (data.CentralLabel.indexOf(' ') != -1) {
      data.CentralLabel = data.CentralLabel.trim();
    }
    else {
      data.CentralLabel = data.CentralLabel + ' ';
    }
  }
  getUserQuotaReports(userId) {
    this.navBarService.getUserQuotaReports(userId).subscribe(data => {
      if (data) {
        this.userGoal = data.Item1;
        this.weeklyOpportunities = data.Item2;
        this.monthlyOpportunities = data.Item3
        this.yearlyOpportunities = data.Item4;
        this.weeklyLeads = data.Item5;
        this.monthlyLeads = data.Item6;
        this.yearlyLeads = data.Item7;
        this.totalLeadCount = data.Rest.Item1;
        this.totalOppCount = data.Rest.Item2;
        if (this.userGoal) {
          let minQuotaPerWeek = this.quotaCalcHelper.CalculateClosingPercentage(this.userGoal.AvarageSalePrice, this.userGoal.MinimalGoalAmount, this.userGoal.MinimalGoalLead);
          let goodQuotaPerWeek = this.quotaCalcHelper.CalculateClosingPercentage(this.userGoal.AvarageSalePrice, this.userGoal.GoodRevenueGoalAmount, this.userGoal.MinimalGoalLead);
          let greatQuotaPerWeek = this.quotaCalcHelper.CalculateClosingPercentage(this.userGoal.AvarageSalePrice, this.userGoal.GreatRevenueGoalAmount, this.userGoal.MinimalGoalLead);
          let minGoalAmount = this.quotaCalcHelper.CalculateGoalAmountPerMonth(this.userGoal.AvarageSalePrice, this.userGoal.MinimalGoalAmount);
          let goodGoalAmount = this.quotaCalcHelper.CalculateGoalAmountPerMonth(this.userGoal.AvarageSalePrice, this.userGoal.GoodRevenueGoalAmount);
          let greatGoalAmount = this.quotaCalcHelper.CalculateGoalAmountPerMonth(this.userGoal.AvarageSalePrice, this.userGoal.GreatRevenueGoalAmount);
          let minDealMonthly = this.quotaCalcHelper.CalculateNoOfDealsPerMonth(this.userGoal.AvarageSalePrice, this.userGoal.MinimalGoalAmount);
          let goodDealMonthly = this.quotaCalcHelper.CalculateNoOfDealsPerMonth(this.userGoal.AvarageSalePrice, this.userGoal.GoodRevenueGoalAmount);
          let greatDealMonthly = this.quotaCalcHelper.CalculateNoOfDealsPerMonth(this.userGoal.AvarageSalePrice, this.userGoal.GreatRevenueGoalAmount);
          let minDealYearly = this.quotaCalcHelper.CalculateNoOfDeals(this.userGoal.AvarageSalePrice, this.userGoal.MinimalGoalAmount);
          let goodDealYearly = this.quotaCalcHelper.CalculateNoOfDeals(this.userGoal.AvarageSalePrice, this.userGoal.GoodRevenueGoalAmount);
          let greatDealYearly = this.quotaCalcHelper.CalculateNoOfDeals(this.userGoal.AvarageSalePrice, this.userGoal.GreatRevenueGoalAmount);


          if (this.weeklyOpportunities.length == 0) {
            this.WeeklyChart.NeedleValue = 0;
            this.WeeklyChart.CentralLabel = this.WeeklyChart.NeedleValue.toString();
          }
          else {
            let countValue = this.weeklyOpportunities.filter(data => data.StatusId == Dealstatus.InProgress || data.StatusId == null).length;
            let perWeekNeedle = countValue > 0 ? Math.ceil((countValue * 100) / (greatQuotaPerWeek + (greatQuotaPerWeek - minQuotaPerWeek))) : 0;
            this.WeeklyChart.NeedleValue = perWeekNeedle > 100 ? 100 : perWeekNeedle;
            this.WeeklyChart.CentralLabel = countValue.toString();
          }
          this.WeeklyChart.Options.arcDelimiters = [Math.ceil((minQuotaPerWeek * 100) / (greatQuotaPerWeek * 2)), Math.ceil((goodQuotaPerWeek * 100) / (greatQuotaPerWeek * 2)), Math.ceil((greatQuotaPerWeek * 100) / (greatQuotaPerWeek + (greatQuotaPerWeek - minQuotaPerWeek)))];
          this.WeeklyChart.Options.notyLabels = [{ color: "red", label: ("0 - " + Math.ceil(minQuotaPerWeek).toString()) },
          { color: "orange", label: (Math.ceil(minQuotaPerWeek).toString() + " - " + Math.ceil(goodQuotaPerWeek).toString()) },
          { color: "dodgerblue", label: (Math.ceil(goodQuotaPerWeek).toString() + " - " + Math.ceil(greatQuotaPerWeek).toString()) },
          { color: "green", label: (Math.ceil(greatQuotaPerWeek).toString() + " - " + Math.ceil(greatQuotaPerWeek + (greatQuotaPerWeek - minQuotaPerWeek)).toString()) }];
          this.WeeklyChart.Options.rangeLabel = ['0', Math.ceil(greatQuotaPerWeek + (greatQuotaPerWeek - minQuotaPerWeek)).toString()];
          this.WeeklyChart.Options.arcColors = ['red', 'orange', 'dodgerblue', 'green'];



          if (this.monthlyOpportunities.length == 0) {
            this.MonthlyAmountChart.NeedleValue = 0;
            this.MonthlyAmountChart.CentralLabel = this.MonthlyAmountChart.NeedleValue.toString();
          }
          else {
            const sumPipe = new SumPipe();
            let actualAmountPerMonth = sumPipe.transform(this.monthlyOpportunities.filter(x => x.StatusId == Dealstatus.Won), "ExpectedRevenue");
            let monthlyNeedleVal = actualAmountPerMonth > 0 ? Math.ceil((actualAmountPerMonth * 100) / (greatGoalAmount + (greatGoalAmount - minGoalAmount))) : 0;
            this.MonthlyAmountChart.NeedleValue = monthlyNeedleVal > 100 ? 100 : monthlyNeedleVal;
            this.MonthlyAmountChart.CentralLabel = '$' + actualAmountPerMonth.toString();
          }
          this.MonthlyAmountChart.Options.arcDelimiters = [Math.ceil((minGoalAmount * 100) / (greatGoalAmount * 2)), Math.ceil((goodGoalAmount * 100) / (greatGoalAmount * 2)), Math.ceil((greatGoalAmount * 100) / (greatGoalAmount + (greatGoalAmount - minGoalAmount)))];
          this.MonthlyAmountChart.Options.notyLabels = [{ color: "red", label: ("$0 - $" + Math.ceil(minGoalAmount).toString()) },
          { color: "orange", label: ("$" + Math.ceil(minGoalAmount).toString() + " - $" + Math.ceil(goodGoalAmount).toString()) },
          { color: "dodgerblue", label: ("$" + Math.ceil(goodGoalAmount).toString() + " - $" + Math.ceil(greatGoalAmount).toString()) },
          { color: "green", label: ("$" + Math.ceil(greatGoalAmount).toString() + " - $" + Math.ceil(greatGoalAmount + (greatGoalAmount - minGoalAmount)).toString()) }];
          this.MonthlyAmountChart.Options.rangeLabel = ['0', '$' + Math.ceil(greatGoalAmount + (greatGoalAmount - minGoalAmount)).toString()];
          this.MonthlyAmountChart.Options.arcColors = ['red', 'orange', 'dodgerblue', 'green'];

          if (this.monthlyOpportunities.length == 0) {
            this.MonthlyDealChart.NeedleValue = 0;
            this.MonthlyDealChart.CentralLabel = this.MonthlyDealChart.NeedleValue.toString();
          }
          else {
            let countValue = this.monthlyOpportunities.filter(data => data.StatusId == Dealstatus.Won).length;
            let perMonthNeedle = countValue > 0 ? Math.ceil((countValue * 100) / (greatDealMonthly + (greatDealMonthly - minDealMonthly))) : 0;
            this.MonthlyDealChart.NeedleValue = perMonthNeedle > 100 ? 100 : perMonthNeedle;
            this.MonthlyDealChart.CentralLabel = countValue.toString();
          }
          this.MonthlyDealChart.Options.arcDelimiters = [Math.ceil((minDealMonthly * 100) / (greatDealMonthly * 2)), Math.ceil((goodDealMonthly * 100) / (greatDealMonthly * 2)), Math.ceil((greatDealMonthly * 100) / (greatDealMonthly + (greatDealMonthly - minDealMonthly)))];
          this.MonthlyDealChart.Options.notyLabels = [{ color: "red", label: ("0 - " + Math.ceil(minDealMonthly).toString()) },
          { color: "orange", label: (Math.ceil(minDealMonthly).toString() + " - " + Math.ceil(goodDealMonthly).toString()) },
          { color: "dodgerblue", label: (Math.ceil(goodDealMonthly).toString() + " - " + Math.ceil(greatDealMonthly).toString()) },
          { color: "green", label: (Math.ceil(greatDealMonthly).toString() + " - " + Math.ceil(greatDealMonthly + (greatDealMonthly - minDealMonthly)).toString()) }];
          this.MonthlyDealChart.Options.rangeLabel = ['0', Math.ceil(greatDealMonthly + (greatDealMonthly - minDealMonthly)).toString()];
          this.MonthlyDealChart.Options.arcColors = ['red', 'orange', 'dodgerblue', 'green'];


          if (this.yearlyOpportunities.length == 0) {
            this.YearlyDealChart.NeedleValue = 0;
            this.YearlyDealChart.CentralLabel = this.YearlyDealChart.NeedleValue.toString();
          }
          else {
            let countValue = this.yearlyOpportunities.filter(data => data.StatusId == Dealstatus.Won).length;
            let perYearNeedle = countValue > 0 ? Math.ceil((countValue * 100) / (greatDealYearly + (greatDealYearly - minDealYearly))) : 0;
            this.YearlyDealChart.NeedleValue = perYearNeedle > 100 ? 100 : perYearNeedle;
            this.YearlyDealChart.CentralLabel = countValue.toString();
          }
          this.YearlyDealChart.Options.arcDelimiters = [Math.ceil((minDealYearly * 100) / (greatDealYearly * 2)), Math.ceil((goodDealYearly * 100) / (greatDealYearly * 2)), Math.ceil((greatDealYearly * 100) / (greatDealYearly + (greatDealYearly - minDealYearly)))];
          this.YearlyDealChart.Options.notyLabels = [{ color: "red", label: ("0 - " + Math.ceil(minDealYearly).toString()) },
          { color: "orange", label: (Math.ceil(minDealYearly).toString() + " - " + Math.ceil(goodDealYearly).toString()) },
          { color: "dodgerblue", label: (Math.ceil(goodDealYearly).toString() + " - " + Math.ceil(greatDealYearly).toString()) },
          { color: "green", label: (Math.ceil(greatDealYearly).toString() + " - " + Math.ceil(greatDealYearly + (greatDealYearly - minDealYearly)).toString()) }];
          this.YearlyDealChart.Options.rangeLabel = ['0', Math.ceil(greatDealYearly + (greatDealYearly - minDealYearly)).toString()];
          this.YearlyDealChart.Options.arcColors = ['red', 'orange', 'dodgerblue', 'green'];


          if (this.yearlyOpportunities.length == 0) {
            this.YearlyGoalAmountChart.NeedleValue = 0;
            this.YearlyGoalAmountChart.CentralLabel = this.YearlyGoalAmountChart.NeedleValue.toString();
          }
          else {
            const sumPipe = new SumPipe();
            let actualAmountPerYear = sumPipe.transform(this.yearlyOpportunities.filter(x => x.StatusId == Dealstatus.Won), "ExpectedRevenue");
            let yearlyNeedleVal = actualAmountPerYear > 0 ? Math.ceil((actualAmountPerYear * 100) / (this.userGoal.GreatRevenueGoalAmount + (this.userGoal.GreatRevenueGoalAmount - this.userGoal.MinimalGoalAmount))) : 0;
            this.YearlyGoalAmountChart.NeedleValue = yearlyNeedleVal > 100 ? 100 : yearlyNeedleVal;
            this.YearlyGoalAmountChart.CentralLabel = '$' + actualAmountPerYear.toString();
          }
          this.YearlyGoalAmountChart.Options.arcDelimiters = [Math.ceil((this.userGoal.MinimalGoalAmount * 100) / (this.userGoal.GreatRevenueGoalAmount * 2)), Math.ceil((this.userGoal.GoodRevenueGoalAmount * 100) / (this.userGoal.GreatRevenueGoalAmount * 2)), Math.ceil((this.userGoal.GreatRevenueGoalAmount * 100) / (this.userGoal.GreatRevenueGoalAmount + (this.userGoal.GreatRevenueGoalAmount - this.userGoal.MinimalGoalAmount)))];
          this.YearlyGoalAmountChart.Options.notyLabels = [{ color: "red", label: ("$0 - $" + Math.ceil(this.userGoal.MinimalGoalAmount).toString()) },
          { color: "orange", label: ("$" + Math.ceil(this.userGoal.MinimalGoalAmount).toString() + " - $" + Math.ceil(this.userGoal.GoodRevenueGoalAmount).toString()) },
          { color: "dodgerblue", label: ("$" + Math.ceil(this.userGoal.GoodRevenueGoalAmount).toString() + " - $" + Math.ceil(this.userGoal.GreatRevenueGoalAmount).toString()) },
          { color: "green", label: ("$" + Math.ceil(this.userGoal.GreatRevenueGoalAmount).toString() + " - $" + Math.ceil(this.userGoal.GreatRevenueGoalAmount + (this.userGoal.GreatRevenueGoalAmount - this.userGoal.MinimalGoalAmount)).toString()) }];
          this.YearlyGoalAmountChart.Options.rangeLabel = ['0', '$' + Math.ceil(this.userGoal.GreatRevenueGoalAmount + (this.userGoal.GreatRevenueGoalAmount - this.userGoal.MinimalGoalAmount)).toString()];
          this.YearlyGoalAmountChart.Options.arcColors = ['red', 'orange', 'dodgerblue', 'green'];

          this.ClosingRatioChart.Options.arcDelimiters = [];
          this.ClosingRatioChart.Options.arcColors = ['dodgerblue'];
          this.ClosingRatioChart.Options.rangeLabel = ['0', ((this.userGoal.MinimalGoalLead) ? (this.userGoal.MinimalGoalLead.toString()) : '')];
          this.ClosingRatioChart.Options.notyLabels = [{ color: "dodgerblue", label: ("0 - " + ((this.userGoal.MinimalGoalLead) ? (this.userGoal.MinimalGoalLead.toString()):'')) }];

          this.LeadAssignedChart.Options.arcDelimiters = [];
          this.LeadAssignedChart.Options.arcColors = ['dodgerblue'];
          this.LeadAssignedChart.Options.rangeLabel = ['0', this.totalLeadCount.toString()];
          this.LeadAssignedChart.Options.notyLabels = [{ color: "dodgerblue", label: ("0 - " + this.totalLeadCount.toString()) }];
          this.LeadAssignedChart.CentralLabel = this.totalLeadCount.toString();
          this.LeadAssignedChart.NeedleValue = ((this.totalLeadCount * 100) / this.totalLeadCount);

          this.OpportunityAssignedChart.Options.arcDelimiters = [];
          this.OpportunityAssignedChart.Options.arcColors = ['dodgerblue'];
          this.OpportunityAssignedChart.Options.rangeLabel = ['0', this.totalOppCount.toString()];
          this.OpportunityAssignedChart.Options.notyLabels = [{ color: "dodgerblue", label: ("0 - " + this.totalOppCount.toString()) }];
          this.OpportunityAssignedChart.CentralLabel = this.totalOppCount.toString();
          this.OpportunityAssignedChart.NeedleValue = ((this.totalOppCount * 100) / this.totalOppCount);

          this.YearlyLeadCreatedChart.Options.arcDelimiters = [];
          this.YearlyLeadCreatedChart.Options.arcColors = ['dodgerblue'];
          this.YearlyLeadCreatedChart.Options.rangeLabel = ['0', this.yearlyLeads.length.toString()];
          this.YearlyLeadCreatedChart.Options.notyLabels = [{ color: "dodgerblue", label: ("0 - " + this.yearlyLeads.length.toString()) }];
          this.YearlyLeadCreatedChart.CentralLabel = this.yearlyLeads.length.toString();
          this.YearlyLeadCreatedChart.NeedleValue = ((this.yearlyLeads.length * 100) / this.yearlyLeads.length)

          this.MonthlyLeadCreatedChart.Options.arcDelimiters = [];
          this.MonthlyLeadCreatedChart.Options.arcColors = ['dodgerblue'];
          this.MonthlyLeadCreatedChart.Options.rangeLabel = ['0', this.monthlyLeads.length.toString()];
          this.MonthlyLeadCreatedChart.Options.notyLabels = [{ color: "dodgerblue", label: ("0 - " + this.monthlyLeads.length.toString()) }];
          this.MonthlyLeadCreatedChart.CentralLabel = this.monthlyLeads.length.toString();
          this.MonthlyLeadCreatedChart.NeedleValue = this.monthlyLeads.length > 0 ? ((this.monthlyLeads.length * 100) / this.monthlyLeads.length) : 0;

          if (!this.isChangeWidth) {
            this.assignBottomLabel(this.WeeklyChart, 'Weekly Opp. Created');
            this.assignBottomLabel(this.MonthlyAmountChart, 'Monthly Opp. $ WON');
            this.assignBottomLabel(this.MonthlyDealChart, 'Monthly Opp. WON');
            this.assignBottomLabel(this.YearlyDealChart, 'Yearly Opp. WON');
            this.assignBottomLabel(this.YearlyGoalAmountChart, 'Yearly Opp. $ WON');
            this.assignBottomLabel(this.ClosingRatioChart, 'Closing ratio %');
            this.assignBottomLabel(this.LeadAssignedChart, 'Lead Assigned To Me');
            this.assignBottomLabel(this.OpportunityAssignedChart, 'Opp. Assigned To Me');
            this.assignBottomLabel(this.YearlyLeadCreatedChart, 'Yearly Leads Created');
            this.assignBottomLabel(this.MonthlyLeadCreatedChart, 'Monthly Leads Created');
          }
          this.WeeklyChart.DropDownName = 'Weekly Opp. Created';
          this.MonthlyAmountChart.DropDownName = 'Monthly Opp. $ WON';
          this.MonthlyDealChart.DropDownName = 'Monthly Opp. WON';
          this.YearlyDealChart.DropDownName = 'Yearly Opp. WON';
          this.YearlyGoalAmountChart.DropDownName = 'Yearly Opp. $ WON';
          this.ClosingRatioChart.DropDownName = 'Closing ratio %';
          this.LeadAssignedChart.DropDownName = 'Lead Assigned To Me';
          this.OpportunityAssignedChart.DropDownName = 'Opp. Assigned To Me';
          this.YearlyLeadCreatedChart.DropDownName = 'Yearly Leads Created';
          this.MonthlyLeadCreatedChart.DropDownName = 'Monthly Leads Created';
          this.pushDefaultItems(this.ClosingRatioChart);
          this.pushDefaultItems(this.WeeklyChart);
          this.pushDefaultItems(this.MonthlyAmountChart);
          this.pushDefaultItems(this.MonthlyDealChart);
          this.pushDefaultItems(this.YearlyDealChart);
          this.pushDefaultItems(this.YearlyGoalAmountChart);
          this.pushDefaultItems(this.LeadAssignedChart);
          this.pushDefaultItems(this.OpportunityAssignedChart);
          this.pushDefaultItems(this.MonthlyLeadCreatedChart);
          this.pushDefaultItems(this.YearlyLeadCreatedChart);
          this.showGuage = true;
        }
      }
    }, err => { }, () => { });
  }
  groupByKey(array, key) {
    let data = array
      .reduce((hash, obj) => {
        if (obj[key] === undefined) return hash;
        return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
      }, {});
    let dataLength = Object.entries(data).length;
    return dataLength ? dataLength : 0;
  }

  pushDefaultItems(data) {
    if (data) {
      var findHeaderData = this.selectedHeaderChart.find(x => x.Name == data.DropDownName);
      var findDashboardData = this.selectedDashboardChart.find(x => x.Name == data.DropDownName);
      var findUserQuoteData = this.selectedUserQuoteChart.find(x => x.Name == data.DropDownName);
      if (findHeaderData) {
        data.ShowHeaderChart = true;
      }
      if (findDashboardData) {
        data.ShowDashboardChart = true;
      }
      if (findUserQuoteData) {
        data.ShowUserQuoteChart = true;
      }

      if (data.ShowHeaderChart == true) {
        this.selectedHeaderChartArray.push(data);
      }
      if (data.ShowDashboardChart == true) {
        this.selectedDashboardChartArray.push(data);
      }
      if (data.findUserQuoteData == true) {
        this.selectedUserQuoteChartArray.push(data);
      }

      this.pushItems(data);
    }
  }

  pushItems(data) {
    if (data) {
      this.listChartItem.push(data);
    }
  }
  @HostListener("document:click", ["$event"])
  onClick(event) {
    let elementName = event.target ? event.target.localName : null;
    if (elementName && (elementName.toLowerCase() == "svg" || elementName.toLowerCase() == "path")) {
      
    }
    else {
      this.listChartItem.forEach(_data => {
        _data.toggle = false;
      });
    }
  }
}
