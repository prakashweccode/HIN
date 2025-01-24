import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editcolumn',
  templateUrl: './editcolumn.component.html',
  styleUrls: ['./editcolumn.component.css']
})
export class EditcolumnComponent implements OnInit {
  test = "EditColum";
  toogle: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
