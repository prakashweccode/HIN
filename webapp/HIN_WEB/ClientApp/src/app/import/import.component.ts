import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ImportService } from './import.service';
import { HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { MappedColumns } from './import';
import { NotyHelper } from '../helper/NotyHelper';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  @ViewChild('file', { static: false }) fileUploader: ElementRef;
  @Input() EntityName: string;
  @Input() SaveApiPath: string;
  @Input() GetHeaderApiPath: string;
  @Input() CancelPath: string;
  public fileName: string = '';
  progress: number;
  public entityColumns: Array<string> = [];
  public requiredColumns: Array<string> = [];
  //public csvProperties: any;
  public fileColumns: any;
  public mappedColumns: Array<MappedColumns> = [];
  constructor(public importService: ImportService, public http: HttpClient, public router: Router, public notification: NotyHelper) { }

  ngOnInit() {
    this.getCsvProperties();
  }
  getCsvProperties() {
    this.importService.getCsvProperties(this.EntityName).subscribe(data => {
      if (data) {
        this.entityColumns = data.Item1;
        this.requiredColumns = data.Item2;
      }
    }, err => { }, () => { });
  }
  SelectFile(file) {
    this.fileName = file.files[0].name;
    const formData: FormData = new FormData();
    formData.append('file', file.files[0], file.files[0].name);
    const uploadReq = new HttpRequest('POST', this.GetHeaderApiPath, formData, {
      reportProgress: true
    });
    this.http.request(uploadReq).subscribe(data => {
      if (data) {
        if (data.type === HttpEventType.Response) {
          this.fileColumns = data.body;
        }
      }
    });
  }
  addMappedColumn(evt) {
    if (evt) {
      this.mappedColumns.push(evt);
    }
  }
  ResetFileUpload() {
    this.fileUploader.nativeElement.value = '';
    this.fileName = '';
  }
  UploadFile(file) {
    let uploadedFile: FileList = file.files;
    if (uploadedFile.length > 0) {
      let found = this.mappedColumns.filter(val => this.requiredColumns.includes(val.TableColumn));
      if (found.length >= this.requiredColumns.length) {
        const fileToUpload = uploadedFile[0];
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        formData.append(JSON.stringify(this.mappedColumns), 'mappedcolumns');
        const uploadReq = new HttpRequest('POST', this.SaveApiPath, formData, {
          reportProgress: true,
        });
        this.http.request(uploadReq).subscribe(event => {
          if (event.type === HttpEventType.DownloadProgress) {
            this.notification.ShowNoty("Uploaded successfully!");
          }
          if (event.type === HttpEventType.Response) {
            this.notification.ShowNoty("Uploaded successfully!");
          }
        });
      }
      else {
        this.notification.ShowNoty("Please select required fields!");
      }
      
    }
    else {
      this.notification.ShowNoty("Please select a valid csv file to upload!");
    }
  }
  cancel() {
    this.router.navigate([this.CancelPath]);
  }
}
