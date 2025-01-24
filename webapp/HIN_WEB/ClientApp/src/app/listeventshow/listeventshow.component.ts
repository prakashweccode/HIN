  import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddeventshowService } from '../addeventshow/addeventshow.service';
import { Datashared } from '../helper/datashared';

@Component({
  selector: 'app-listeventshow',
  templateUrl: './listeventshow.component.html',
  styleUrls: ['./listeventshow.component.css']
})
export class ListeventshowComponent implements OnInit {
  public allLead: boolean = false;
  public additionalFilter: any;
  public isSecurityEnabled: boolean = false;

  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public apiUrl: string;
  public pageSize: number;
  public actions: Array<any>;
  public pageLengthOptions: Array<number>;
  public eventStatus: any;
  public eventMode: any;
  constructor(public router: Router, public dataShared: Datashared, public addEventShowService: AddeventshowService) { }

  ngOnInit() {
    this.additionalFilter = 'Inactive eq null or Inactive eq false';
    this.addEventShowService.getEventShowType().subscribe(data => {
      if (data) {
        this.eventStatus = data.Item1.map(item => ({
          id: item.Id,
          Name: item.Name
        }));
        this.eventMode = data.Item2.map(item => ({
          id: item.Id,
          Name: item.Name
        }));
      }

      this.gridHeaders = [
        { displayName: 'Event Number', propertyName: 'EventNumber', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null },
        { displayName: 'Event Name', propertyName: 'Name', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null, gridPermissionCheck: '8.1.1' },
        { displayName: 'Event Status', propertyName: 'EventStatusId', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.eventStatus },
        { displayName: 'Event Mode', propertyName: 'EventModeId', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.eventMode }
      ];
    }, err => { }, () => { });
    this.dataSource = new Array<any>();
    this.filterColumns = [
      { column: "Name", value: "", type: "contains" },
      { column: "Telephone", value: "", type: "contains" },
      { column: "City", value: "", type: "contains" },
      { column: "State", value: "", type: "contains" },
      { column: "Industry", value: "", type: "contains" }
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];
  }
  addEventShow() {
    this.router.navigate(['/addeventshow']);
  }
  editEventShow(evt) {
    this.dataShared.setValue(evt.dataRow);
    this.router.navigate(['/editeventshow']);
  }

}
