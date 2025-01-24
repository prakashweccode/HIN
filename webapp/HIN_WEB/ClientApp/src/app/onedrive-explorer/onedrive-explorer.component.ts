import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NotyHelper } from '../helper/NotyHelper';
import { explorerValues, Onedriveconfig } from '../helper/onedriveconfig';
import { Message, Officeemail } from '../model/officeemail';
import { AuthService } from '../officeauth/auth.service';
import { GraphService } from '../officeauth/graph.service';
import { OnedrivegraphService } from '../onedriveservice/onedrivegraph.service';
import { DirectoryInfos, NewFolder, SelectedNode } from '../sf-file-explorer/sf-file-explorer';
import { SfFileExplorerService } from '../sf-file-explorer/sf-file-explorer.service';

@Component({
  selector: 'app-onedrive-explorer',
  templateUrl: './onedrive-explorer.component.html',
  styleUrls: ['./onedrive-explorer.component.css']
})
export class OnedriveExplorerComponent implements OnInit {
  isListView: boolean = true;
  selectedNode: any;
  isDownloadEnabled: boolean = false;
  addDirectoryToggle: boolean = false;
  uploadToggle: boolean = false;
  folderUploadToggle: boolean = false;
  @Input() searchString: string;
  doc: string = '';
  previewToggle: boolean = false;
  rootDrive: any;
  public rootPath: string;
  directoryInfos: DirectoryInfos = new DirectoryInfos();
  isSelected: boolean = false;
  selectedIndex: number = null;
  public newDirectoryName: string;
  rootItems: any;
  tempChild: any;
  lstSelectedChilds: Array<any> = [];
  driveDatas: Array<any> = [];
  isConnected: boolean = false;
  @Input() EmrNo: string;
  isSharedDrive: boolean = false;
  public listOfShareEmails = [];
  public shareMessage: string;
  public parentReference: any;
  public sharedFolder: any;
  constructor(private graphService: OnedrivegraphService, private noty: NotyHelper) {

  }

  ngOnInit() {
    if (explorerValues.authentication.status === 'authenticated') {
      this.intializeComponent();
    }
    else {
      this.driveDatas = [];
    }
    //if (this.EmrNo) {
    //  let content = {
    //    "name": this.EmrNo,
    //    "folder": {},
    //    "@microsoft.graph.conflictBehavior": "rename"
    //  }
    //  this.CreatePatientEMRFolder(content);
    //}
  }
  //CreatePatientEMRFolder(content: any) {
  //  let status = this.graphService.checkIfPatientFolderExist(content);
  //}
  intializeComponent() {
    //this.getRootDrive();
    this.getPatientFiles();
  }

  async getPatientFiles() {
    if (this.searchString) {
      let request = {
        "requests": [
          {
            "entityTypes": [
              "driveItem"
            ],
            "query": {
              "queryString": this.searchString + " AND ContentType:Document"
            }
          }
        ]
      };
      await this.graphService.executeQuery('POST', Onedriveconfig.graphV1UrlExcludeMe + 'search/query', request).subscribe(data => {
        if (data) {
          this.driveDatas = [];
          this.rootDrive = data.value[0].hitsContainers[0].hits;
          this.rootDrive.forEach(x => {
            x.resource.file = true;
            this.driveDatas.push(x.resource);
          });
          console.log(this.driveDatas);
        }
      }, err => { }, () => { });
    }
  }

  closePreviewToggle() {
    this.previewToggle = false;
  }

  createNewFolder() {
    this.newDirectoryName = '';
    this.addDirectoryToggle = true;
  }
  uploadFiles() {
    this.uploadToggle = true;
  }
  uploadFolder() {
    this.folderUploadToggle = true;
  }

  closeUploadToggle() {
    this.uploadToggle = false;
  }
  closeFolderUploadToggle() {
    this.folderUploadToggle = false;
  }

  download() {
    if (this.selectedNode && this.selectedNode.file) {
      
    }
  }
  preview() {
    if (this.selectedNode && this.selectedNode.file) {

    }
  }

  delete() {
    if (!this.selectedNode.isRoot) {

    }
    else {
      this.noty.ShowNoty("Root folder can't be deleted");
    }
  }
  listView() {
    this.isListView = false;
  }
  thumbNailView() {
    this.isListView = true;
  }
  syncOneDrive() {

  }
  home() {
    this.getPatientFiles();
    //this.getRootDrive();
  }
  getDrive(node) {
    if (node) {
      this.loadItems(node);
    }
  }
  selectDrive(node) {
    if (node) {
      this.clearSelection();
      this.selectedNode = node;
      node.isSelected = true;
    }
  }

  async getRootDrive(): Promise<void> {
    await this.graphService.executeQuery('GET', Onedriveconfig.graphV1Url + 'drive/root:/Health/' + this.EmrNo + ':/').subscribe(x => {
      this.driveDatas = [];
      this.rootDrive = x;
      if (this.rootDrive) {
        this.driveDatas.push(x);
      }
      this.clearSelection();
    }, err => {
      if (err.status === 404) {
        this.driveDatas = [];
        this.getMySharedDrive(this.EmrNo);
      }
    }, () => { });
  }
  async getMySharedDrive(currentFolderName: string): Promise<any> {
    await this.graphService.executeQuery('GET', Onedriveconfig.graphV1Url + 'drive/sharedwithme?allowexternal=true').subscribe(data => {
      //this.driveDatas = [];
      //this.rootDrive = x;
      this.sharedFolder = data;
      if (data) {
        this.getSharedFolder(this.sharedFolder.value, currentFolderName);
      }
      //this.clearSelection();
    }, err => { }, () => { });
  }

  getSharedFolder(sharedfolder, foldername) {
    if (sharedfolder && sharedfolder.length > 0) {
      var findFolder = sharedfolder.find(x => x.name == foldername);
      if (findFolder) {
        this.driveDatas.push(findFolder);
      }
    }
  }

  openDrive() {
    if (this.selectedNode) {
      this.loadItems(this.selectedNode);
    }
  }

  async loadItems(node): Promise<void> {
    if (node.folder) {
      let parentNodeId = node.parentReference ? node.parentReference.driveId : node.remoteItem.parentReference.driveId;
      await this.graphService.executeQuery('GET', Onedriveconfig.graphV1Url + 'drives/' + parentNodeId + '/items/' + node.id + '/children').subscribe(x => {
        this.rootDrive = x;
        if (this.rootDrive.value) {
          this.driveDatas = [];
          this.rootDrive.value.forEach(x => {
            this.driveDatas.push(x);
          });
        }

        this.parentReference = node.parentReference;
        this.clearSelection();
      }, err => { });
    }
    else if (node.file) {
      window.open(node.webUrl, "_blank");
    }
  }

  goBack() {
    if (this.parentReference) {
      this.getPreviousItem(this.parentReference);
    }
  }

  async getPreviousItem(el: any) {
    if (el) {
      let rootPath = Onedriveconfig.graphV1Url + 'drive/root:/Health/' + this.EmrNo + ':/';
      let absolutePath = Onedriveconfig.graphV1Url + 'drives/' + el.driveId + '/items/' + el.id + '/children';
      let path = this.validateRelativePath(el.path);
      if (path) {
        await this.graphService.executeQuery('GET', absolutePath).subscribe(x => {
          this.rootDrive = x;
          if (this.rootDrive.value) {
            this.driveDatas = [];
            this.rootDrive.value.forEach(x => {
              this.driveDatas.push(x);
            });
          }
          this.parentReference = el;
          this.clearSelection();
        }, err => { });
      }
      else {
        await this.graphService.executeQuery('GET', rootPath).subscribe(x => {
          this.driveDatas = [];
          this.rootDrive = x;
          if (this.rootDrive) {
            this.driveDatas.push(x);
          }
          this.clearSelection();
        }, err => { }, () => { });
      }

    }
  }

  validateRelativePath(path) {
    let arrpath = path.split('/');
    if (arrpath.length < 4) {
      return null;
    }
    else {
      var lastIndex = path.lastIndexOf("/");
      var requiredPath = path.slice(0, lastIndex + 1);
      return requiredPath;
    }
  }

  clearSelection() {
    this.isSelected = false;
    this.selectedIndex = null;
    this.selectedNode = null;
    this.driveDatas.forEach(x => x.isSelected = false);
  }

  getMimeType(filename) {
    let mimeType = [{ ext: "323", mimeType: "text/h323" },
    { ext: "3g2", mimeType: "video/3gpp2" },
    { ext: "3gp", mimeType: "video/3gpp" },
    { ext: "3gp2", mimeType: "video/3gpp2" },
    { ext: "3gpp", mimeType: "video/3gpp" },
    { ext: "7z", mimeType: "application/x-7z-compressed" },
    { ext: "aa", mimeType: "audio/audible" },
    { ext: "AAC", mimeType: "audio/aac" },
    { ext: "aaf", mimeType: "application/octet-stream" },
    { ext: "aax", mimeType: "audio/vnd.audible.aax" },
    { ext: "ac3", mimeType: "audio/ac3" },
    { ext: "aca", mimeType: "application/octet-stream" },
    { ext: "accda", mimeType: "application/msaccess.addin" },
    { ext: "accdb", mimeType: "application/msaccess" },
    { ext: "accdc", mimeType: "application/msaccess.cab" },
    { ext: "accde", mimeType: "application/msaccess" },
    { ext: "accdr", mimeType: "application/msaccess.runtime" },
    { ext: "accdt", mimeType: "application/msaccess" },
    { ext: "accdw", mimeType: "application/msaccess.webapplication" },
    { ext: "accft", mimeType: "application/msaccess.ftemplate" },
    { ext: "acx", mimeType: "application/internet-property-stream" },
    { ext: "AddIn", mimeType: "text/xml" },
    { ext: "ade", mimeType: "application/msaccess" },
    { ext: "adobebridge", mimeType: "application/x-bridge-url" },
    { ext: "adp", mimeType: "application/msaccess" },
    { ext: "ADT", mimeType: "audio/vnd.dlna.adts" },
    { ext: "ADTS", mimeType: "audio/aac" },
    { ext: "afm", mimeType: "application/octet-stream" },
    { ext: "ai", mimeType: "application/postscript" },
    { ext: "aif", mimeType: "audio/x-aiff" },
    { ext: "aifc", mimeType: "audio/aiff" },
    { ext: "aiff", mimeType: "audio/aiff" },
    { ext: "air", mimeType: "application/vnd.adobe.air-application-installer-package+zip" },
    { ext: "amc", mimeType: "application/x-mpeg" },
    { ext: "application", mimeType: "application/x-ms-application" },
    { ext: "art", mimeType: "image/x-jg" },
    { ext: "asa", mimeType: "application/xml" },
    { ext: "asax", mimeType: "application/xml" },
    { ext: "ascx", mimeType: "application/xml" },
    { ext: "asd", mimeType: "application/octet-stream" },
    { ext: "asf", mimeType: "video/x-ms-asf" },
    { ext: "ashx", mimeType: "application/xml" },
    { ext: "asi", mimeType: "application/octet-stream" },
    { ext: "asm", mimeType: "text/plain" },
    { ext: "asmx", mimeType: "application/xml" },
    { ext: "aspx", mimeType: "application/xml" },
    { ext: "asr", mimeType: "video/x-ms-asf" },
    { ext: "asx", mimeType: "video/x-ms-asf" },
    { ext: "atom", mimeType: "application/atom+xml" },
    { ext: "au", mimeType: "audio/basic" },
    { ext: "avi", mimeType: "video/x-msvideo" },
    { ext: "axs", mimeType: "application/olescript" },
    { ext: "bas", mimeType: "text/plain" },
    { ext: "bcpio", mimeType: "application/x-bcpio" },
    { ext: "bin", mimeType: "application/octet-stream" },
    { ext: "bmp", mimeType: "image/bmp" },
    { ext: "c", mimeType: "text/plain" },
    { ext: "cab", mimeType: "application/octet-stream" },
    { ext: "caf", mimeType: "audio/x-caf" },
    { ext: "calx", mimeType: "application/vnd.ms-office.calx" },
    { ext: "cat", mimeType: "application/vnd.ms-pki.seccat" },
    { ext: "cc", mimeType: "text/plain" },
    { ext: "cd", mimeType: "text/plain" },
    { ext: "cdda", mimeType: "audio/aiff" },
    { ext: "cdf", mimeType: "application/x-cdf" },
    { ext: "cer", mimeType: "application/x-x509-ca-cert" },
    { ext: "chm", mimeType: "application/octet-stream" },
    { ext: "class", mimeType: "application/x-java-applet" },
    { ext: "clp", mimeType: "application/x-msclip" },
    { ext: "cmx", mimeType: "image/x-cmx" },
    { ext: "cnf", mimeType: "text/plain" },
    { ext: "cod", mimeType: "image/cis-cod" },
    { ext: "config", mimeType: "application/xml" },
    { ext: "contact", mimeType: "text/x-ms-contact" },
    { ext: "coverage", mimeType: "application/xml" },
    { ext: "cpio", mimeType: "application/x-cpio" },
    { ext: "cpp", mimeType: "text/plain" },
    { ext: "crd", mimeType: "application/x-mscardfile" },
    { ext: "crl", mimeType: "application/pkix-crl" },
    { ext: "crt", mimeType: "application/x-x509-ca-cert" },
    { ext: "cs", mimeType: "text/plain" },
    { ext: "csdproj", mimeType: "text/plain" },
    { ext: "csh", mimeType: "application/x-csh" },
    { ext: "csproj", mimeType: "text/plain" },
    { ext: "css", mimeType: "text/css" },
    { ext: "csv", mimeType: "text/csv" },
    { ext: "cur", mimeType: "application/octet-stream" },
    { ext: "cxx", mimeType: "text/plain" },
    { ext: "dat", mimeType: "application/octet-stream" },
    { ext: "datasource", mimeType: "application/xml" },
    { ext: "dbproj", mimeType: "text/plain" },
    { ext: "dcr", mimeType: "application/x-director" },
    { ext: "def", mimeType: "text/plain" },
    { ext: "deploy", mimeType: "application/octet-stream" },
    { ext: "der", mimeType: "application/x-x509-ca-cert" },
    { ext: "dgml", mimeType: "application/xml" },
    { ext: "dib", mimeType: "image/bmp" },
    { ext: "dif", mimeType: "video/x-dv" },
    { ext: "dir", mimeType: "application/x-director" },
    { ext: "disco", mimeType: "text/xml" },
    { ext: "dll", mimeType: "application/x-msdownload" },
    { ext: "dll.config", mimeType: "text/xml" },
    { ext: "dlm", mimeType: "text/dlm" },
    { ext: "doc", mimeType: "application/msword" },
    { ext: "docm", mimeType: "application/vnd.ms-word.document.macroEnabled.12" },
    { ext: "docx", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
    { ext: "dot", mimeType: "application/msword" },
    { ext: "dotm", mimeType: "application/vnd.ms-word.template.macroEnabled.12" },
    { ext: "dotx", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.template" },
    { ext: "dsp", mimeType: "application/octet-stream" },
    { ext: "dsw", mimeType: "text/plain" },
    { ext: "dtd", mimeType: "text/xml" },
    { ext: "dtsConfig", mimeType: "text/xml" },
    { ext: "dv", mimeType: "video/x-dv" },
    { ext: "dvi", mimeType: "application/x-dvi" },
    { ext: "dwf", mimeType: "drawing/x-dwf" },
    { ext: "dwp", mimeType: "application/octet-stream" },
    { ext: "dxr", mimeType: "application/x-director" },
    { ext: "eml", mimeType: "message/rfc822" },
    { ext: "emz", mimeType: "application/octet-stream" },
    { ext: "eot", mimeType: "application/octet-stream" },
    { ext: "eps", mimeType: "application/postscript" },
    { ext: "etl", mimeType: "application/etl" },
    { ext: "etx", mimeType: "text/x-setext" },
    { ext: "evy", mimeType: "application/envoy" },
    { ext: "exe", mimeType: "application/octet-stream" },
    { ext: "exe.config", mimeType: "text/xml" },
    { ext: "fdf", mimeType: "application/vnd.fdf" },
    { ext: "fif", mimeType: "application/fractals" },
    { ext: "filters", mimeType: "Application/xml" },
    { ext: "fla", mimeType: "application/octet-stream" },
    { ext: "flr", mimeType: "x-world/x-vrml" },
    { ext: "flv", mimeType: "video/x-flv" },
    { ext: "fsscript", mimeType: "application/fsharp-script" },
    { ext: "fsx", mimeType: "application/fsharp-script" },
    { ext: "generictest", mimeType: "application/xml" },
    { ext: "gif", mimeType: "image/gif" },
    { ext: "group", mimeType: "text/x-ms-group" },
    { ext: "gsm", mimeType: "audio/x-gsm" },
    { ext: "gtar", mimeType: "application/x-gtar" },
    { ext: "gz", mimeType: "application/x-gzip" },
    { ext: "h", mimeType: "text/plain" },
    { ext: "hdf", mimeType: "application/x-hdf" },
    { ext: "hdml", mimeType: "text/x-hdml" },
    { ext: "hhc", mimeType: "application/x-oleobject" },
    { ext: "hhk", mimeType: "application/octet-stream" },
    { ext: "hhp", mimeType: "application/octet-stream" },
    { ext: "hlp", mimeType: "application/winhlp" },
    { ext: "hpp", mimeType: "text/plain" },
    { ext: "hqx", mimeType: "application/mac-binhex40" },
    { ext: "hta", mimeType: "application/hta" },
    { ext: "htc", mimeType: "text/x-component" },
    { ext: "htm", mimeType: "text/html" },
    { ext: "html", mimeType: "text/html" },
    { ext: "htt", mimeType: "text/webviewhtml" },
    { ext: "hxa", mimeType: "application/xml" },
    { ext: "hxc", mimeType: "application/xml" },
    { ext: "hxd", mimeType: "application/octet-stream" },
    { ext: "hxe", mimeType: "application/xml" },
    { ext: "hxf", mimeType: "application/xml" },
    { ext: "hxh", mimeType: "application/octet-stream" },
    { ext: "hxi", mimeType: "application/octet-stream" },
    { ext: "hxk", mimeType: "application/xml" },
    { ext: "hxq", mimeType: "application/octet-stream" },
    { ext: "hxr", mimeType: "application/octet-stream" },
    { ext: "hxs", mimeType: "application/octet-stream" },
    { ext: "hxt", mimeType: "text/html" },
    { ext: "hxv", mimeType: "application/xml" },
    { ext: "hxw", mimeType: "application/octet-stream" },
    { ext: "hxx", mimeType: "text/plain" },
    { ext: "i", mimeType: "text/plain" },
    { ext: "ico", mimeType: "image/x-icon" },
    { ext: "ics", mimeType: "application/octet-stream" },
    { ext: "idl", mimeType: "text/plain" },
    { ext: "ief", mimeType: "image/ief" },
    { ext: "iii", mimeType: "application/x-iphone" },
    { ext: "inc", mimeType: "text/plain" },
    { ext: "inf", mimeType: "application/octet-stream" },
    { ext: "inl", mimeType: "text/plain" },
    { ext: "ins", mimeType: "application/x-internet-signup" },
    { ext: "ipa", mimeType: "application/x-itunes-ipa" },
    { ext: "ipg", mimeType: "application/x-itunes-ipg" },
    { ext: "ipproj", mimeType: "text/plain" },
    { ext: "ipsw", mimeType: "application/x-itunes-ipsw" },
    { ext: "iqy", mimeType: "text/x-ms-iqy" },
    { ext: "isp", mimeType: "application/x-internet-signup" },
    { ext: "ite", mimeType: "application/x-itunes-ite" },
    { ext: "itlp", mimeType: "application/x-itunes-itlp" },
    { ext: "itms", mimeType: "application/x-itunes-itms" },
    { ext: "itpc", mimeType: "application/x-itunes-itpc" },
    { ext: "IVF", mimeType: "video/x-ivf" },
    { ext: "jar", mimeType: "application/java-archive" },
    { ext: "java", mimeType: "application/octet-stream" },
    { ext: "jck", mimeType: "application/liquidmotion" },
    { ext: "jcz", mimeType: "application/liquidmotion" },
    { ext: "jfif", mimeType: "image/pjpeg" },
    { ext: "jnlp", mimeType: "application/x-java-jnlp-file" },
    { ext: "jpb", mimeType: "application/octet-stream" },
    { ext: "jpe", mimeType: "image/jpeg" },
    { ext: "jpeg", mimeType: "image/jpeg" },
    { ext: "jpg", mimeType: "image/jpeg" },
    { ext: "js", mimeType: "application/x-javascript" },
    { ext: "json", mimeType: "application/json" },
    { ext: "jsx", mimeType: "text/jscript" },
    { ext: "jsxbin", mimeType: "text/plain" },
    { ext: "latex", mimeType: "application/x-latex" },
    { ext: "library-ms", mimeType: "application/windows-library+xml" },
    { ext: "lit", mimeType: "application/x-ms-reader" },
    { ext: "loadtest", mimeType: "application/xml" },
    { ext: "lpk", mimeType: "application/octet-stream" },
    { ext: "lsf", mimeType: "video/x-la-asf" },
    { ext: "lst", mimeType: "text/plain" },
    { ext: "lsx", mimeType: "video/x-la-asf" },
    { ext: "lzh", mimeType: "application/octet-stream" },
    { ext: "m13", mimeType: "application/x-msmediaview" },
    { ext: "m14", mimeType: "application/x-msmediaview" },
    { ext: "m1v", mimeType: "video/mpeg" },
    { ext: "m2t", mimeType: "video/vnd.dlna.mpeg-tts" },
    { ext: "m2ts", mimeType: "video/vnd.dlna.mpeg-tts" },
    { ext: "m2v", mimeType: "video/mpeg" },
    { ext: "m3u", mimeType: "audio/x-mpegurl" },
    { ext: "m3u8", mimeType: "audio/x-mpegurl" },
    { ext: "m4a", mimeType: "audio/m4a" },
    { ext: "m4b", mimeType: "audio/m4b" },
    { ext: "m4p", mimeType: "audio/m4p" },
    { ext: "m4r", mimeType: "audio/x-m4r" },
    { ext: "m4v", mimeType: "video/x-m4v" },
    { ext: "mac", mimeType: "image/x-macpaint" },
    { ext: "mak", mimeType: "text/plain" },
    { ext: "man", mimeType: "application/x-troff-man" },
    { ext: "manifest", mimeType: "application/x-ms-manifest" },
    { ext: "map", mimeType: "text/plain" },
    { ext: "master", mimeType: "application/xml" },
    { ext: "mda", mimeType: "application/msaccess" },
    { ext: "mdb", mimeType: "application/x-msaccess" },
    { ext: "mde", mimeType: "application/msaccess" },
    { ext: "mdp", mimeType: "application/octet-stream" },
    { ext: "me", mimeType: "application/x-troff-me" },
    { ext: "mfp", mimeType: "application/x-shockwave-flash" },
    { ext: "mht", mimeType: "message/rfc822" },
    { ext: "mhtml", mimeType: "message/rfc822" },
    { ext: "mid", mimeType: "audio/mid" },
    { ext: "midi", mimeType: "audio/mid" },
    { ext: "mix", mimeType: "application/octet-stream" },
    { ext: "mk", mimeType: "text/plain" },
    { ext: "mmf", mimeType: "application/x-smaf" },
    { ext: "mno", mimeType: "text/xml" },
    { ext: "mny", mimeType: "application/x-msmoney" },
    { ext: "mod", mimeType: "video/mpeg" },
    { ext: "mov", mimeType: "video/quicktime" },
    { ext: "movie", mimeType: "video/x-sgi-movie" },
    { ext: "mp2", mimeType: "video/mpeg" },
    { ext: "mp2v", mimeType: "video/mpeg" },
    { ext: "mp3", mimeType: "audio/mpeg" },
    { ext: "mp4", mimeType: "video/mp4" },
    { ext: "mp4v", mimeType: "video/mp4" },
    { ext: "mpa", mimeType: "video/mpeg" },
    { ext: "mpe", mimeType: "video/mpeg" },
    { ext: "mpeg", mimeType: "video/mpeg" },
    { ext: "mpf", mimeType: "application/vnd.ms-mediapackage" },
    { ext: "mpg", mimeType: "video/mpeg" },
    { ext: "mpp", mimeType: "application/vnd.ms-project" },
    { ext: "mpv2", mimeType: "video/mpeg" },
    { ext: "mqv", mimeType: "video/quicktime" },
    { ext: "ms", mimeType: "application/x-troff-ms" },
    { ext: "msi", mimeType: "application/octet-stream" },
    { ext: "mso", mimeType: "application/octet-stream" },
    { ext: "mts", mimeType: "video/vnd.dlna.mpeg-tts" },
    { ext: "mtx", mimeType: "application/xml" },
    { ext: "mvb", mimeType: "application/x-msmediaview" },
    { ext: "mvc", mimeType: "application/x-miva-compiled" },
    { ext: "mxp", mimeType: "application/x-mmxp" },
    { ext: "nc", mimeType: "application/x-netcdf" },
    { ext: "nsc", mimeType: "video/x-ms-asf" },
    { ext: "nws", mimeType: "message/rfc822" },
    { ext: "ocx", mimeType: "application/octet-stream" },
    { ext: "oda", mimeType: "application/oda" },
    { ext: "odc", mimeType: "text/x-ms-odc" },
    { ext: "odh", mimeType: "text/plain" },
    { ext: "odl", mimeType: "text/plain" },
    { ext: "odp", mimeType: "application/vnd.oasis.opendocument.presentation" },
    { ext: "ods", mimeType: "application/oleobject" },
    { ext: "odt", mimeType: "application/vnd.oasis.opendocument.text" },
    { ext: "one", mimeType: "application/onenote" },
    { ext: "onea", mimeType: "application/onenote" },
    { ext: "onepkg", mimeType: "application/onenote" },
    { ext: "onetmp", mimeType: "application/onenote" },
    { ext: "onetoc", mimeType: "application/onenote" },
    { ext: "onetoc2", mimeType: "application/onenote" },
    { ext: "orderedtest", mimeType: "application/xml" },
    { ext: "osdx", mimeType: "application/opensearchdescription+xml" },
    { ext: "p10", mimeType: "application/pkcs10" },
    { ext: "p12", mimeType: "application/x-pkcs12" },
    { ext: "p7b", mimeType: "application/x-pkcs7-certificates" },
    { ext: "p7c", mimeType: "application/pkcs7-mime" },
    { ext: "p7m", mimeType: "application/pkcs7-mime" },
    { ext: "p7r", mimeType: "application/x-pkcs7-certreqresp" },
    { ext: "p7s", mimeType: "application/pkcs7-signature" },
    { ext: "pbm", mimeType: "image/x-portable-bitmap" },
    { ext: "pcast", mimeType: "application/x-podcast" },
    { ext: "pct", mimeType: "image/pict" },
    { ext: "pcx", mimeType: "application/octet-stream" },
    { ext: "pcz", mimeType: "application/octet-stream" },
    { ext: "pdf", mimeType: "application/pdf" },
    { ext: "pfb", mimeType: "application/octet-stream" },
    { ext: "pfm", mimeType: "application/octet-stream" },
    { ext: "pfx", mimeType: "application/x-pkcs12" },
    { ext: "pgm", mimeType: "image/x-portable-graymap" },
    { ext: "pic", mimeType: "image/pict" },
    { ext: "pict", mimeType: "image/pict" },
    { ext: "pkgdef", mimeType: "text/plain" },
    { ext: "pkgundef", mimeType: "text/plain" },
    { ext: "pko", mimeType: "application/vnd.ms-pki.pko" },
    { ext: "pls", mimeType: "audio/scpls" },
    { ext: "pma", mimeType: "application/x-perfmon" },
    { ext: "pmc", mimeType: "application/x-perfmon" },
    { ext: "pml", mimeType: "application/x-perfmon" },
    { ext: "pmr", mimeType: "application/x-perfmon" },
    { ext: "pmw", mimeType: "application/x-perfmon" },
    { ext: "png", mimeType: "image/png" },
    { ext: "pnm", mimeType: "image/x-portable-anymap" },
    { ext: "pnt", mimeType: "image/x-macpaint" },
    { ext: "pntg", mimeType: "image/x-macpaint" },
    { ext: "pnz", mimeType: "image/png" },
    { ext: "pot", mimeType: "application/vnd.ms-powerpoint" },
    { ext: "potm", mimeType: "application/vnd.ms-powerpoint.template.macroEnabled.12" },
    { ext: "potx", mimeType: "application/vnd.openxmlformats-officedocument.presentationml.template" },
    { ext: "ppa", mimeType: "application/vnd.ms-powerpoint" },
    { ext: "ppam", mimeType: "application/vnd.ms-powerpoint.addin.macroEnabled.12" },
    { ext: "ppm", mimeType: "image/x-portable-pixmap" },
    { ext: "pps", mimeType: "application/vnd.ms-powerpoint" },
    { ext: "ppsm", mimeType: "application/vnd.ms-powerpoint.slideshow.macroEnabled.12" },
    { ext: "ppsx", mimeType: "application/vnd.openxmlformats-officedocument.presentationml.slideshow" },
    { ext: "ppt", mimeType: "application/vnd.ms-powerpoint" },
    { ext: "pptm", mimeType: "application/vnd.ms-powerpoint.presentation.macroEnabled.12" },
    { ext: "pptx", mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
    { ext: "prf", mimeType: "application/pics-rules" },
    { ext: "prm", mimeType: "application/octet-stream" },
    { ext: "prx", mimeType: "application/octet-stream" },
    { ext: "ps", mimeType: "application/postscript" },
    { ext: "psc1", mimeType: "application/PowerShell" },
    { ext: "psd", mimeType: "application/octet-stream" },
    { ext: "psess", mimeType: "application/xml" },
    { ext: "psm", mimeType: "application/octet-stream" },
    { ext: "psp", mimeType: "application/octet-stream" },
    { ext: "pub", mimeType: "application/x-mspublisher" },
    { ext: "pwz", mimeType: "application/vnd.ms-powerpoint" },
    { ext: "qht", mimeType: "text/x-html-insertion" },
    { ext: "qhtm", mimeType: "text/x-html-insertion" },
    { ext: "qt", mimeType: "video/quicktime" },
    { ext: "qti", mimeType: "image/x-quicktime" },
    { ext: "qtif", mimeType: "image/x-quicktime" },
    { ext: "qtl", mimeType: "application/x-quicktimeplayer" },
    { ext: "qxd", mimeType: "application/octet-stream" },
    { ext: "ra", mimeType: "audio/x-pn-realaudio" },
    { ext: "ram", mimeType: "audio/x-pn-realaudio" },
    { ext: "rar", mimeType: "application/octet-stream" },
    { ext: "ras", mimeType: "image/x-cmu-raster" },
    { ext: "rat", mimeType: "application/rat-file" },
    { ext: "rc", mimeType: "text/plain" },
    { ext: "rc2", mimeType: "text/plain" },
    { ext: "rct", mimeType: "text/plain" },
    { ext: "rdlc", mimeType: "application/xml" },
    { ext: "resx", mimeType: "application/xml" },
    { ext: "rf", mimeType: "image/vnd.rn-realflash" },
    { ext: "rgb", mimeType: "image/x-rgb" },
    { ext: "rgs", mimeType: "text/plain" },
    { ext: "rm", mimeType: "application/vnd.rn-realmedia" },
    { ext: "rmi", mimeType: "audio/mid" },
    { ext: "rmp", mimeType: "application/vnd.rn-rn_music_package" },
    { ext: "roff", mimeType: "application/x-troff" },
    { ext: "rpm", mimeType: "audio/x-pn-realaudio-plugin" },
    { ext: "rqy", mimeType: "text/x-ms-rqy" },
    { ext: "rtf", mimeType: "application/rtf" },
    { ext: "rtx", mimeType: "text/richtext" },
    { ext: "ruleset", mimeType: "application/xml" },
    { ext: "s", mimeType: "text/plain" },
    { ext: "safariextz", mimeType: "application/x-safari-safariextz" },
    { ext: "scd", mimeType: "application/x-msschedule" },
    { ext: "sct", mimeType: "text/scriptlet" },
    { ext: "sd2", mimeType: "audio/x-sd2" },
    { ext: "sdp", mimeType: "application/sdp" },
    { ext: "sea", mimeType: "application/octet-stream" },
    { ext: "searchConnector-ms", mimeType: "application/windows-search-connector+xml" },
    { ext: "setpay", mimeType: "application/set-payment-initiation" },
    { ext: "setreg", mimeType: "application/set-registration-initiation" },
    { ext: "settings", mimeType: "application/xml" },
    { ext: "sgimb", mimeType: "application/x-sgimb" },
    { ext: "sgml", mimeType: "text/sgml" },
    { ext: "sh", mimeType: "application/x-sh" },
    { ext: "shar", mimeType: "application/x-shar" },
    { ext: "shtml", mimeType: "text/html" },
    { ext: "sit", mimeType: "application/x-stuffit" },
    { ext: "sitemap", mimeType: "application/xml" },
    { ext: "skin", mimeType: "application/xml" },
    { ext: "sldm", mimeType: "application/vnd.ms-powerpoint.slide.macroEnabled.12" },
    { ext: "sldx", mimeType: "application/vnd.openxmlformats-officedocument.presentationml.slide" },
    { ext: "slk", mimeType: "application/vnd.ms-excel" },
    { ext: "sln", mimeType: "text/plain" },
    { ext: "slupkg-ms", mimeType: "application/x-ms-license" },
    { ext: "smd", mimeType: "audio/x-smd" },
    { ext: "smi", mimeType: "application/octet-stream" },
    { ext: "smx", mimeType: "audio/x-smd" },
    { ext: "smz", mimeType: "audio/x-smd" },
    { ext: "snd", mimeType: "audio/basic" },
    { ext: "snippet", mimeType: "application/xml" },
    { ext: "snp", mimeType: "application/octet-stream" },
    { ext: "sol", mimeType: "text/plain" },
    { ext: "sor", mimeType: "text/plain" },
    { ext: "spc", mimeType: "application/x-pkcs7-certificates" },
    { ext: "spl", mimeType: "application/futuresplash" },
    { ext: "src", mimeType: "application/x-wais-source" },
    { ext: "srf", mimeType: "text/plain" },
    { ext: "SSISDeploymentManifest", mimeType: "text/xml" },
    { ext: "ssm", mimeType: "application/streamingmedia" },
    { ext: "sst", mimeType: "application/vnd.ms-pki.certstore" },
    { ext: "stl", mimeType: "application/vnd.ms-pki.stl" },
    { ext: "sv4cpio", mimeType: "application/x-sv4cpio" },
    { ext: "sv4crc", mimeType: "application/x-sv4crc" },
    { ext: "svc", mimeType: "application/xml" },
    { ext: "swf", mimeType: "application/x-shockwave-flash" },
    { ext: "t", mimeType: "application/x-troff" },
    { ext: "tar", mimeType: "application/x-tar" },
    { ext: "tcl", mimeType: "application/x-tcl" },
    { ext: "testrunconfig", mimeType: "application/xml" },
    { ext: "testsettings", mimeType: "application/xml" },
    { ext: "tex", mimeType: "application/x-tex" },
    { ext: "texi", mimeType: "application/x-texinfo" },
    { ext: "texinfo", mimeType: "application/x-texinfo" },
    { ext: "tgz", mimeType: "application/x-compressed" },
    { ext: "thmx", mimeType: "application/vnd.ms-officetheme" },
    { ext: "thn", mimeType: "application/octet-stream" },
    { ext: "tif", mimeType: "image/tiff" },
    { ext: "tiff", mimeType: "image/tiff" },
    { ext: "tlh", mimeType: "text/plain" },
    { ext: "tli", mimeType: "text/plain" },
    { ext: "toc", mimeType: "application/octet-stream" },
    { ext: "tr", mimeType: "application/x-troff" },
    { ext: "trm", mimeType: "application/x-msterminal" },
    { ext: "trx", mimeType: "application/xml" },
    { ext: "ts", mimeType: "video/vnd.dlna.mpeg-tts" },
    { ext: "tsv", mimeType: "text/tab-separated-values" },
    { ext: "ttf", mimeType: "application/octet-stream" },
    { ext: "tts", mimeType: "video/vnd.dlna.mpeg-tts" },
    { ext: "txt", mimeType: "text/plain" },
    { ext: "u32", mimeType: "application/octet-stream" },
    { ext: "uls", mimeType: "text/iuls" },
    { ext: "user", mimeType: "text/plain" },
    { ext: "ustar", mimeType: "application/x-ustar" },
    { ext: "vb", mimeType: "text/plain" },
    { ext: "vbdproj", mimeType: "text/plain" },
    { ext: "vbk", mimeType: "video/mpeg" },
    { ext: "vbproj", mimeType: "text/plain" },
    { ext: "vbs", mimeType: "text/vbscript" },
    { ext: "vcf", mimeType: "text/x-vcard" },
    { ext: "vcproj", mimeType: "Application/xml" },
    { ext: "vcs", mimeType: "text/plain" },
    { ext: "vcxproj", mimeType: "Application/xml" },
    { ext: "vddproj", mimeType: "text/plain" },
    { ext: "vdp", mimeType: "text/plain" },
    { ext: "vdproj", mimeType: "text/plain" },
    { ext: "vdx", mimeType: "application/vnd.ms-visio.viewer" },
    { ext: "vml", mimeType: "text/xml" },
    { ext: "vscontent", mimeType: "application/xml" },
    { ext: "vsct", mimeType: "text/xml" },
    { ext: "vsd", mimeType: "application/vnd.visio" },
    { ext: "vsi", mimeType: "application/ms-vsi" },
    { ext: "vsix", mimeType: "application/vsix" },
    { ext: "vsixlangpack", mimeType: "text/xml" },
    { ext: "vsixmanifest", mimeType: "text/xml" },
    { ext: "vsmdi", mimeType: "application/xml" },
    { ext: "vspscc", mimeType: "text/plain" },
    { ext: "vss", mimeType: "application/vnd.visio" },
    { ext: "vsscc", mimeType: "text/plain" },
    { ext: "vssettings", mimeType: "text/xml" },
    { ext: "vssscc", mimeType: "text/plain" },
    { ext: "vst", mimeType: "application/vnd.visio" },
    { ext: "vstemplate", mimeType: "text/xml" },
    { ext: "vsto", mimeType: "application/x-ms-vsto" },
    { ext: "vsw", mimeType: "application/vnd.visio" },
    { ext: "vsx", mimeType: "application/vnd.visio" },
    { ext: "vtx", mimeType: "application/vnd.visio" },
    { ext: "wav", mimeType: "audio/wav" },
    { ext: "wave", mimeType: "audio/wav" },
    { ext: "wax", mimeType: "audio/x-ms-wax" },
    { ext: "wbk", mimeType: "application/msword" },
    { ext: "wbmp", mimeType: "image/vnd.wap.wbmp" },
    { ext: "wcm", mimeType: "application/vnd.ms-works" },
    { ext: "wdb", mimeType: "application/vnd.ms-works" },
    { ext: "wdp", mimeType: "image/vnd.ms-photo" },
    { ext: "webarchive", mimeType: "application/x-safari-webarchive" },
    { ext: "webtest", mimeType: "application/xml" },
    { ext: "wiq", mimeType: "application/xml" },
    { ext: "wiz", mimeType: "application/msword" },
    { ext: "wks", mimeType: "application/vnd.ms-works" },
    { ext: "WLMP", mimeType: "application/wlmoviemaker" },
    { ext: "wlpginstall", mimeType: "application/x-wlpg-detect" },
    { ext: "wlpginstall3", mimeType: "application/x-wlpg3-detect" },
    { ext: "wm", mimeType: "video/x-ms-wm" },
    { ext: "wma", mimeType: "audio/x-ms-wma" },
    { ext: "wmd", mimeType: "application/x-ms-wmd" },
    { ext: "wmf", mimeType: "application/x-msmetafile" },
    { ext: "wml", mimeType: "text/vnd.wap.wml" },
    { ext: "wmlc", mimeType: "application/vnd.wap.wmlc" },
    { ext: "wmls", mimeType: "text/vnd.wap.wmlscript" },
    { ext: "wmlsc", mimeType: "application/vnd.wap.wmlscriptc" },
    { ext: "wmp", mimeType: "video/x-ms-wmp" },
    { ext: "wmv", mimeType: "video/x-ms-wmv" },
    { ext: "wmx", mimeType: "video/x-ms-wmx" },
    { ext: "wmz", mimeType: "application/x-ms-wmz" },
    { ext: "wpl", mimeType: "application/vnd.ms-wpl" },
    { ext: "wps", mimeType: "application/vnd.ms-works" },
    { ext: "wri", mimeType: "application/x-mswrite" },
    { ext: "wrl", mimeType: "x-world/x-vrml" },
    { ext: "wrz", mimeType: "x-world/x-vrml" },
    { ext: "wsc", mimeType: "text/scriptlet" },
    { ext: "wsdl", mimeType: "text/xml" },
    { ext: "wvx", mimeType: "video/x-ms-wvx" },
    { ext: "x", mimeType: "application/directx" },
    { ext: "xaf", mimeType: "x-world/x-vrml" },
    { ext: "xaml", mimeType: "application/xaml+xml" },
    { ext: "xap", mimeType: "application/x-silverlight-app" },
    { ext: "xbap", mimeType: "application/x-ms-xbap" },
    { ext: "xbm", mimeType: "image/x-xbitmap" },
    { ext: "xdr", mimeType: "text/plain" },
    { ext: "xht", mimeType: "application/xhtml+xml" },
    { ext: "xhtml", mimeType: "application/xhtml+xml" },
    { ext: "xla", mimeType: "application/vnd.ms-excel" },
    { ext: "xlam", mimeType: "application/vnd.ms-excel.addin.macroEnabled.12" },
    { ext: "xlc", mimeType: "application/vnd.ms-excel" },
    { ext: "xld", mimeType: "application/vnd.ms-excel" },
    { ext: "xlk", mimeType: "application/vnd.ms-excel" },
    { ext: "xll", mimeType: "application/vnd.ms-excel" },
    { ext: "xlm", mimeType: "application/vnd.ms-excel" },
    { ext: "xls", mimeType: "application/vnd.ms-excel" },
    { ext: "xlsb", mimeType: "application/vnd.ms-excel.sheet.binary.macroEnabled.12" },
    { ext: "xlsm", mimeType: "application/vnd.ms-excel.sheet.macroEnabled.12" },
    { ext: "xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
    { ext: "xlt", mimeType: "application/vnd.ms-excel" },
    { ext: "xltm", mimeType: "application/vnd.ms-excel.template.macroEnabled.12" },
    { ext: "xltx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.template" },
    { ext: "xlw", mimeType: "application/vnd.ms-excel" },
    { ext: "xml", mimeType: "text/xml" },
    { ext: "xmta", mimeType: "application/xml" },
    { ext: "xof", mimeType: "x-world/x-vrml" },
    { ext: "XOML", mimeType: "text/plain" },
    { ext: "xpm", mimeType: "image/x-xpixmap" },
    { ext: "xps", mimeType: "application/vnd.ms-xpsdocument" },
    { ext: "xrm-ms", mimeType: "text/xml" },
    { ext: "xsc", mimeType: "application/xml" },
    { ext: "xsd", mimeType: "text/xml" },
    { ext: "xsf", mimeType: "text/xml" },
    { ext: "xsl", mimeType: "text/xml" },
    { ext: "xslt", mimeType: "text/xml" },
    { ext: "xsn", mimeType: "application/octet-stream" },
    { ext: "xss", mimeType: "application/xml" },
    { ext: "xtp", mimeType: "application/octet-stream" },
    { ext: "xwd", mimeType: "image/x-xwindowdump" },
    { ext: "z", mimeType: "application/x-compress" },
    { ext: "zip", mimeType: "application/x-zip-compressed" }
    ];
    if (filename && filename != "") {
      let extension = filename.split(".");
      if (extension && extension.length > 1) {
        let matchedMimeType = mimeType.find(x => x.ext == extension[1]);
        if (matchedMimeType)
          return matchedMimeType.mimeType.indexOf("image") > -1;
        else
          return false;
      }
    }
  }

  closeAddDirectoryToggle() {
    this.addDirectoryToggle = false;
    this.newDirectoryName = '';
  }
  saveNewDirectory(newDirectoryName) {
    if (newDirectoryName) {

    }
    else {
      this.noty.ShowNoty("Folder name can't be empty!");
    }
  }

  SaveFiles(files, node) {
    let uploadedFile: FileList = files.files;
    if (uploadedFile.length > 0) {

    }
    else {
      this.noty.ShowNoty("Please select a valid files to upload!");
    }
  }

  SaveFolder(folder, node) {
    let uploadedFile: FileList = folder.files;
    if (uploadedFile.length > 0) {

    }
    else {
      this.noty.ShowNoty("Please select a folder to upload!");
    }
  }

  shareDriveToggle() {
    this.isSharedDrive = true;
  }

  closeDriveToggle() {
    this.listOfShareEmails = [];
    this.isSharedDrive = false;
  }

  selectedToContactInfo(recipientEmail) {
    let emailObj = { "email": recipientEmail };
    this.listOfShareEmails.push(emailObj);
  }
  removeRecipient(toRecipient) {
    this.listOfShareEmails = this.listOfShareEmails.filter(x => x.email !== toRecipient);
  }

  enterContact(evt) {
    if (evt.keyCode == 13) {
      let emailObj = { "email": evt.target.value };
      this.listOfShareEmails.push(emailObj);
      evt.target.value = '';
    }
  }

  chooseContactBlur(evt) {
    if (evt.target.value) {
      let emailObj = { "email": evt.target.value };
      this.listOfShareEmails.push(emailObj);
      evt.target.value = '';
    }
  }

  async shareDrive() {
    if (this.selectedNode) {
      let content = {
        "recipients": this.listOfShareEmails,
        "message": this.shareMessage,
        "requireSignIn": true,
        "sendInvitation": true,
        "roles": ["write"]
      };
      this.graphService.executeQuery('POST', Onedriveconfig.graphV1Url + 'drives/' + this.selectedNode.parentReference.driveId + '/items/' + this.selectedNode.id
        + '/invite', content).subscribe((result: any) => {
          this.noty.ShowNoty("Invite sent to the uers successfully");
        }, (error: any) => {
          this.noty.ShowNoty(error.code);
        }, () => {
          this.isSharedDrive = false;
        });
    }
  }
}
