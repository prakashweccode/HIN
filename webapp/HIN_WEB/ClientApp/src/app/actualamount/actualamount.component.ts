import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListdealsService } from '../listdeals/listdeals.service';
import { Deal } from '../model/deal';
import { ActualamountService } from './actualamount.service';

@Component({
  selector: 'app-actualamount',
  templateUrl: './actualamount.component.html',
  styleUrls: ['./actualamount.component.css']
})
export class ActualamountComponent implements OnInit {
  @Input() deal:Deal;

  @Output() saveSuccess = new EventEmitter();
  constructor(public actualAmountService: ActualamountService) { }

  ngOnInit() {
  }

  saveActualAmount() {
    if (this.deal) {
      this.actualAmountService.saveActualAmount(this.deal).subscribe(data => {
        this.deal = data;
        this.saveSuccess.emit(data);
      }, err => { }, () => { });
    }
    
  }

}
