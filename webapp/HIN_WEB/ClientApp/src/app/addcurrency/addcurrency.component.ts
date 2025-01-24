import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddcurrencyService } from './addcurrency.service';
import { NotyHelper } from '../helper/NotyHelper';
import { Currency } from '../model/currency';

@Component({
  selector: 'app-addcurrency',
  templateUrl: './addcurrency.component.html',
  styleUrls: ['./addcurrency.component.css']
})
export class AddcurrencyComponent implements OnInit {
  public currencies: Currency = new Currency();
  constructor(public router: Router, public addCurrencyService: AddcurrencyService, public notification: NotyHelper) { }

  ngOnInit() {
  }
  cancel() {
    this.router.navigate(['/listcurrency']);
  }
  saveCurrency(currencies) {
    this.addCurrencyService.saveCurrency(currencies).subscribe(data => {
      if (data != null) {
        this.currencies = data;
        this.notification.ShowNoty("Save Successfully");
        this.router.navigate(['/listcurrency']);
      }
      else {
        this.notification.ShowNoty("Error Occured");
      }
    });
  }
}
