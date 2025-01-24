export class FileInfos {
  public Name: string;
  public Size: string;
  public CreatedOn: Date;
  public ContentType: string;
  public Extension: string;
  public UpdatedOn: Date;
  public IsRoot: boolean;
  public isSelected: boolean;
  public entity: number;
  public RootPath: string;
}
export class FolderInfos {
  public FolderName: string;
  public CreatedOn: Date;
  public Size: string;
  public IsRootFolder: boolean;
  public isSelected: boolean;
  public Type: string;
}
export class DirectoryInfos {
  public FolderName: string;
  public ParentFolderName: string;
  public RootPath: string;
  public FileInfos: Array<FileInfos> = [];
}
export class NewFolder {
  public FolderName: string;
  public RootName: string;
  public Entity: number;
  public EntityNumber: string;
}
export class SelectedNode {
  public Name: string;
  public ContentType: string;
  public RootName: string;
  public Entity: number;
  public EntityNumber: string;
}
