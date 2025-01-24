import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyRegister } from '../companyapi/models';
import { CompanyDto } from '../companyapi/models/company-dto';
import { CompanyService } from '../companyapi/services';
import { NotyHelper } from '../helper/NotyHelper';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  public id: number = 0;
  public companyDetails: CompanyDto = {};
  public companyRegister: CompanyRegister = {};
  constructor(private companyService: CompanyService, private notification: NotyHelper, public router: Router) {
    
  }

  ngOnInit(): void {
    
  }

  saveCompanyDetails(companyRegister: CompanyRegister) {
    this.companyService.apiCompanyCreateNewCompanyPost$Json({ body: companyRegister }).subscribe(_data => {
      this.notification.ShowNoty("Company created successfully");
      this.router.navigate(['./home/company']);
    }, _err => {
      this.notification.ShowNoty(_err.message);
    }, () => { });
  }

  checkValidation(obj: any) {
    if (obj)
      return obj.invalid && (obj.dirty || obj.touched);
    else
      return false;
  }
  checkReqValidation(obj: any) {
    if (obj)
      return obj.invalid;
    else
      return false;
  }
  async onFileSelected(event: any) {
    var logo = this.toBase64(event.target.files[0]);
    await this.toBase64(event.target.files[0]).then((data: any) => {
      this.companyRegister.companyLogo = data;
    }).catch(err => { });
  }

  toBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  copyMessage(text: string) {
    navigator.clipboard.writeText(text).then().catch(e => console.log(e));
  }



}
