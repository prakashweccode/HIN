import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';
import { ListquoteService } from './listquote.service';

@Component({
  selector: 'app-listquote',
  templateUrl: './listquote.component.html',
  styleUrls: ['./listquote.component.css']
})
export class ListquoteComponent implements OnInit {
  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public apiUrl: string;
  public pageSize: number;
  public actions: Array<any>;
  public pageLengthOptions: Array<number>;
  public lstCustomers: any;
  public lstStatus: any;

  constructor(public router: Router, public dataShared: Datashared, public listQuoteService: ListquoteService) { }

  ngOnInit() {
    this.listQuoteService.getQuoteName().subscribe(data => {
      if (data) {
        this.lstCustomers = data.Item1.map(item => ({
          id: item.Id,
          Name: item.Name
        }));
        this.lstStatus = data.Item2.map(item => ({
          id: item.Id,
          Name: item.Name
        }));
      }
      this.gridHeaders = [
        { displayName: 'Description', propertyName: 'QuoteDescription', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null},
        //{ displayName: 'Customer', propertyName: 'CustomerId', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.lstCustomers },
        { displayName: 'Quote Date', propertyName: 'Date', dataType: 'date', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
        { displayName: 'Status', propertyName: 'StatusId', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.lstStatus },
        { displayName: 'Total Price', propertyName: 'FinalPrice', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: null }
      ];
    }, err => { }, () => { });
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "QuoteDescription", value: "", type: "contains" },
      //{ column: "CustomerId", value: "", type: "contains" },
      { column: "Date", value: "", type: "contains" },
      { column: "StatusId", value: "", type: "contains" },
      { column: "FinalPrice", value: "", type: "contains" }
    ];

    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];
  }
  addNewQuote() {
    this.router.navigate(['/addquote']);
  }
  editQuote(evt) {
    this.dataShared.setValue(evt.dataRow);
    this.router.navigate(['/addquote']);
  }
}
