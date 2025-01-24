import { Component, OnInit } from '@angular/core';
import { UserDetail } from '../login/login';
import { Datashared } from '../helper/datashared';
import { Vendor, VendorContact, VendorTimeCost, VendorMaterialCost, VendorContactNextStep } from '../model/vendor';
import { Router } from '@angular/router';
import { Users } from '../users/users';
import { UsersService } from '../users/users.service';
import { AddvendorService } from '../addvendor/addvendor.service';
import { ModalService } from '../loader.service';
import { ContactinformationService } from '../contactinformation/contactinformation.service';
import { Contactinformation } from '../contactinformation/contactinformation';
import { NotyHelper } from '../helper/NotyHelper';
import { Timecost } from '../model/timecost';
import { LeadGenType } from '../helper/LeadGenType';
import { Pipeline, PipelineGroup } from '../model/pipeline';
import { ListdealsService } from '../listdeals/listdeals.service';
import { NotesInformation } from '../notesinfo/notesinfo';
import { SfcalendarService } from '../sfcalendar/sfcalendar.service';
import { NotesinfoService } from '../notesinfo/notesinfo.service';
import { Officeemail } from '../model/officeemail';

@Component({
  selector: 'app-vendorsteps',
  templateUrl: './vendorsteps.component.html',
  styleUrls: ['./vendorsteps.component.css']
})
export class VendorstepsComponent implements OnInit {
  emailInfos: Array<Officeemail> = [];
  notesInfos: Array<NotesInformation> = [];
  activeContainer: string = "tab1";
  contactInformations: Array<Contactinformation> = [];
  selectedContactInfo: Contactinformation = new Contactinformation();
  toggle: boolean = false;
  selectedContact: Contactinformation;
  contactInfo: Contactinformation = new Contactinformation();
  public entityType: number = LeadGenType.Vendor;
  public entityNumber: string;
  public entityId: number;
  selectedPipeIndex = 0;
  public listPipeLineGroup: Array<PipelineGroup>;
  public listofPipeline: Array<Pipeline>;
  public vendor: Vendor = new Vendor();

  constructor(private notesService: NotesinfoService, private calendarService: SfcalendarService, public dataShared: Datashared, public router: Router, private contactService: ContactinformationService, public dealService: ListdealsService, private modalService: ModalService, public noty: NotyHelper) { }

  ngOnInit() {
    this.getPipeLineGroups();
    var vendorData = new Vendor();
    vendorData = this.dataShared.getValue();
    if (vendorData) {
      this.vendor = vendorData;
      this.entityId = this.vendor.VendorId;
      this.entityNumber = this.vendor.VendorNumber;
      this.getPipeLine(this.vendor.PipelineGroupId);
      this.LoadNotes(this.vendor.VendorId, this.entityType);
    }
    else {
      this.router.navigate(['/listvendor']);
    }
  }


  LoadNotes(entityId, entityTypeId) {
    this.notesService.LoadNotes(entityId, entityTypeId).subscribe(data => {
      if (data) {
        this.notesInfos = data;
      }
    }, err => { }, () => { });
  }

  closeToggle() {
    this.selectedContact = null;
    this.toggle = false;
  }

  getContactInformation() {
    this.contactService.getContactInformation(this.entityType, this.vendor.VendorId, false).subscribe(data => {
      if (data != null) {
        this.contactInformations = data;
        if (this.contactInformations.length == 1) {
          this.selectedContactInfo = this.contactInformations[0];
        }
      }
    }, err => { }, () => { });
  }

  checkValidation(obj) {
    if (obj)
      return obj.invalid && (obj.dirty || obj.touched);
    else
      return false;
  }
  checkReqValidation(obj) {
    if (obj)
      return obj.invalid;
    else
      return false;
  }



  editVendor(vendor) {
    //this.dataShared.setPermissionBaseValue(permission);
    this.dataShared.setValue(vendor);
    this.navigate('addvendormodal', true);
  }

  addNewContact() {
    this.selectedContact = null;
    this.contactInfo = new Contactinformation();
    this.toggle = true;
  }

  addNewVendor() {
    this.navigate('addvendormodal', true);
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

  getPipeLineGroups() {
    this.dealService.getPipeLineGroup().subscribe(data => {
      this.listPipeLineGroup = data;
    });
  }

  getPipeLine(id) {
    if (id) {
      this.dealService.getPipeLineByPipeLineGroupId(id).subscribe(data => {
        this.listofPipeline = data;
        this.listofPipeline = this.sortBy('DisplayOrder');
        this.selectedPipeIndex = this.listofPipeline.findIndex(x => x.PipelineId == this.vendor.PipelineId);
        if (this.selectedPipeIndex == -1) {
          this.selectedPipeIndex = 0;
          this.vendor.PipelineId = this.listofPipeline[this.selectedPipeIndex].PipelineId;
        }
      });
    }
  }

  getPipeLineGroupName(id) {
    if (this.listPipeLineGroup) {
      var name = this.listPipeLineGroup.find(x => x.PipelineGroupId == id).Name;
      return name;
    }
  }

  getPipeLineName(id) {
    if (this.listofPipeline) {
      var name = this.listofPipeline.find(x => x.PipelineId == id).Name;
      return name;
    }
  }

  sortBy(prop: string) {
    return this.listofPipeline ? this.listofPipeline.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1) : [];
  }


  saveContactInfo(contactInfo) {
    contactInfo.Type = this.entityType;
    contactInfo.EntityId = this.vendor.VendorId;
    if (!contactInfo.Id) {
      this.contactService.addContactInfo(contactInfo).subscribe(data => {
        if (data) {
          this.selectedContact = null;
          this.getContactInformation();
          this.toggle = false;
          this.noty.ShowNoty("Contact information saved !!!");
        }
      }, err => { }, () => { });
    }
    else {
      this.contactService.UpdateContact(contactInfo).subscribe(data => {
        if (data) {
          this.selectedContact = null;
          this.getContactInformation();
          this.toggle = false;
          this.noty.ShowNoty("Contact information saved !!!");
        }
      }, err => { }, () => { });
    }
  }

  cancel() {
    this.dataShared.setEntityValue(this.entityType);
    this.dataShared.setValue(this.vendor.PipelineGroupId);
    this.router.navigate(['/funnel']);
  }
}
