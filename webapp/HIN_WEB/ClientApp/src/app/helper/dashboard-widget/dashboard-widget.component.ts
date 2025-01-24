import { Component, Input, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dashboard-widget', animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(80%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(80%)', opacity: 0 }))
      ])
    ]
    )
  ],
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.css']
})
export class DashboardWidgetComponent implements OnInit {
  @Input() data: [];
  @Input() title: string;
  @Input() cssStyle: string;
  @Input() cssFont: string;
  @Input() collopse: false;
  constructor() { }

  ngOnInit() {
  }

}
