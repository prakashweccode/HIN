import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-importsettings',
  templateUrl: './importsettings.component.html',
  styleUrls: ['./importsettings.component.css']
})
export class ImportsettingsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  gotoLeadImport() {
    this.router.navigate(['/leadimport']);
  }
  gotoContactImport() {
    this.router.navigate(['/contactimport']);
  }
  gotoVendorImport() {
    this.router.navigate(['/vendorimport']);
  }
  gotoPartnerImport() {
    this.router.navigate(['/partnerimport']);
  }
  gotoReferralImport() {
    this.router.navigate(['/referralimport']);
  }
  gotoImportLog() {
    //this.router.navigate(['/importlog']);
  }
}
