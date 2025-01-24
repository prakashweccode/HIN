import { Component, OnInit } from '@angular/core';
import { AddquoteService } from './addquote.service';
import { Router } from '@angular/router';
import { NotyHelper } from '../helper/NotyHelper';
import { Datashared } from '../helper/datashared';
import { Quote } from '../model/quote';
import { Deal } from '../model/deal';
import { Lead } from '../model/lead';
import { ModalService } from '../loader.service';
import { AddleadsService } from '../addleads/addleads.service';
import { LinePart, PartCatalog } from '../model/addpartcatalog';

@Component({
  selector: 'app-addquote',
  templateUrl: './addquote.component.html',
  styleUrls: ['./addquote.component.css']
})
export class AddquoteComponent implements OnInit {
  public quote: Quote = new Quote();
  lstDeal: Array<Deal> = [];
  deal: Deal = new Deal();
  lead: Lead = new Lead();

  listQuoteCatalog: Array<LinePart> = [];
  listPartCatalog: Array<PartCatalog> = [];
  activeContainer: string = "tab1";
  constructor(public addQuoteService: AddquoteService, public router: Router, public notification: NotyHelper, public dataShared: Datashared, public modalService: ModalService, public leadService: AddleadsService) { }

  ngOnInit() {
    this.getPartCatalog();

    let quoteData = this.dataShared.getValue();
    if (quoteData) {
      this.quote = quoteData;
      this.getDealDropdown();
      this.getQuoteCatalog(this.quote.Id);
    }
    else {
      this.getDealDropdown();
      this.getQuoteNumber("P");
      this.quote.Date = new Date();
      this.quote.StatusId = 1;
    }

    
  }

  selectDiscountType(evt) {
    this.quote.DiscountType = evt;
    this.quote.DiscountValue = null;
  }


  getQuoteCatalog(id) {
    this.addQuoteService.getQuoteCatalog(id).subscribe(data => {
      this.listQuoteCatalog = data;
      this.listQuoteCatalog.push(new LinePart());
      this.getTotalProposalAmount();
    });
  }


  getTotalProposalAmount() {
    this.quote.Total = 0;
    if (this.listQuoteCatalog && this.listQuoteCatalog.length > 0) {
      for (var i = 0; i < this.listQuoteCatalog.length; i++ ) {
        this.quote.Total += this.getTotalPrice(this.listQuoteCatalog[i]);
      }
    }
    this.getTotalAfterDiscount(this.quote.Total, this.quote.DiscountType, this.quote.DiscountValue);
  }

  getTotalAfterDiscount(totalPrice, discountType, discountValue) {
    if (!isNaN(totalPrice) && discountType && !isNaN(discountValue)) {
      if (discountType == 1) {
        var discountAmount = totalPrice * discountValue / 100;
        this.quote.TotalAfterDiscount = totalPrice - discountAmount;
      }
      else if (discountType == 2) {
        this.quote.TotalAfterDiscount = totalPrice - discountValue;
      }
      else {
        this.quote.TotalAfterDiscount = 0;
      }
    }
    else {
      this.quote.TotalAfterDiscount = 0;
    }
    this.getTotalTaxAmount(this.quote.TotalAfterDiscount, this.quote.Tax);
  }

  getTotalTaxAmount(totalAfterDiscount, tax) {
    if (!isNaN(totalAfterDiscount) && !isNaN(tax)) {
      this.quote.TotalTax = totalAfterDiscount * tax / 100;
    }
    else {
      this.quote.TotalTax = 0;
    }
    this.getFinalPriceCalculate(this.quote.TotalAfterDiscount, this.quote.TotalTax);
  }

  getFinalPriceCalculate(totalAfterDiscount, totalTax) {
    if (!isNaN(totalAfterDiscount) && !isNaN(totalTax)) {
      this.quote.FinalPrice = totalAfterDiscount + totalTax;
    }
    else {
      this.quote.FinalPrice = 0;
    }
  }

  getTotalPrice(linePart) {
    if (linePart && !isNaN(linePart.Quantity) && !isNaN(linePart.UnitPrice)) {
        return (linePart.Quantity * linePart.UnitPrice);
      }
    else {
      return 0;
    }
  }

  getQuoteNumber(prefix) {
    this.addQuoteService.getQuoteNumber(prefix).subscribe(data => {
      if (data)
        this.quote.DocumentNumber = data.EntityNumber;
    });
  }
  saveQuote(quote) {
    if (!this.quote.DealId || !this.quote.QuoteDescription) {
      this.notification.ShowNoty("Please fill required field");
    }
    else {
      this.addQuoteService.saveQuote(quote).subscribe(data => {
        if (data != null) {
          this.quote = data;
          this.getQuoteCatalog(this.quote.Id);
          this.notification.ShowNoty("Data Saved Successfully.");
        }
        else {
          this.notification.ShowNoty("Error Occured");
        }
      });
    }

  }
  cancel() {
    this.router.navigate(['/listquote']);
  }
  changeFormatDate(date) {
    if (date)
      return date.split('T')[0];
  }
  FormatDate(date) {
    if (date) {
      if (Object.prototype.toString.call(date) === "[object Date]")
        return date.getFullYear() + '-' + (date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? ('0' + (date.getDate())) : (date.getDate()));
      else {
        let clonedDate = new Date(date);
        return clonedDate.getFullYear() + '-' + (clonedDate.getMonth() < 10 ? ('0' + (clonedDate.getMonth() + 1)) : clonedDate.getMonth() + 1) + '-' + (clonedDate.getDate() < 10 ? ('0' + (clonedDate.getDate())) : (clonedDate.getDate()));
      }
      //return returnDate;
    }
  }

  

  getDealDropdown() {
    this.addQuoteService.getDealDropdown().subscribe(data => {
      this.lstDeal = data;
      if (this.quote.DealId) {
        this.deal = this.lstDeal.find(x => x.DealId == this.quote.DealId);
        this.getLeadById(this.deal.LeadId);
      }

    });
  }

  getCompanyName(id) {
    if (id && this.lstDeal.length > 0) {
      var companyName = this.lstDeal.find(x => x.DealId == id).CompanyName;
      if (companyName == null) {
        companyName = this.lstDeal.find(x => x.DealId == id).DealName;
      }
      return companyName;
    }
  }

  editLeadModal() {
    this.dataShared.setValue(this.lstDeal.find(x => x.DealId == this.deal.DealId));
    this.navigate('adddealsmodal', true);
  }
  navigate(path, ismodel) {
    if (ismodel) {
      this.modalService.show(null);
      this.router.navigate([{ outlets: { modal: [path] } }]);
    }
    else {
      this.router.navigate(['/' + path]);
    }
  }
  assignLeadToDeal(dealId) {
    if (dealId) {
      this.deal.DealId = dealId;
      this.deal = this.lstDeal.find(x => x.DealId == this.deal.DealId);
      this.getLeadById(this.deal.LeadId);

    }

  }
  editLead() {
    this.dataShared.setValue(this.lead);
    this.navigate('addleadsmodal', true)
    //this.router.navigate(['/addleads']);
  }

  getLeadById(leadId) {
    if (leadId) {
      this.leadService.getLeadById(leadId).subscribe(data => {
        this.lead = data;
      });
    }

  }
  editQuote() {
    this.router.navigate(['/editquote']);
  }

  //getQuoteCatalog(quoteId) {
  //  if (quoteId) {
  //    this.addQuoteService.getQuoteCatalog(quoteId).subscribe(data => {
  //      if (data)
  //        this.listQuoteCatalog = data;
  //    }, err => { }, () => { });
  //  }
  //}

  addPartCatalog() {
    this.navigate('addpartcatalogmodal', true);
  }
  viewPartCatalog(event) {
    this.dataShared.setValue(event);
    this.navigate('addpartcatalogmodal', true);
  }
  getPartCatalog() {
    this.addQuoteService.getPartCatalog().subscribe(data => {
      this.listPartCatalog = data;
    });

  }
  SelectLineItems(data, linePart) {
    var selectedPart = this.listPartCatalog.find(x => x.Id == data);
    linePart.QuoteId = this.quote.Id;
    linePart.PartCatalogId = selectedPart.Id;
    linePart.Name = selectedPart.PartCode;
    linePart.PartDescription = selectedPart.PartDescription;
    linePart.Quantity = 1;
    linePart.UnitPrice = selectedPart.SalesPrice;
    linePart.TotalPrice = linePart.Quantity * linePart.UnitPrice;
    linePart.Tax = selectedPart.IsNonTaxable;
  }
  SaveLines(linePart) {
    if (!linePart.PartCatalogId || linePart.PartCatalogId <= 0) {
      this.notification.ShowNoty("Please select part");
    }
    else {
      this.addQuoteService.saveLines(linePart).subscribe(data => {
        if (data != null) {
          linePart = data;
          this.notification.ShowNoty("Save Successfully");
          this.getQuoteCatalog(this.quote.Id);
        }
        else {
          this.notification.ShowNoty("Error Occured");
        }
      });
    }
  }
}
