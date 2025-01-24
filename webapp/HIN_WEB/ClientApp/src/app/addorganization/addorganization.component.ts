import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organization } from '../model/organization';
import { Label } from '../model/label';
import { AddorganizationService } from './addorganization.service';
import { NotyHelper } from '../helper/NotyHelper';
import { Datashared } from '../helper/datashared';


@Component({
  selector: 'app-addorganization',
  templateUrl: './addorganization.component.html',
  styleUrls: ['./addorganization.component.css']
})
export class AddorganizationComponent implements OnInit {
  public organization: Organization = new Organization();
  constructor(public router: Router, public addOrganizationService: AddorganizationService, public notification: NotyHelper, public dataShared: Datashared) { }
 
  labels: Array<Label> = [{ Id: 1, Name: "Hot" }, { Id: 2, Name: "Cold" }, { Id: 3, Name: "Warm" }];

  ngOnInit() {
    let organizationData = new Organization();
    organizationData = this.dataShared.getValue();
    if (organizationData) {
      this.organization = organizationData;
    }
  }

  saveOrganization(organization) {
    this.addOrganizationService.saveOrganization(organization).subscribe(data => {
      if (data != null) {
        this.organization = data;
        this.notification.ShowNoty("Save Successfully");
        this.router.navigate(['/listorganization']);
      }
      else {
        this.notification.ShowNoty("Error Occured");
      }
    });
  }

  cancel() {
    this.router.navigate(['/listorganization']);
  }
  //pushLabel(label) {
  //  if (!this.assignCheck(label)) {
  //    this.organization.LeadLabels.push(label);
  //  }
  //  else {
  //    this.removeLabel(label);
  //  }
  //}
  //assignCheck(label) {
  //  return this.organization.LeadLabels.find(x => x.Id == label.Id) != undefined;
  //}
  //removeLabel(label) {
  //  this.organization.LeadLabels = this.organization.LeadLabels.filter(x => x.Id != label.Id);
  //}


}
