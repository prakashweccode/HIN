import { Component, Input, OnInit } from '@angular/core';
import { type } from 'os';
import { empty } from 'rxjs';
import { Contactinformation } from '../contactinformation/contactinformation';
import { PrimarycontactService } from './primarycontact.service';

@Component({
  selector: 'app-primarycontact',
  templateUrl: './primarycontact.component.html',
  styleUrls: ['./primarycontact.component.css']
})
export class PrimarycontactComponent implements OnInit {
  showPrimaryContact: boolean = true;
  @Input() entityId: number;
  @Input() entityType: number;
  public contactInfo: Contactinformation = new Contactinformation();
  constructor(public primarycontactService:PrimarycontactService) { }

  ngOnInit() {
    if (this.entityId && this.entityType) {
      this.getPrimaryContact(this.entityId, this.entityType);
    }
  }

  getPrimaryContact(entityId, type) {
    this.primarycontactService.getPrimaryContact(entityId, type).subscribe(data => {
      if (data) {
        this.contactInfo = data;
      }
    }, err => { }, () => { });
  }

  savePrimaryContact(id) {
    if (id) {
      this.entityId = id;
    }
    if (this.contactInfo.FirstName != null && this.contactInfo.FirstName != "" && this.entityId != null && this.entityType != null && this.contactInfo.Email != null && this.contactInfo.Email != "" && this.contactInfo.CellNumber != null && this.contactInfo.CellNumber != "") {
      this.contactInfo.EntityId = this.entityId;
      this.contactInfo.Type = this.entityType;
      this.primarycontactService.savePrimaryContact(this.contactInfo).subscribe(data => {
        if (data) {
          this.contactInfo = data;
        }
      }, err => { }, () => { });
    }
  }

}
