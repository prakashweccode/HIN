import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DirectoryInfos } from './sf-file-explorer';

@Injectable({
  providedIn: 'root'
})
export class SfFileExplorerService {

  constructor(public http: HttpClient) { }
  getDrives(folder, root) {
    return this.http.get<DirectoryInfos>("/api/FileExplorer/GetDrives?folder=" + folder + "&root=" + root).pipe();
  }
  getFolderContents(folder, isRoot) {
    return this.http.get<any>("/api/FileExplorer/GetFolderContent?folder=" + folder + "&isRoot=" + isRoot).pipe();
  }
  SaveNewFolder(newFolder) {
    return this.http.post<any>("/api/FileExplorer/CreateNewFolder", newFolder).pipe();
  }
  intializeComponent(entity, entityNumber) {
    return this.http.get<DirectoryInfos>("/api/FileExplorer/IntializeComponent?entity=" + entity + "&entityNumber=" + entityNumber).pipe();
  }
  deleteNode(node) {
    return this.http.post<any>("/api/FileExplorer/DeleteNodeOrFile", node).pipe();
  }
  download(node) {
    return this.http.post<any>("/api/FileExplorer/DownloadFile", node).pipe();
  }
  preview(path) {
    return this.http.get<any>("/api/FileExplorer/PreviewFile?path=" + path).pipe();
  }
}
