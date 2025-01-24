import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  addProduct() {
    this.router.navigate(['/addproduct']);
  }

}
