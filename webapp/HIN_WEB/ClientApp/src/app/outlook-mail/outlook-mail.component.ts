import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotyHelper } from '../helper/NotyHelper';
import { LoaderService } from '../loader.service';
import { GraphService } from '../officeauth/graph.service';

@Component({
  selector: 'app-outlook-mail',
  templateUrl: './outlook-mail.component.html',
  styleUrls: ['./outlook-mail.component.css']
})
export class OutlookMailComponent implements OnInit {
  emailToggle: boolean = false;
  isConnected: boolean = false;
  public mailFolders: any[] = [];
  public folderItems: any[] = [];
  public mailItem: any;
  public favToggle: boolean = true;
  public show: boolean = false;
  public take: number = 100; 
  public pageNumber: number = 0;
  public pageLength: number = 0;
  public selectedFolder: any;
  constructor(private graphService: GraphService, private sanitizer: DomSanitizer, private noty: NotyHelper, private loaderService: LoaderService) { }

  ngOnInit() {
    
  }
  statusEmitter(value) {
    this.isConnected = value;
    if (value) {
      this.getOffice365MailFolders();
    }
    else {
      this.mailFolders = [];
      this.folderItems = [];
      this.mailItem = null;
    }
  }
  newEmail() {
    this.emailToggle = true;
  }

  closeEmailToggle(evt) {
    if (evt == 'false') {
      this.emailToggle = false;
    }
  }

  closeToggle() {
    this.emailToggle = false;
  }

  disableNextPage() {
    if (this.pageLength > 1 && this.pageNumber < (this.pageLength-1))
      return false;
    else
      return true;
  }
  gotoPrevious() {
    this.pageNumber--;
    let skip = this.pageNumber * 100;
    this.getOffice365FolderItems(this.selectedFolder, this.take, skip)
  }
  gotoNext() {
    this.pageNumber++;
    let skip = this.pageNumber * 100;
    this.getOffice365FolderItems(this.selectedFolder, this.take, skip)
  }
  async getOffice365MailFolders() {
    this.loaderService.show();
    await this.graphService.getMailFolder().then(_data => {
      if (_data) {
        this.mailFolders = _data.value;
      }
      this.loaderService.hide();
    }).catch(_err => {
      this.noty.ShowNoty(_err.message);
      this.loaderService.hide();
    });
  }
  assignPageLength(totalItemCount) {
    let pageLength = Math.ceil(totalItemCount / 100);
    this.pageLength = pageLength;
  }
  async getOffice365FolderItems(folder, take, skip) {
    this.loaderService.show();
    await this.graphService.getMailFolderItems(folder.id, take, skip).then(_data => {
      if (_data) {
        this.folderItems = _data.value;
        this.mailItem = null;
        this.mailFolders.forEach(x => {
          if (x.id == folder.id) {
            x.activeFolder = true;
            this.selectedFolder = x;
          }
          else
            x.activeFolder = false;
        });
      }
      this.assignPageLength(folder.totalItemCount);
      this.loaderService.hide();
    }).catch(_err => {
      this.noty.ShowNoty(_err.message);
      this.loaderService.hide();
    });
  }
  async getMailById(id) {
    this.loaderService.show();
    await this.graphService.getEmails(id).then(_data => {
      if (_data) {
        this.mailItem = _data;
        this.folderItems.forEach(x => {
          if (x.id == id)
            x.activeMail = true;
          else
            x.activeMail = false;
        });
      }
      this.loaderService.hide();
    }).catch(_err => {
      this.noty.ShowNoty(_err.message);
      this.loaderService.hide();
    });
  }
  bindPreviewHTML(html) {
    if (html) {
      let safeHTML = this.sanitizer.bypassSecurityTrustHtml(html);
      return safeHTML;
    }
  }
}
