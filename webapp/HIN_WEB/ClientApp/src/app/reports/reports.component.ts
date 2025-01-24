import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  activeContainer: string = 'tab1';
  dropDownToggle: boolean = false;
  dealDropDownToggle: boolean = false;
  userReportToggle: boolean = false;
  constructor(public router: Router) { }

  ngOnInit() {
  }
  cancel() {
    this.router.navigate(['/reports']);
  }
  gotoLeadReport() {
    this.router.navigate(['/addleadreport']);
  }
  gotoUserByReport() {
    this.router.navigate(['/adduserreport']);
  }
  gotoLeadByOpportunity() {
    this.router.navigate(['/adddealreport']);
  }
  gotoDealByStatus() {
    this.router.navigate(['/dealsbystatus'])
  }
  gotoLeadVendorReport() {
    this.router.navigate(['/addvendorreport'])
  }
  gotoLeadPartnerReport() {
    this.router.navigate(['/addpartnerreport'])
  }
  gotoLeadReferralReport() {
    this.router.navigate(['/addreferralreport'])
  }
  gotoLeadEventReport() {
    this.router.navigate(['/addeventreport'])
  }
  gotoLeadNetworkReport() {
    this.router.navigate(['/addnetworkreport'])
  }
  goToClosedMomth() {
    this.router.navigate(['/dealsclosedbymonth'])
  }




  goToFunnelProgress() {
    this.router.navigate(['/funnelprogress'])
  }
  goToWinLossBYRep() {
    this.router.navigate(['/winlossbyrep'])
  }
  goToWonDealsByRep() {
    this.router.navigate(['/wondealsbyrep'])
  }
  goToDealsLostByReason() {
    this.router.navigate(['/dealslostbyreason'])
  }
  goToRevenueForecast() {
    this.router.navigate(['/revenueforecostbyrep'])
  }
  goToLeadConversion() {
    this.router.navigate(['/leadconversion'])
  }
  goToWonOverTime() {
    this.router.navigate(['/opportunitieswonovertime'])
  }
  goToLostByReason() {
    this.router.navigate(['/opportunitieslostbyreason'])
  }
  goToClosedByCustomer() {
    this.router.navigate(['/proposalsclosedbycustomer'])
  }
  goToClosedByRep() {
    this.router.navigate(['/proposalsclosedbyrep'])
  }






  goToClosedQuarter() {
    this.router.navigate(['/dealsclosedbyquarter'])
  }
  gotoDealByVendor() {
    this.router.navigate(['/opportunityvendorreport'])
  }
  gotoDealByPartner() {
    this.router.navigate(['/opportunitypartnerreport'])
  }
  gotoDealByReferral() {
    this.router.navigate(['/opportunityreferralreport'])
  }
  gotoDealByEvent() {
    this.router.navigate(['/opportunityeventreport'])
  }
  gotoDealByNetwork() {
    this.router.navigate(['/opportunitynetworkreport'])
  }
  gotoOpportunityclosingreport() {
    this.router.navigate(['/opportunityclosingreport'])
  }
  gotoOpportunitycostreport() {
    this.router.navigate(['/opportunitycostreport'])
  }
  gotoOpportunityrevenuereport() {
    this.router.navigate(['/opportunityrevenuereport'])
  }
  gotoopportunitycostandcustomerreport() {
    this.router.navigate(['/opportunitycostandcustomerreport'])
  }
  gotoopportunitydateprobability() {
    this.router.navigate(['/opportunitydateprobability'])
  }
  gotoOpportunityactualexpectedrevenue() {
    this.router.navigate(['/opportunityactualexpectedrevenue'])
  }
  gotoOpportunityvariancereport() {
    this.router.navigate(['/opportunityvariancereport'])
  }
}
