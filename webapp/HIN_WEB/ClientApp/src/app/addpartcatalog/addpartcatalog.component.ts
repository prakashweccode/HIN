import { Component, OnInit } from '@angular/core';
import { AddpartcatalogService } from './addpartcatalog.service';
import { PartCatalog } from '../model/addpartcatalog';
import { Router } from '@angular/router';
import { NotyHelper } from '../helper/NotyHelper';
import { Datashared } from '../helper/datashared';

@Component({
  selector: 'app-addpartcatalog',
  templateUrl: './addpartcatalog.component.html',
  styleUrls: ['./addpartcatalog.component.css']
})
export class AddpartcatalogComponent implements OnInit {
  public partCatalog: PartCatalog = new PartCatalog();

  constructor(public addPartCatalogService: AddpartcatalogService, public router: Router, public notification: NotyHelper, public dataShared: Datashared) { }

  ngOnInit() {
   
   let partData = this.dataShared.getValue();
    if (partData) {
      this.partCatalog = partData;
    }
  }

  savePartCatalog(partCatalog) {
    this.addPartCatalogService.savePartCatalog(partCatalog).subscribe(data => {
      if (data != null) {
        this.partCatalog = data;
        this.notification.ShowNoty("Save Successfully");
        this.router.navigate(['/listpartcatalog']);
      }
      else {
        this.notification.ShowNoty("Error Occured");
      }
    });
  }
  cancel() {
    this.router.navigate(['/listpartcatalog']);
  }

}
