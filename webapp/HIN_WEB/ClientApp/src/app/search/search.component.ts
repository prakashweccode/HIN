import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotyHelper } from '../helper/NotyHelper';
import { Deal } from '../model/deal';
import { SearchOnedrive } from '../model/template';
import { TemplateService } from '../template/template.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public lstPractice: Array<Deal> = [];
  public searchOneDrive: SearchOnedrive = new SearchOnedrive();
  public batchNumber: string;
  public searchString:string;
  //lead.LeadName+' ' + lead.PatientLastName + '_' + lead.BatchNumber + '-'
  constructor(public router: Router, private notyHelper: NotyHelper, public templateService: TemplateService) { }

  ngOnInit() {
    this.getAllPractice();
  }

  getAllPractice() {
    this.templateService.getAllPractice().subscribe(data => {
      if (data) {
        this.lstPractice = data;
      }
    }, err => { }, () => { });
  }


  findOneDrive(searchOneDrive) {
    this.templateService.findOneDrive(searchOneDrive).subscribe(data => {
      if (data) {

      }
    }, err => { }, () => { });
  }

}
