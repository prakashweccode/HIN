import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyyService } from './currencyy.service';
import { Currency } from '../../model/currency';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  @Input() currencyId: number;
  @Output() currencychanged = new EventEmitter();
  currencies: Array<Currency>;
  constructor(private currencyService: CurrencyyService) { }

  ngOnInit() {
    this.getCurrency();
  }

  currencychange(id) {
    this.currencychanged.emit(id);
  }

  getCurrency() {
    this.currencyService.getCurrency().subscribe(data => {
      this.currencies = data;
    });
  }
}
