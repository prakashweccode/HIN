import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntitynameService } from './entityname.service';
import { Entityname } from '../model/entityname';
import { Leadgenentitytype } from '../model/leadgenentitytype';
import { Router } from '@angular/router';
import { ModalService } from '../loader.service';

@Component({
  selector: 'app-entityname',
  templateUrl: './entityname.component.html',
  styleUrls: ['./entityname.component.css']
})
export class EntitynameComponent implements OnInit {
  listEntityName: Array<Entityname> = [];
  listLeadGenType: Array<Leadgenentitytype> = [];
  @Input() entityTypeId: number;
  @Input() entityId: number;
  @Output() sendEntityValue = new EventEmitter();
  @Output() sendEntityTypeName = new EventEmitter();

  constructor(public entityNameService: EntitynameService, private router: Router, private modalService: ModalService) { }

  ngOnInit() {
    this.getLeadGenType();
    if (this.entityTypeId) {
      this.getEntityNamesByType(this.entityTypeId);
    }
  }

  getLeadGenType() {
    this.entityNameService.getLeadGenType().subscribe(data => {
      if (data) {
        this.listLeadGenType = data;
      }
    }, err => {

    }, () => {

    });
  }

  getTextName(id) {
    if (id) {
      var entityType = this.listLeadGenType.find(x => x.Id == id);
      if (entityType) {
        return entityType.EntityType;
      }
      else {
        return "Select Provider";
      }
    }
    else {
      return "Select Provider";
    }
  }

  getEntityName(evt) {
    if (evt) {
      this.entityTypeId = parseInt(evt.target.value);
      this.getEntityNamesByType(this.entityTypeId);
      this.sendEntityValue.emit(evt.target.value);
      this.entityId = 0;
    }
  }

  getEntityNamesByType(entityTypeId) {
    let leadStatus = entityTypeId == 21 ? 1 : (entityTypeId == 22 ? 2 : 3);
    this.entityNameService.getEntityName(entityTypeId, leadStatus).subscribe(data => {
      if (data) {
        this.listEntityName = data;
      }
    }, err => {

    }, () => {

    });
  }

  navigate(path, ismodel) {
    if (ismodel) {
      this.modalService.show(null);
      this.router.navigate([{ outlets: { modal: [path] } }]);
    }
    else {
      this.router.navigate(['/' + path]);
    }
  }

  sendEntityType(evt) {
    if (evt) {
      if (evt.target.value == "0") {
        return;
      }
      else if (evt.target.value == "-1") {
        switch (this.entityTypeId) {
          case 1:
            this.navigate('addleadsmodal', true);
            break;
          case 4:
            this.navigate('addvendorsmodal', true);
            break;
          case 5:
            this.navigate('addeventshowmodal', true);
            break;
          case 18:
            this.navigate('addusermodal', true);
            break;
          case 19:
            this.navigate('addpartnermodal', true);
            break;
          case 20:
            this.navigate('addreferralmodal', true);
            break;
          case 21:
            this.navigate('addleadsmodal', true);
            break;
          case 22:
            this.navigate('addleadsmodal', true);
            break;
        }
      }
      else {
        this.sendEntityTypeName.emit(evt.target.value);
      }
    }
  }



}
